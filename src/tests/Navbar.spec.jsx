import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar"; // Import the actual Navbar component
import { AppContext } from "../context/AppContext";

describe("Navbar Component", () => {
  it("should render with the app name and icons", () => {
    const isCartOpen = false;
    const handleCartToggle = jest.fn(); // Mock the cart toggle function
    const currentUser = {
      name: "John Doe", // Replace with your user data
    };

    // Render the Navbar component wrapped in the AppContext provider
    render(
      <AppContext.Provider value={{ currentUser }}>
        <Navbar isCartOpen={isCartOpen} handleCartToggle={handleCartToggle} />
      </AppContext.Provider>
    );

    // Query elements within the rendered component
    const cartIconElement = screen.getByTestId("ShoppingCartOutlinedIcon");
    const userIconElement = screen.getByTestId("AccountCircleOutlinedIcon");

    // Assert that the app name and icons are displayed
    expect(cartIconElement).toBeInTheDocument();
    expect(userIconElement).toBeInTheDocument();
  });

  it("should call handleCartToggle when the cart icon is clicked", () => {
    const isCartOpen = false;
    const handleCartToggle = jest.fn(); // Mock the cart toggle function
    const currentUser = {
      name: "John Doe", // Replace with your user data
    };

    // Render the Navbar component wrapped in the AppContext provider
    render(
      <AppContext.Provider value={{ currentUser }}>
        <Navbar isCartOpen={isCartOpen} handleCartToggle={handleCartToggle} />
      </AppContext.Provider>
    );

    // Query and click the cart icon
    const cartIconElement = screen.getByTestId("ShoppingCartOutlinedIcon");
    fireEvent.click(cartIconElement);

    // Assert that handleCartToggle is called
    expect(handleCartToggle).toHaveBeenCalledTimes(1);
  });
});
