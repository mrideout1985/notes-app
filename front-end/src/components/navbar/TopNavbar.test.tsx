import { render, screen } from "@testing-library/react"
import React from "react"
import TopNavBar from "./TopNavbar"

test("renders learn react link", () => {
	render(<TopNavBar sideBarOpen={() => true} />)
	const linkElement = screen.getByText(/learn react/i)
	expect(linkElement).toBeInTheDocument()
})
