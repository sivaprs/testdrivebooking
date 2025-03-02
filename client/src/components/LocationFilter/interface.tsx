export interface LocationFilterProps {
  selectedLocation: number;
  onChange: (location: number) => void;
}

export interface Location {
  _id: number;
  name: string;
}
