import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import NotificationsDrawer from "../components/NotificationsDrawer";

jest.mock("react-markdown", () => {
  return {
    __esModule: true,
    default: ({ children }) => <div>{children}</div>,
  };
});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe("NotificationsDrawer", () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: "1",
            orgId: "123",
            title: "Test Notification",
            description: "Description here",
            severity: "info",
            read: false,
          },
        ]),
    });
  });

  it("renders correctly when isOpen is true", () => {
    render(<NotificationsDrawer isOpen={true} onClose={() => {}} />);
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <NotificationsDrawer isOpen={false} onClose={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("displays loading state while fetching data and renders notifications after fetching", async () => {
    render(<NotificationsDrawer isOpen={true} onClose={() => {}} />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByText("Test Notification")).toBeInTheDocument();
  });
});
