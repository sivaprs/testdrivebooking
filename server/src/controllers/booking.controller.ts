import { Request, Response } from "express";
import logger from "../utils/logger";
import fs from "fs";
import fsp from "fs/promises";
import dayjs from "dayjs";
import {
  DATE_AFTER,
  DATA_RESERVATION_FILE,
  DATA_VEHICLE_FILE,
  DATE_BEFORE,
  DATE_EQUAL,
  RESERVATION,
  VEHICLE,
} from "../constants";

/** 
  Method to create new booking
**/

function compareTime(startTime: string, endTime: string) {
  const _startTime = dayjs(`1970-01-01T${startTime}`);
  const _endTime = dayjs(`1970-01-01T${endTime}`);

  if (_startTime.isAfter(_endTime)) {
    return DATE_AFTER;
  } else if (_startTime.isBefore(_endTime)) {
    return DATE_BEFORE;
  } else {
    return DATE_EQUAL;
  }
}

function findAvailableVehicle(
  vehicles: Array<VEHICLE>,
  type: string,
  location: string,
  datetime: string,
  duration: number
) {
  const startDateTime = new Date(datetime);
  const endDateTime = new Date(calculateEndDateTime(datetime, duration));

  const days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
  const dayName = days[startDateTime.getUTCDay()];

  // Extract HH:MM:SS
  const startTime = startDateTime.toISOString().split("T")[1].split(".")[0];
  const endTime = endDateTime.toISOString().split("T")[1].split(".")[0];

  // Find a matching vehicle
  let vehicle = [];
  vehicle = vehicles
    .filter(
      (vehicle: VEHICLE) =>
        vehicle.type === type &&
        vehicle.location === location &&
        vehicle.availableDays.includes(dayName) &&
        (compareTime(startTime, vehicle.availableFromTime) === DATE_AFTER ||
          compareTime(startTime, vehicle.availableFromTime) === DATE_EQUAL) &&
        (compareTime(endTime, vehicle.availableToTime) === DATE_BEFORE ||
          compareTime(startTime, vehicle.availableToTime) === DATE_EQUAL)
    )
    .map((vehicle: any) => ({
      id: vehicle.id,
      minimumMinutesBetweenBookings: vehicle.minimumMinutesBetweenBookings,
    }));

  return vehicle;
}

function findAvailableSlots(
  reservations: Array<RESERVATION>,
  vehicles: any,
  newStart: string,
  durationMinutes: number
) {
  const startTime = new Date(newStart).getTime();
  const endTime = new Date(
    calculateEndDateTime(newStart, durationMinutes)
  ).getTime();

  return vehicles.map((vehicle: any) => {
    const minGap = vehicle.minimumMinutesBetweenBookings;

    // Check if the slot is available for this vehicle
    const isAvailable = !reservations.some((reservation: RESERVATION) => {
      if (reservation.vehicleId !== vehicle.id) return false;

      const existingStart = new Date(reservation.startDateTime).getTime();
      const existingEnd = new Date(
        calculateEndDateTime(reservation.endDateTime, Number(minGap))
      ).getTime();

      return (
        startTime < existingEnd && endTime > existingStart - minGap * 60000
      );
    });

    return {
      vehicleId: vehicle.id,
      available: isAvailable,
      minimumMinutesBetweenBookings: minGap,
    };
  });
}

function findAvailableSlotsForBooking(
  reservations: Array<RESERVATION>,
  vehicle: string,
  newStart: string,
  durationMinutes: number,
  minGap: number
) {
  const newStartTime = new Date(newStart).getTime();
  const newEndTime = new Date(
    calculateEndDateTime(newStart, durationMinutes)
  ).getTime();

  // Check if the slot is available for this vehicle
  const isAvailable = !reservations.some((reservation: RESERVATION) => {
    if (reservation.vehicleId !== vehicle) return false;

    const existingStart = new Date(reservation.startDateTime).getTime();
    const existingEnd = new Date(
      calculateEndDateTime(reservation.endDateTime, Number(minGap))
    ).getTime();

    return (
      newStartTime < existingEnd && newEndTime > existingStart - minGap * 60000
    );
  });

  return isAvailable;
}

function calculateEndDateTime(startDateTime: any, durationMinutes: any) {
  const start = new Date(startDateTime);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  return end.toISOString();
}

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      startDateTime,
      duration,
      vehicleId,
      customerName,
      customerEmail,
      customerPhone,
      minimumMinutesBetweenBookings,
    } = req.body;

    const data = await fsp.readFile(DATA_RESERVATION_FILE, "utf-8");
    const reservationData = JSON.parse(data);

    let SlotsAvail = findAvailableSlotsForBooking(
      [...reservationData?.reservations],
      vehicleId,
      startDateTime,
      duration,
      minimumMinutesBetweenBookings
    );

    if (SlotsAvail) {
      let _latestId =
        reservationData.reservations[reservationData.reservations.length - 1]
          .id + 1;

      let newBooking = {
        id: _latestId,
        vehicleId: vehicleId,
        startDateTime: startDateTime,
        endDateTime: calculateEndDateTime(startDateTime, duration),
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
      };

      let request = { ...reservationData };
      request.reservations.push(newBooking);

      await fsp.writeFile(
        DATA_RESERVATION_FILE,
        JSON.stringify(request, null, 2),
        "utf8"
      );

      res.status(200).json({
        message: "Successfully Reserved",
        booking: newBooking,
        status: true,
      });
    } else {
      res.json({ message: "Can't able to reserve", status: false });
    }
  } catch (error: unknown) {
    logger.error(
      "Reservation failed",
      error instanceof Error ? error.message : error
    );

    res.status(500).json({
      error: error instanceof Error ? error.message : error,
      status: false,
    });
  }
};

export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const { type, dateTime, duration, location } = req.query;

    let _vechicleData = await fsp.readFile(DATA_VEHICLE_FILE, "utf8");

    let vechicleData = JSON.parse(_vechicleData);
    let vechicleAvail = findAvailableVehicle(
      vechicleData.vehicles,
      type as string,
      location as string,
      dateTime as string,
      Number(duration)
    );

    let _reservationData = "";

    try {
      _reservationData = await fsp.readFile(DATA_RESERVATION_FILE, "utf8");
    } catch (error: any) {
      if (error.code === "ENOENT") {
        console.error("Error: File not found", error);
      } else if (error.code === "EACCES") {
        console.error("Error: Permission denied", error);
      } else {
        console.error("Error reading file:", error);
      }
      _reservationData = "";
    }

    let reservationData = JSON.parse(_reservationData);

    let slotsAvail = findAvailableSlots(
      [...reservationData.reservations],
      [...vechicleAvail],
      dateTime as string,
      Number(duration)
    );

    let slotsAvailList = slotsAvail
      .filter((slot: any) => slot.available)
      .map((slot: any) => ({
        id: slot.vehicleId,
        minimumMinutesBetweenBookings: slot.minimumMinutesBetweenBookings,
      }));

    res.status(200).json({
      availabilityList: slotsAvailList,
      availability: slotsAvailList.length > 0 ? true : false,
    });
  } catch (error: unknown) {
    logger.error(
      "Booking fetch failed",
      error instanceof Error ? error.message : error
    );

    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};
