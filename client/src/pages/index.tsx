import React, { useState } from "react";
import { BookingDateTimePicker } from "../components/DatePicker";
import LocationFilter from "../components/LocationFilter";
import bookingService from "../services/bookingService";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Popup from "../components/BookingPopup/BookingPopup";
import {
  VEHICLE_TYPE,
  SEVERITY_STATUS,
  MESSAGE_SLOT_AVAIL_SUCCESS,
  MESSAGE_SLOT_AVAIL_ERROR,
  MESSAGE_RESERVE_SUCCESS,
  MESSAGE_RESERVE_ERROR,
} from "../constants";
import "../index.css";

type Availability = {
  id: string;
  minimumMinutesBetweenBookings: number;
};

type Vehicle = {
  id: string;
  minimumMinutesBetweenBookings: number;
};

const Main: React.FC = () => {
  const locations = useLocation();

  const queryParams = new URLSearchParams(locations.search);

  const type = queryParams.get("type") || VEHICLE_TYPE;

  const [isPop, setIsPop] = useState<boolean>(false);

  const [opens, setOpens] = useState<boolean>(false);

  const [duration, setDuration] = useState("");

  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<string>("");

  const [availability, setAvailability] = useState<Availability[]>([]);

  const [vehicle, setVehicle] = useState<Vehicle>({
    id: "",
    minimumMinutesBetweenBookings: 15,
  });

  const [check, setCheck] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const [severity, setSeverity] = useState<string>(SEVERITY_STATUS.INFO);

  const onDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const onLocationChange = (location: string) => {
    setSelectedLocation(location);
  };

  const doReserve = (vehicle: Vehicle) => {
    setVehicle(vehicle);
    setIsPop(true);
  };

  const doCheck = async () => {
    setCheck(true);
    try {
      let { data } = await bookingService.checkAvailability(
        type,
        selectedLocation,
        selectedDate,
        duration
      );
      setAvailability(data?.availabilityList || []);
      if (data?.availability) {
        setOpens(true);
        setSeverity(SEVERITY_STATUS.SUCCESS);
        setMessage(MESSAGE_SLOT_AVAIL_SUCCESS);
      } else {
        setOpens(true);
        setSeverity(SEVERITY_STATUS.ERROR);
        setMessage(MESSAGE_SLOT_AVAIL_ERROR);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const onConfirm = async (name: string, email: string, phone: string) => {
    try {
      let request = {
        vehicleId: vehicle.id,
        startDateTime: selectedDate,
        duration: duration,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        minimumMinutesBetweenBookings: vehicle.minimumMinutesBetweenBookings,
      };
      let { data } = await bookingService.createBooking(request);
      if (data?.status) {
        setOpens(true);
        setMessage(MESSAGE_RESERVE_SUCCESS);
        setSeverity(SEVERITY_STATUS.SUCCESS);
      } else {
        setOpens(true);
        setSeverity(SEVERITY_STATUS.ERROR);
        setMessage(MESSAGE_RESERVE_ERROR);
      }

      setAvailability([]);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div>
      <div className="container">
        <div>
          <LocationFilter
            selectedLocation={selectedLocation}
            onChange={onLocationChange}
          />
        </div>
        <div>
          <BookingDateTimePicker onDateChange={onDateChange} />
        </div>
        <div>
          <FormControl>
            <InputLabel>Duration</InputLabel>
            <Select
              value={duration}
              onChange={(event: SelectChangeEvent<string>) =>
                setDuration(event.target.value)
              }
              style={{ height: "40px", width: "220px" }}
            >
              <MenuItem key={"k-45"} value={45}>
                45
              </MenuItem>
              <MenuItem key={"k-60"} value={60}>
                60
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <button
            onClick={doCheck}
            className={
              selectedLocation !== "" && selectedDate !== "" && duration !== ""
                ? "btn-check"
                : "btn-check-disabled"
            }
            disabled={
              selectedLocation !== "" && selectedDate !== "" && duration !== ""
                ? false
                : true
            }
          >
            Check Availability
          </button>
        </div>
        <div>
          {availability.length > 0 && (
            <button
              onClick={() => doReserve({ ...availability[0] })}
              className={
                selectedLocation !== "" &&
                selectedDate !== "" &&
                duration !== ""
                  ? "btn-check"
                  : "btn-check-disabled"
              }
              disabled={
                selectedLocation !== "" &&
                selectedDate !== "" &&
                duration !== ""
                  ? false
                  : true
              }
            >
              Reserve
            </button>
          )}
        </div>
      </div>
      <div>
        {/*availability.length > 0 &&
          availability.map((avail: any) => (
            <div>
              <span> {avail.id} </span>{" "}
              <span>
                <button
                  onClick={() => doBook({ ...avail })}
                  className="btn-check"
                >
                  Reserve
                </button>
              </span>
            </div>
          ))*/}
      </div>
      <Popup
        open={isPop}
        onClose={() => setIsPop(false)}
        title={"Customer Details"}
        onConfirm={onConfirm}
      />
      <Snackbar
        open={opens}
        autoHideDuration={10000}
        onClose={() => setOpens(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={severity as "success" | "info" | "warning" | "error"}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
