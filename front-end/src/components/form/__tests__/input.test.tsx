/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { Input } from "../input"

const defaultValue = { title: "bangle", description: "bangle" }

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

	it("should have correct type", () => {
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

		expect(inputElement).toHaveAttribute("type", "text")
	})

	it("should have a working label", () => {
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

		expect(screen.getByLabelText("MyInput")).toBeTruthy()
	})

	it("should have correct defaultValue", () => {
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

		expect(screen.getByLabelText("MyInput")).toHaveValue("bangle")
	})

	it("should show errors", () => {
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
		const errorElement = screen.getByTestId("errors-container-element")
		fireEvent.change(inputElement, {
			target: { value: "1" },
		})
		expect(errorElement).toBeInTheDocument()
	})
})
