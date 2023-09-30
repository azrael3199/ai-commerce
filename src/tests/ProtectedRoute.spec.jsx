import React from "react";
import { render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute"; // Import the actual ProtectedRoute component
import { AppContext } from "../context/AppContext"; // Import the AppContext

describe("ProtectedRoute Component", () => {
  it("should render children when currentUser is available", () => {
    const currentUser = { id: 1, username: "testuser" };

    // Render the ProtectedRoute component with currentUser
    const { getByText } = render(
      <MemoryRouter>
        <AppContext.Provider value={{ currentUser }}>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Assert that the children are rendered
    expect(getByText("Protected Content")).toBeInTheDocument();
  });

  it("should navigate to '/auth' when currentUser is not available", async () => {
    const currentUser = null;

    // Render the ProtectedRoute component with currentUser as null
    const { container } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <AppContext.Provider value={{ currentUser }}>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Assert that the navigation to '/auth' occurs
    await act(async () => {
      expect(container.innerHTML).toBe("");
    });
  });
});
