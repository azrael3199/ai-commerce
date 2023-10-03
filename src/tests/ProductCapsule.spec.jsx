import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCapsule from "../components/ProductCapsule"; // Import the actual ProductCapsule component
import { dark } from "../themes"; // Import the dark theme

describe("ProductCapsule Component", () => {
  it("should render with product details", () => {
    const quantity = 3;
    const productName = "Sample Product";
    const productPrice = 10.99;
    const totalAmount = 32.97;
    const currency = "USD";

    // Render the ProductCapsule component with props
    render(
      <ProductCapsule
        quantity={quantity}
        productName={productName}
        productPrice={productPrice}
        totalAmount={totalAmount}
        currency={currency}
      />
    );

    // Query elements within the rendered component
    const quantityElement = screen.getByText(`QTY.`);
    const productNameElement = screen.getByText(productName);
    const pricePerItemElement = screen.getByText(
      `${productPrice.toFixed(2)} ${currency}`
    );
    const totalElement = screen.getByText(
      `${totalAmount.toFixed(2)} ${currency}`
    );

    // Assert that the product details are displayed
    expect(quantityElement).toBeInTheDocument();
    expect(productNameElement).toBeInTheDocument();
    expect(pricePerItemElement).toBeInTheDocument();
    expect(totalElement).toBeInTheDocument();
  });
});
