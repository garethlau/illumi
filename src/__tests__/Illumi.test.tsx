import React from "react";
import { render, screen } from "@testing-library/react";
import { Illumi } from "../components/Illumi";

test("renders renders Illumi", () => {
  render(<Illumi>App</Illumi>);
  expect(screen.getByText("App")).toBeInTheDocument();
});
