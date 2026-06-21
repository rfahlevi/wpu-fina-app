"use client";

import { CalendarIcon } from "lucide-react";
import type { ChangeEvent, ChangeEventHandler } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { dateFormatter } from "@/helpers/date-formatter";

export const title = "Date Picker with Month and Year Selector";

const DatePicker = ({
    value,
    onChange,
    id
}: {
    value?: Date,
    onChange?: (date?: Date) => void,
    id?: string
}) => {
    const [month, setMonth] = useState<Date>(new Date());

    const handleCalendarChange = (
        value: string | number,
        event: ChangeEventHandler<HTMLSelectElement>,
    ) => {
        const newEvent = {
            target: {
                value: String(value),
            },
        } as ChangeEvent<HTMLSelectElement>;
        event(newEvent);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={cn(
                        "w-70 justify-between text-left font-normal",
                        !value && "text-muted-foreground",
                    )}
                    id={id}
                    variant="outline"
                >
                    {value ? dateFormatter(String(value)) : <span>Pick a date</span>}
                    <CalendarIcon className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                    captionLayout="dropdown"
                    components={{
                        MonthCaption: (props) => <>{props.children}</>,
                        DropdownNav: (props) => (
                            <div className="flex items-center w-full gap-2">
                                {props.children}
                            </div>
                        ),
                        Dropdown: (props) => (
                            <Select
                                onValueChange={(value) => {
                                    if (props.onChange) {
                                        handleCalendarChange(value, props.onChange);
                                    }
                                }}
                                value={String(props.value)}
                            >
                                <SelectTrigger className="first:flex-1 last:shrink-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.options?.map((option) => (
                                        <SelectItem
                                            disabled={option.disabled}
                                            key={option.value}
                                            value={String(option.value)}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ),
                    }}
                    hideNavigation
                    mode="single"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={onChange}
                    selected={value}
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
