export type NoteForms = "title" | "description"

export const noteformErrors = {
	title: {
		minLength: {
			value: 3,
			message: "Title must have at least 3 characters",
		},
		maxLength: {
			value: 40,
			message: "Title must have less than 40 characters",
		},
	},
	description: {
		required: "Description is required",
		minLength: {
			value: 10,
			message: "Description must have at least 10 characters",
		},
	},
}

export type AuthForms = "email" | "password"

export const authErrors = {
	email: {
		required: "Email is required",
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: "invalid email address",
		},
		minLength: {
			value: 4,
			message: "Email must have at least 4 characters",
		},
	},
	password: {
		required: "Password is required",
		pattern: {
			value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
			message:
				"Password must be a minimum of 8 characters, contain at least one letter and one number",
		},
		minLength: {
			value: 8,
			message: "Password must be a minimum of 8 characters",
		},
	},
}
