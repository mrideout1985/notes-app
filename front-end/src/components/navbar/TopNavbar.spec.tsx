/* eslint-disable jest/no-focused-tests */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TopNavBar from "./TopNavbar";

type MockLocalStorage = {
  getItem: jest.Mock;
  setItem: jest.Mock;
  removeItem: jest.Mock;
  clear: jest.Mock;
} & Storage;

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
} as MockLocalStorage;

jest
  .spyOn(window, "localStorage", "get")
  .mockImplementation(() => mockLocalStorage);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../../api/services/services", () => ({
  logout: jest.fn(),
}));

const mockLogout = jest.fn();

describe("TopNavbar", () => {
  it("should render", () => {
    const screen = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopNavBar sideBarOpen={() => false} />} />
        </Routes>
      </BrowserRouter>
    );

    const brand = screen.getByText("otes");

    expect(brand).toBeInTheDocument();
  });

  it("should by default have no user profile dropdown visible when no user is logged in", () => {
    const screen = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopNavBar sideBarOpen={() => false} />} />
        </Routes>
      </BrowserRouter>
    );

    const profileButton = screen.getByLabelText("user options dropdown");

    expect(profileButton).toHaveAttribute("aria-hidden", "true");
  });

  it("should show the user profile button when there is a user", () => {
    mockLocalStorage.getItem.mockReturnValue("token");

    const screen = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopNavBar sideBarOpen={() => false} />} />
        </Routes>
      </BrowserRouter>
    );

    const profileButton = screen.getByLabelText("user options dropdown");

    expect(profileButton).toHaveAttribute("aria-hidden", "false");
  });
});
