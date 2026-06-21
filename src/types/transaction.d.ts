export type TTransaction = {
    id: string;
    date: string | Date;
    amount: number;
    type: 'income' | 'expense';
    description: string;
    category: string;
    user_id: string | null;
    embedding: number[] | null
}