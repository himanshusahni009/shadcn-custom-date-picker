import type { MetaFunction } from "@remix-run/node";
import { format } from "date-fns";
import { useState } from "react";
import { CustomCombobox } from "~/components/CustomCombobox";
import { CustomDatePicker } from "~/components/CustomDatePicker";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // UseState Declarations
  const [startDate, setStartDate] = useState({
    selectedDate: undefined,
    formattedSelectedDate: "",
  });
  const [endDate, setEndDate] = useState({
    selectedDate: undefined,
    formattedSelectedDate: "",
  });
  const [date, setDate] = useState("");

  function handleReset() {
    setStartDate({
      selectedDate: undefined,
      formattedSelectedDate: "",
    });
    setEndDate({ selectedDate: undefined, formattedSelectedDate: "" });
  }

  console.log("date :>> ", date);
  console.log("startDate :>> ", startDate);
  console.log("endDate :>> ", endDate);

  return (
    <>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Welcome to Remix</h1>
      </div>

      {/* Date Picker with Single Date Selection */}
      <CustomDatePicker
        isSelectedDateRequired
        getSelectedDate={(selectedDate: any) => setDate(selectedDate)}
      />

      {/* Date Picker with Range Picker Selection */}
      <div className="flex gap-x-3 p-2">
        <CustomDatePicker
          isSelectedDateRequired={false}
          isFormattedDateObjectRequired
          getFormattedSelectedDateObject={(selectedDate: any) =>
            setStartDate(selectedDate)
          }
          toDate={endDate?.selectedDate}
        />

        <CustomDatePicker
          isSelectedDateRequired={false}
          isFormattedDateObjectRequired
          getFormattedSelectedDateObject={(selectedDate: any) =>
            setEndDate(selectedDate)
          }
          fromDate={startDate?.selectedDate}
        />

        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </>
  );
}
