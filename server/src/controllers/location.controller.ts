import { Request, Response } from "express";
import fs from "fs";
import logger from "../utils/logger";

/** 
  Method to fetch the list of locations in the DB
**/

export const getLocations = async (req: Request, res: Response) => {
  try {
    const fd = await fs.promises.open("db/vehicles.json", "r");
    const data = JSON.parse(await fd.readFile({ encoding: "utf8" }));
    const _locations = data?.vehicles.map((vehicle: any) => vehicle.location);
    const locations = [...new Set(_locations)];
    res.json({ locations });
  } catch (error: unknown) {
    logger.error(
      "Location fetch failed",
      error instanceof Error ? error.message : error
    );
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};
