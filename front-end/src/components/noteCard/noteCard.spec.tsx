/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react"
import { NoteCard } from "./noteCard"

const mockRemove = jest.fn()
const mockSubmitting = jest.fn()

describe("hello", () => {
	it("should render the component along props", () => {
		const screen = render(
			<NoteCard
				complete={false}
				description={"Hello"}
				title={"Test"}
				id={"1"}
				removeNote={() => mockRemove}
				submitting={false}
				toggleComplete={false}
			/>
		)
	})
})
