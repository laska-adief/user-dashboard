import { render } from "@testing-library/react";
import Loading from "./loading";
import "@testing-library/jest-dom";

describe("Loading Component", () => {
  it("render loading skeleton", () => {
    const { container } = render(<Loading />);

    expect(container.firstChild).toHaveClass("animate-pulse");

    const allSkeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(allSkeletons.length).toBeGreaterThan(10);
  });
});
