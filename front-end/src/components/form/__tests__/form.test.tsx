import { render, screen } from "@testing-library/react"
import { Form } from "../form"

const onSubmit = jest.fn()
const handleError = jest.fn()

const formComponent = () =>
	render(
		<Form
			onSubmit={onSubmit(() => console.log("onSubmit"), handleError)}
			handleError={handleError}
			children='Children'
		/>
	)

it("should call onSubmit", () => {
	formComponent()
	const form = screen.getByRole("form")
	form.dispatchEvent(new Event("submit"))
	expect(onSubmit).toHaveBeenCalled()
})
