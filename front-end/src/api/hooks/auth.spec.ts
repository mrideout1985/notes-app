import useAuth from "./auth"
/* test file */

const mockThing = jest.fn()

describe("test", () => {
	it("calls the hook", async () => {
		const hook = useAuth("register", "mattrideout@email.com", "password123")
	})
})
