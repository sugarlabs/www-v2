import { vi } from "vitest";

// ✅ Mock react-router-dom safely (no `any`)
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<
    typeof import("react-router-dom")
  >("react-router-dom");

  return {
    ...actual,
    RouterProvider: () => null,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: "/" }),
    useParams: () => ({}),
  };
});

import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(true).toBe(true);
  });
});
