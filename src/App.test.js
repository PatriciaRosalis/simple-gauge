import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders data when API success", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ min: 267, value: 735, max: 914 }),
      ok: true,
    })
  );
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("267")).toBeInTheDocument();
    expect(screen.getByText("735")).toBeInTheDocument();
    expect(screen.getByText("914")).toBeInTheDocument();
  });
});

test("renders data when API error", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: "The server is on fire" }),
      ok: false,
    })
  );
  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByText("Something went wrong! Try again.")
    ).toBeInTheDocument();
  });
});
