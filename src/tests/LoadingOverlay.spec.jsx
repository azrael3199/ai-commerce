import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingOverlay from "../components/LoadingOverlay"; // Import the actual LoadingOverlay component

describe("LoadingOverlay Component", () => {
  it("should render with the provided loading message", () => {
    const loadingMessage = "Loading data...";

    // Render the LoadingOverlay component
    render(<LoadingOverlay loadingMessage={loadingMessage} />);

    // Query elements within the rendered component
    const loadingMessageElement = screen.getByText(loadingMessage);
    const circularProgressElement = screen.getByRole("progressbar");

    // Assert that the loading message is displayed
    expect(loadingMessageElement).toBeInTheDocument();

    // Assert that the circular progress indicator is displayed
    expect(circularProgressElement).toBeInTheDocument();
  });

  it("should render with the default loading message if none is provided", () => {
    // Render the LoadingOverlay component without a loading message
    render(<LoadingOverlay />);

    // Query the default loading message element
    const defaultLoadingMessageElement = screen.getByText("Loading ...");

    // Assert that the default loading message is displayed
    expect(defaultLoadingMessageElement).toBeInTheDocument();
  });

  // Add more test cases as needed
});
