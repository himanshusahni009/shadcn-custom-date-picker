import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { CustomDatePicker } from "~/components/CustomDatePicker";
import { getNthDateFromToday } from "~/utils/dateHelperFunctions";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// Date Initial State Object
const dateInitialState = {
  selectedDate: undefined,
  formattedSelectedDate: "",
  isDateReset: false,
};

export default function Index() {
  // UseState Declarations
  const [startDate, setStartDate] = useState(dateInitialState);
  const [endDate, setEndDate] = useState(dateInitialState);
  const [date, setDate] = useState(dateInitialState);

  // Variables Declarations
  const defaultSelectedDate = getNthDateFromToday(5, "");

  // Function to Handle Reset Date Functionality
  function handleReset() {
    // Reset Single Date Picker
    setDate({ ...dateInitialState, isDateReset: true });

    // Reset Start Date
    setStartDate({ ...dateInitialState, isDateReset: true });

    // Reset End Date
    setEndDate({ ...dateInitialState, isDateReset: true });
  }

  console.log("date :>> ", date);
  console.log("startDate :>> ", startDate);
  console.log("endDate :>> ", endDate);

  return (
    <>
      <div className="flex justify-center">
        <h1>Welcome to Remix</h1>
      </div>

      {/* Date Picker with Single Date Selection */}
      <CustomDatePicker
        isSelectedDateRequired={false}
        isFormattedDateObjectRequired
        getFormattedSelectedDateObject={(selectedDate: any) =>
          setDate(selectedDate)
        }
        isDateReset={date?.isDateReset}
        datePickerTitle="Date"
      />

      {/* Date Picker with Range Picker Selection */}
      <div className="flex gap-x-3 p-2">
        {/* Custom Date Picker for Start Date */}
        <CustomDatePicker
          isSelectedDateRequired={false}
          isFormattedDateObjectRequired
          getFormattedSelectedDateObject={(selectedDate: any) =>
            setStartDate(selectedDate)
          }
          toDate={endDate?.selectedDate}
          isDateReset={startDate?.isDateReset}
          datePickerTitle="Start Date"
          labelTitle="Start Date"
        />

        {/* Custom Date Picker for End Date */}
        <CustomDatePicker
          isSelectedDateRequired={false}
          isFormattedDateObjectRequired
          getFormattedSelectedDateObject={(selectedDate: any) =>
            setEndDate(selectedDate)
          }
          fromDate={startDate?.selectedDate}
          isDateReset={endDate?.isDateReset}
          datePickerTitle="End Date"
          labelTitle="End Date"
        />
      </div>

      {/* Date Picker with Single Date Selection with Default Date Selected */}
      <CustomDatePicker
        isSelectedDateRequired={false}
        isFormattedDateObjectRequired
        getFormattedSelectedDateObject={(selectedDate: any) =>
          setDate(selectedDate)
        }
        isDateReset={date?.isDateReset}
        datePickerTitle="Date"
        selectedDefaultDate={defaultSelectedDate}
      />

      <div className="flex items-center justify-center">
        {/* Button for Reset Date */}
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </>
  );
}
