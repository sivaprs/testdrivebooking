import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface DateTimePickerProps {
  onDateChange: (date: string) => void;
}

export function BookingDateTimePicker(props: DateTimePickerProps) {
  //const [selectedDate, setSelectedDate] = useState(dayjs());

  const today = dayjs();
  const minDate = today;
  const maxDate = today.add(14, "day");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Select Date & Time"
        onChange={(newValue: any) => {
          console.log(
            "newValue",
            newValue,
            dayjs(newValue).utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
          );
          //let value = newValue.utc();
          props.onDateChange(
            dayjs(newValue).utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
          );
        }}
        ampm={false}
        sx={{
          width: "250px",
          "& .MuiInputBase-root": { height: "40px" },
          "& .MuiOutlinedInput-root": { height: "40px" },
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
    </LocalizationProvider>
  );
}
