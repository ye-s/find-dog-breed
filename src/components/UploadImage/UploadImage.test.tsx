import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UploadImage } from "./UploadImage";

test("render SearchAdvice component", () => {
  const { getByText } = render(<UploadImage />);
  const buttonOrDropdownZone = getByText("Click to select image");
  expect(buttonOrDropdownZone).toBeInTheDocument();
});
