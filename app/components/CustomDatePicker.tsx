import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface CustomDatePickerPropsType {
  isLabelEnable?: boolean;
  labelTitle?: string;
  getSelectedDate?: any;
  getFormattedSelectedDateObject?: any;
  fromDate?: Date | undefined;
  toDate?: Date | undefined;
  isFormattedDateObjectRequired?: boolean;
  getFormattedSelectedDate?: any;
  isFormattedDateRequired?: boolean;
  isSelectedDateRequired: boolean;
}

interface DatePickerBasePropsType {
  date: Date | undefined;
  handleDateSelect: any;
  fromDate: Date | undefined;
  toDate: Date | undefined;
}

interface dateFormatObjectType {
  default: string;
  defaultShadCN: string;
  defaultView: string;
}

const dateFormatObject: dateFormatObjectType = {
  default: "dd-MM-yyyy",
  defaultShadCN: "PPP",
  defaultView: "dd-MMM-yyyy",
};

/* Custom Date Picker */
export function CustomDatePicker({
  isLabelEnable = true,
  labelTitle,
  getSelectedDate,
  getFormattedSelectedDateObject,
  fromDate,
  toDate,
  getFormattedSelectedDate,
  isFormattedDateObjectRequired = false,
  isFormattedDateRequired = false,
  isSelectedDateRequired = false,
}: CustomDatePickerPropsType) {
  const [date, setDate] = useState<Date>();

  /* Function to Format Given Date with Required Format Object Value */
  function formattedDate(selectedDate: any) {
    return selectedDate ? format(selectedDate, dateFormatObject?.default) : "";
  }

  function getFormattedDateObject(selectedDate: any) {
    return {
      selectedDate: selectedDate,
      formattedSelectedDate: formattedDate(selectedDate),
    };
  }

  /* Handle Date Selection Logic Function */
  function handleDateSelect(selectedDate: any) {
    setDate(selectedDate);

    isSelectedDateRequired && getSelectedDate(() => selectedDate);

    isFormattedDateObjectRequired &&
      getFormattedSelectedDateObject(() =>
        getFormattedDateObject(selectedDate),
      );

    isFormattedDateRequired &&
      getFormattedSelectedDate(() => formattedDate(selectedDate));
  }

  // Component JSX Part
  return (
    <div className="relative w-full">
      {/* Custom Label Wrapper with Title */}
      {isLabelEnable && <CustomLabel>{labelTitle}</CustomLabel>}

      {/* Base Date Picker with Date selection functionality */}
      <DatePickerBase
        date={date}
        handleDateSelect={handleDateSelect}
        fromDate={fromDate}
        toDate={toDate}
      />
    </div>
  );
}

/* Basic Date Picker Component with Date Selection Functionality */
function DatePickerBase({
  date,
  handleDateSelect,
  fromDate,
  toDate,
}: DatePickerBasePropsType) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, dateFormatObject?.defaultView)
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate: any) => handleDateSelect(selectedDate)}
          initialFocus
          fromDate={fromDate}
          toDate={toDate}
        />
      </PopoverContent>
    </Popover>
  );
}

/* Custom Select Drop Down Label */
export function CustomLabel({
  children = "Default Title",
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "absolute start-1 top-1.5 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
        className,
      )}
    >
      {children}
    </label>
  );
}
