/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
describe("name", () => {
	before(() => {
		cy.visit("/")
	})
	it("should login", () => {
		cy.intercept("GET", "*/user").as("user")

		cy.findByRole("button", { name: "Sign In" }).click()
		cy.get("[name='email']").type("123@google.com")
		cy.get("[name='password']").type("cockring123")
		cy.get("[type='submit']").click()
		cy.wait("@user")
	})

	it("should create a note", () => {
		cy.intercept("GET", "*users/notes").as("getNote")
		cy.intercept("POST", "**/notes").as("postNote")
		cy.findByRole("button", { name: /add note/i }).click()
		cy.findByRole("dialog").within(() => {
			cy.findByRole("textbox", { name: /title/i }).type("Test Note")
			cy.findByRole("textbox", { name: /description/i }).type(
				"Test Description 123 123 123"
			)
			cy.get("[type='submit']").click()
			cy.wait("@getNote")
			cy.wait("@postNote")
		})

		cy.contains("Test Note")
	})
})
