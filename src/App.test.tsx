import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Check application render", () => {
  test("render App component", () => {
    const { getByText } = render(<App />);
    const h1Element = getByText("Are you looking for a dog?");
    expect(h1Element).toBeInTheDocument();
  });
});
