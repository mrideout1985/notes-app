/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { TextArea } from "../textarea"

const defaultValue = {
	title: "fuck this stupid app",
	description: "fuck this stupid app",
}

describe("<TextArea />", () => {
	it("Input should render", () => {
		const TestTextArea = () => {
			const methods = useForm()
			return (
				<FormProvider {...methods}>
					<TextArea
						fieldName='description'
						label='description'
						defaultValue={defaultValue}
						placeholder='description'
					/>
				</FormProvider>
			)
		}
		render(<TestTextArea />)
		screen.getByRole("textbox", { name: "description" })
	})

	it("should be able to type into textarea field", () => {
		const TestTextArea = () => {
			const methods = useForm()
			return (
				<FormProvider {...methods}>
					<TextArea
						fieldName='description'
						label='description'
						defaultValue={defaultValue}
						placeholder='description'
					/>
				</FormProvider>
			)
		}
		render(<TestTextArea />)
		const textareaElement = screen.getByRole("textbox", {
			name: "description",
		})
		fireEvent.change(textareaElement, {
			target: { value: "testytesterson" },
		})
		expect(textareaElement).toHaveValue("testytesterson")
	})

	it("should have a working label", () => {
		const TestTextArea = () => {
			const methods = useForm()
			return (
				<FormProvider {...methods}>
					<TextArea
						fieldName='description'
						label='description'
						defaultValue={defaultValue}
						placeholder='description'
					/>
				</FormProvider>
			)
		}
		render(<TestTextArea />)
		expect(screen.getByLabelText("description")).toBeInTheDocument()
	})

	it("should have correct defaultValue", () => {
		const TestTextArea = () => {
			const methods = useForm()
			return (
				<FormProvider {...methods}>
					<TextArea
						fieldName='description'
						label='description'
						defaultValue={defaultValue}
						placeholder='description'
					/>
				</FormProvider>
			)
		}
		render(<TestTextArea />)
		expect(screen.getByLabelText("description")).toHaveValue(
			"fuck this stupid app"
		)
	})

	it("should show errors", () => {
		const TestTextArea = () => {
			const methods = useForm()
			return (
				<FormProvider {...methods}>
					<TextArea
						fieldName='description'
						label='description'
						defaultValue={defaultValue}
						placeholder='description'
					/>
				</FormProvider>
			)
		}
		render(<TestTextArea />)
		const textareaElement = screen.getByRole("textbox", {
			name: "description",
		})
		const errorElement = screen.getByTestId("errors-container-element")
		fireEvent.change(textareaElement, { target: { value: "1" } })
		expect(errorElement).toBeInTheDocument()
	})
})
