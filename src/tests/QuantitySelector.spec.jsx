import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuantitySelector from "../components/QuantitySelector";

describe("QuantitySelector Component", () => {
  it("should render with initial quantity and buttons", () => {
    const quantity = 3;

    // Render the QuantitySelector component with props
    render(
      <QuantitySelector
        quantity={quantity}
        addItemToCart={() => {}}
        removeItemFromCart={() => {}}
      />
    );

    // Query elements within the rendered component
    const decrementButton = screen.getByTestId("KeyboardArrowLeftOutlinedIcon");
    const quantityText = screen.getByText(quantity.toString());
    const incrementButton = screen.getByTestId(
      "KeyboardArrowRightOutlinedIcon"
    );

    // Assert that the initial quantity and buttons are displayed
    expect(decrementButton).toBeInTheDocument();
    expect(quantityText).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
  });

  it("should increment the quantity when the increment button is clicked", () => {
    const quantity = 3;
    const addItemToCart = jest.fn();

    // Render the QuantitySelector component with props
    render(
      <QuantitySelector
        quantity={quantity}
        addItemToCart={addItemToCart}
        removeItemFromCart={() => {}}
      />
    );

    // Query the increment button
    const incrementButton = screen.getByTestId(
      "KeyboardArrowRightOutlinedIcon"
    );

    // Click the increment button
    fireEvent.click(incrementButton);

    // Assert that addItemToCart is called once
    expect(addItemToCart).toHaveBeenCalledTimes(1);
  });

  it("should decrement the quantity when the decrement button is clicked", () => {
    const quantity = 3;
    const removeItemFromCart = jest.fn();

    // Render the QuantitySelector component with props
    render(
      <QuantitySelector
        quantity={quantity}
        addItemToCart={() => {}}
        removeItemFromCart={removeItemFromCart}
      />
    );

    // Query the decrement button
    const decrementButton = screen.getByTestId("KeyboardArrowLeftOutlinedIcon");

    // Click the decrement button
    fireEvent.click(decrementButton);

    // Assert that removeItemFromCart is called once
    expect(removeItemFromCart).toHaveBeenCalledTimes(1);
  });

  it("should disable the increment button when quantity is 10", () => {
    const quantity = 10;

    // Render the QuantitySelector component with props
    render(
      <QuantitySelector
        quantity={quantity}
        addItemToCart={() => {}}
        removeItemFromCart={() => {}}
      />
    );

    // Query the increment button
    const incrementButton = screen
      .getByTestId("KeyboardArrowRightOutlinedIcon")
      .closest("button");

    // Assert that the increment button is disabled
    expect(incrementButton).toBeDisabled();
  });
});
