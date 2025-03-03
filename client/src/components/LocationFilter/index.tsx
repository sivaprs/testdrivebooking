import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LocationService from "../../services/locationService";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { LocationFilterProps } from "./interface";

const LocationFilter: React.FC<LocationFilterProps> = ({
  selectedLocation,
  onChange,
}) => {
  const [locations, setLocations] = useState<Array<string>>([]);

  const getLocations = async () => {
    try {
      const { data } = await LocationService.getLocations();
      setLocations(data?.locations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <FormControl>
      <InputLabel>Location</InputLabel>
      <Select
        value={selectedLocation}
        onChange={(event: any) => onChange(event.target.value)}
        style={{ height: "40px", width: "220px" }}
      >
        {locations.length > 0 &&
          locations.map((location) => (
            <MenuItem key={location} value={location}>
              <LocationOnIcon color="secondary" /> {location}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default LocationFilter;
