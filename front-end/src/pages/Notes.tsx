import useGetUserNotes, { Data } from "../api/hooks/getUserNotes"

type Props = {}

const Notes = (props: Props) => {
	// const [authEnticatedUser, setAuthEnticatedUser] = useState()

	const userNotes = useGetUserNotes()

	return (
		<div
			style={{
				display: "flex",
				gap: "1rem",
				flexWrap: "wrap",
				padding: "1.5rem",
			}}
		>
			{userNotes?.data?.map((note: Data) => {
				return (
					<div
						style={{
							width: "200px",
							height: "200px",
							fontSize: "10px",
							backgroundColor: "darkgray",
						}}
					>
						<h1>{note.title}</h1>
						<p>{note.description}</p>
					</div>
				)
			})}
		</div>
	)
}

export default Notes
