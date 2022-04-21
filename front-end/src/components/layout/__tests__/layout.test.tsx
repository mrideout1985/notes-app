import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../../../stores/authProvider"
import { Layout } from "../layout"

const MockComponent = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Layout>Children</Layout>
			</AuthProvider>
		</BrowserRouter>
	)
}

describe("Layout", () => {
	it("should accept a children prop & render", () => {
		const TestLayout = () => {
			return <MockComponent />
		}
		render(<TestLayout />)
		expect(screen.getByText("Children")).toBeInTheDocument()
	})
})
