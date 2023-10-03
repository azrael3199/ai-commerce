import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard"; // Import the actual ProductCard component
import { AppContext } from "../context/AppContext"; // Import the AppContext for mocking context

describe("ProductCard Component", () => {
  // Define a mock context value for testing
  const mockContextValue = {
    currentUser: {
      cartItems: {},
    },
    startSession: () => {},
  };

  it("should render with product details", () => {
    const productId = "123";
    const productName = "Sample Product";
    const description = "Product Description";
    const imageUrl = "sample-image.jpg";
    const price = 10.99;
    const currency = "USD";

    // Render the ProductCard component with props and mock context
    render(
      <AppContext.Provider value={mockContextValue}>
        <ProductCard
          productId={productId}
          productName={productName}
          description={description}
          imageUrl={imageUrl}
          price={price}
          currency={currency}
        />
      </AppContext.Provider>
    );

    // Query elements within the rendered component
    const productNameElement = screen.getByText(productName);
    const descriptionElement = screen.getByText(description);
    const priceElement = screen.getByText(`${price.toFixed(2)} ${currency}`);
    const addToCartButton = screen.getByText("Add to Cart");

    // Assert that the product details are displayed
    expect(productNameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(addToCartButton).toBeInTheDocument();
  });

  it("should add and remove items from the cart", () => {
    const productId = "123";
    const productName = "Sample Product";
    const description = "Product Description";
    const imageUrl = "sample-image.jpg";
    const price = 10.99;
    const currency = "USD";

    // Render the ProductCard component with props and mock context
    render(
      <AppContext.Provider value={mockContextValue}>
        <ProductCard
          productId={productId}
          productName={productName}
          description={description}
          imageUrl={imageUrl}
          price={price}
          currency={currency}
        />
      </AppContext.Provider>
    );

    // Query the add to cart button
    const addToCartButton = screen.getByText("Add to Cart");

    // Click the add to cart button twice
    fireEvent.click(addToCartButton);

    // Get the left icon
    const removeFromCart = screen.getByTestId("KeyboardArrowLeftOutlinedIcon");
    const addToCart = screen.getByTestId("KeyboardArrowRightOutlinedIcon");

    fireEvent.click(addToCart);

    // Query the quantity selector
    const quantitySelector = screen.getByText("2");

    // Assert that the quantity is displayed as 2
    expect(quantitySelector).toBeInTheDocument();

    // Click the remove button once
    fireEvent.click(removeFromCart);

    // Assert that the quantity is displayed as 1
    expect(quantitySelector).toHaveTextContent("1");
  });

  // Add more test cases as needed
});
