import { deleteTransaction } from "@/actions/transaction/action"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TTransaction } from "@/types/transaction"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"

export default function DeleteTransactionDialog({
    selectedTransaction,
    setSelectedTransaction,
    refetch
}: {
    selectedTransaction: {
        data: Omit<TTransaction, 'user_id' | 'embedding'>;
        action: 'update' | 'delete';
    } | null;
    setSelectedTransaction: Dispatch<
        SetStateAction<{
            data: Omit<TTransaction, 'user_id' | 'embedding'>;
            action: 'update' | 'delete';
        } | null>
    >;
    refetch: () => void
}) {

    const { mutate, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => {
            return deleteTransaction(id);
        },
        onSuccess: () => {
            setSelectedTransaction(null);
            refetch();
            toast.success('Transaction deleted successfully');
        },
        onError: (error) => {
            toast.error(error instanceof Error ?
                error.message :
                'Failed to delete transaction');
        }
    })

    return (
        <Dialog
            open={!!selectedTransaction && selectedTransaction.action === 'delete'}
            onOpenChange={() => setSelectedTransaction(null)}>
            <DialogContent className="gapa-4">
                <DialogHeader className="gap-4">
                    <DialogTitle>Delete Transaction</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this transaction? This action cannot be undone
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="ghost"
                        disabled={isDeleting}
                        onClick={() => setSelectedTransaction(null)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={() => {
                            if (selectedTransaction) {
                                mutate(selectedTransaction.data.id)
                            }
                        }}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
