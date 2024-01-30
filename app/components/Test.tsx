import { Check, ChevronsUpDown } from "lucide-react";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface CustomComboboxPropsType {
  lists: { listItemValue: any; listItemDisplayName: string }[];
  selectTriggerPlaceholder?: string;
  disabled?: boolean;
  selectedItem: any;
  callBack: any;
}

/* Custom Combobox using Different Props */
export function CustomCombobox({
  lists,
  selectTriggerPlaceholder = "Default Trigger",
  disabled = false,
  selectedItem,
  callBack,
}: CustomComboboxPropsType) {
  return (
    <ComboboxBase
      lists={lists}
      selectTriggerPlaceholder={selectTriggerPlaceholder}
      disabled={disabled}
      callBack={callBack}
      selectedItem={selectedItem}
    />
  );
}

export function ComboboxBase({
  lists,
  selectTriggerPlaceholder,
  disabled,
  selectedItem,
  callBack,
}: CustomComboboxPropsType) {
  // UseState Declarations
  const [open, setOpen] = useState(false);
  const [selectedListItem, setSelectedListItem] = useState("");

  function handleSelectChange(selectedValue: any) {
    setSelectedListItem(
      selectedValue === selectedListItem ? "" : selectedValue,
    );
    setOpen(false);
    callBack(selectedValue === selectedListItem ? "" : selectedValue);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={disabled}
        >
          {selectedListItem
            ? lists?.find(
                (framework) => framework?.listItemValue === selectedListItem,
              )?.listItemDisplayName
            : selectTriggerPlaceholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {lists?.map((framework, index: number) => (
              <CommandItem
                key={index}
                value={JSON.stringify(framework)}
                onSelect={(currentValue) => {
                  console.log(
                    "Lin 93 currentValue :>> ",
                    JSON.parse(currentValue),
                  );
                  handleSelectChange(JSON.parse(currentValue));
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedListItem === framework?.listItemValue
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {framework?.listItemDisplayName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/* Custom JSX Element with Wrapper for Base Loader */
export function SelectDropDownLoader() {
  return (
    <div className="relative mx-auto flex max-h-60 items-center justify-center rounded-lg border border-[#CECECE] bg-white p-3 shadow-md">
      <Loader />
    </div>
  );
}

/* Custom SVG Loader */
export function Loader() {
  return (
    <svg
      className="-ml-1 mr-3 h-5 w-5 animate-spin text-slate-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

/* Custom Select Drop Down Label */
export function CustomLabel({
  children = "Default Title",
}: {
  children: string;
}) {
  return (
    <label className="absolute start-1 top-1.5 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
      {children}
    </label>
  );
}
