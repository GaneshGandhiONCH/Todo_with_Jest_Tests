import { render, screen } from "@testing-library/react";
import Test from "./Test";
// import React from "react";

test("renders learn react link", () => {
  render(<Test />);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
