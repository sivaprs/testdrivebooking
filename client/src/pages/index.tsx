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
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Popup from "../components/BookingPopup/BookingPopup";
import { VEHICLE_TYPE } from "../constants";
import "../index.css";

const Main: React.FC = () => {
  const locations = useLocation();

  const queryParams: any = new URLSearchParams(locations.search);

  const type = queryParams.get("type") || VEHICLE_TYPE;

  const [isPop, setIsPop] = useState(false);

  const [opens, setOpens] = useState(false);

  const [location, setLocation] = useState("");

  const [duration, setDuration] = useState("");

  const [selectedLocation, setSelectedLocation] = useState<any>("");

  const [selectedDate, setSelectedDate] = useState<any>();

  const [availability, setAvailability] = useState<any>([]);

  const [vehicle, setVehicle] = useState<any>("");

  const [check, setCheck] = useState<any>(false);

  const [message, setMessage] = useState<any>("");

  const [severity, setSeverity] = useState<any>("info");

  const onDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const onLocationChange = (location: any) => {
    setSelectedLocation(location);
  };

  const doReserve = (obj: any) => {
    setVehicle(obj);
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
        setSeverity("success");
        setMessage(
          "Slot is available. Please click Revserve button to proceed for reserve."
        );
      } else {
        setOpens(true);
        setSeverity("error");
        setMessage(
          "Slot is not available for selected parameters. Plesae try with different parameters."
        );
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
        setMessage("Your test drive reserved successfully");
        setSeverity("success");
      } else {
        setOpens(true);
        setSeverity("error");
        setMessage(
          "Your test drive reservation is failed. Please try different slot."
        );
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
              onChange={(event: any) => setDuration(event.target.value)}
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
        message={"Booking successfully"}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
