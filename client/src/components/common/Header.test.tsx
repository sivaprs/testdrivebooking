import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("Header component rendering", () => {
  render(<Header />);
  const element = screen.getByText(/Hotel Booking/i);
  expect(element).toBeInTheDocument();
});
