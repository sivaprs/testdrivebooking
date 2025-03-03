import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import "./BookingPopup.css";

const BookingPopup: React.FC<any> = ({ open, onClose, title, onConfirm }) => {
  const [cname, setCName] = useState<string>("");
  const [cemail, setCEmail] = useState<string>("");
  const [cphone, setCPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  const doConfirm = () => {
    onConfirm(cname, cemail, cphone);
    setCName("");
    setCEmail("");
    setCPhone("");
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: "20px" }}>
            <label>Name</label>
            <sup style={{ color: "red" }}>*</sup>{" "}
            <input
              type="text"
              name="name"
              onChange={(e) => setCName(e.target.value)}
              style={{ marginLeft: "65px" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>Email</label>
            <sup style={{ color: "red" }}>*</sup>{" "}
            <input
              type="email"
              name="email"
              onChange={handleEmailChange}
              style={{ marginLeft: "70px" }}
              required
            />
            <p style={{ color: "red" }}>{error}</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>Phone Number</label>
            <sup style={{ color: "red" }}>*</sup>{" "}
            <input
              type="text"
              name="phone"
              onChange={(e) => setCPhone(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={doConfirm}
            color="primary"
            variant="contained"
            disabled={
              cname !== "" && cemail !== "" && cphone !== "" ? false : true
            }
          >
            Confirm
          </Button>
          <Button onClick={onClose} color="success" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingPopup;
