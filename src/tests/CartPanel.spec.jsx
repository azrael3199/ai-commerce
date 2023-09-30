import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppContext } from "../context/AppContext";
import CartPanel from "../components/CartPanel";
import { configure } from "@testing-library/react";

configure({ asyncUtilTimeout: 15000 });

const setLoading = jest.fn();
const setError = jest.fn();
const startSession = jest.fn();
// Mock the useContext hook to provide values for testing
const mockContextValue = {
  currentUser: {
    email: "test@example.com",
    cartItems: {
      item1: {
        name: "Test Product 1",
        quantity: 2,
        price: 10.0,
        amount: 20.0,
        currency: "USD",
      },
    },
  },
  setLoading: setLoading,
  setError: setError,
  startSession: startSession,
};

// Mock the useStripe and useElements hooks
jest.mock("@stripe/react-stripe-js", () => ({
  useStripe: () => ({
    // Mock any Stripe methods or properties you need
  }),
  useElements: () => ({
    // Mock any Elements-related methods or properties you need
  }),
  CardElement: () => <div data-testid="mock-card-element" />, // Mock CardElement as a div
}));

// Mock the api.createDocument function
jest.mock("../appwrite", () => ({
  __esModule: true,
  default: {
    createDocument: () => Promise.resolve({}),
  },
}));

describe("CartPanel Component", () => {
  it("renders CartPanel component correctly", () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <CartPanel isOpen={true} onClose={() => {}} />
      </AppContext.Provider>
    );

    // Ensure that the cart items are displayed
    const productElement = screen.getByText("Test Product 1");
    expect(productElement).toBeInTheDocument();
  });

  it("handles checkout button click", async () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <CartPanel isOpen={true} onClose={() => {}} />
      </AppContext.Provider>
    );

    // Find and click the checkout button
    const checkoutButton = screen.getByText("Checkout");
    fireEvent.click(checkoutButton);

    // Ensure that the loading state is set
    expect(mockContextValue.setLoading).toHaveBeenCalledWith(
      "Processing Payment"
    );

    // Wait for the mockStripePayment to complete
    await waitFor(() => {
      expect(mockContextValue.setError).toHaveBeenCalledWith({
        message: "Order placed successfully",
        type: "success",
      });
    });

    // Ensure that startSession is called with the updated user
    expect(mockContextValue.startSession).toHaveBeenCalledWith({
      email: "test@example.com",
      cartItems: {},
    });

    // Ensure that the loading state is reset
    expect(mockContextValue.setLoading).toHaveBeenCalledWith(null);
  }, 10000);

  it("disables checkout button when cart is empty", () => {
    // Modify the context value to have an empty cart
    const emptyCartContextValue = {
      ...mockContextValue,
      currentUser: { ...mockContextValue.currentUser, cartItems: {} },
    };
    render(
      <AppContext.Provider value={emptyCartContextValue}>
        <CartPanel isOpen={true} onClose={() => {}} />
      </AppContext.Provider>
    );

    // Find the checkout button and ensure it's disabled
    const checkoutButton = screen.getByText("Checkout");
    expect(checkoutButton).toBeDisabled();
  });
});
