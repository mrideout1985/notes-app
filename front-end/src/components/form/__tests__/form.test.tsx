import { getByText, render, screen } from "@testing-library/react"
import { Form } from "../form"

const onSubmit = jest.fn()
const handleError = jest.fn()

describe("form component", () => {
	const formComponent = () =>
		render(
			<Form
				onSubmit={() => {}}
				handleError={handleError}
				children='Children'
			/>
		)
	it("should call on submit", () => {
		formComponent()
		const form = screen.getByRole("form")
		form.dispatchEvent(new Event("submit"))
		expect(onSubmit).toHaveBeenCalled()
	})

	it("should be able to take a child", () => {
		const formWithChild = () => {
			render(
				<Form
					onSubmit={undefined}
					handleError={function (errors: any): void {
						throw new Error("Function not implemented.")
					}}
				>
					<div>Hello Chiblings</div>
				</Form>
			)
		}
		const child = screen.getByText("Hello Chiblings")
		expect(formWithChild).toBeCalledWith(child)
	})
})
