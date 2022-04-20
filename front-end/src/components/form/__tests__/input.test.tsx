/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "../input"

const defaultValue = { title: "", description: "" }

describe("<Input />", () => {
	it("Input should render", () => {
		const TestInput = () => {
			const methods = useForm()
			return (
				<FormProvider {...methods}>
					<Input
						id='name'
						label='MyInput'
						type='text'
						fieldName='title'
					/>
				</FormProvider>
			)
		}
		render(<TestInput />)
		screen.getByRole("textbox", { name: "MyInput" })
	})

	it("should be able to type into input field", () => {
		const TestInput = () => {
			const methods = useForm()
			return (
				<FormProvider {...methods}>
					<Input
						id='title'
						label='MyInput'
						type='text'
						fieldName='title'
						defaultValue={defaultValue}
						placeHolder='title'
					/>
				</FormProvider>
			)
		}
		render(<TestInput />)
		const inputElement = screen.getByRole("textbox", { name: "MyInput" })
		fireEvent.change(inputElement, { target: { value: "testytesterson" } })
		expect(inputElement).toHaveValue("testytesterson")
	})
})
