import { render } from "@testing-library/react";

import App from "./App";

describe("<App />", () => {
    it("renders", () => {
        const screen = render(<App />);

        const h1 = screen.getByText("Vite + React");

        expect(h1).toBeInTheDocument();
    });
});
