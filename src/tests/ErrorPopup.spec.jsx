import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ErrorPopup from "../components/ErrorPopup"; // Import the actual ErrorPopup component

describe("ErrorPopup Component", () => {
  it("should render with the provided message", () => {
    const message = "Test error message";
    const reset = jest.fn(); // Mock the reset function
    const type = "error";

    // Render the ErrorPopup component
    render(<ErrorPopup message={message} reset={reset} type={type} />);

    // Query elements within the rendered component
    const errorMessage = screen.getByText(message);
    const closeButton = screen.getByRole("button", { name: "close" });

    // Assert that the error message is displayed
    expect(errorMessage).toBeInTheDocument();

    // Simulate a click on the close button
    fireEvent.click(closeButton);

    // Ensure that the reset function is called when the close button is clicked
    expect(reset).toHaveBeenCalledTimes(1);
  });

  // Add more test cases as needed
});
