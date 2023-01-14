import useGetUserNotes, { Data } from '@/api/hooks/getUserNotes'
import { getUserNotes } from '@/api/services/services'
import CreateNote from '@/components/create-note/CreateNote'
import useUserStore from '@/stores/authstore'

const Notes = () => {
	const { data, done, error } = useGetUserNotes()

	return (
		<div>
			<CreateNote />
			<div
				style={{
					display: 'flex',
					gap: '1rem',
					flexWrap: 'wrap',
				}}
			>
				{data?.map((note: Data) => {
					return (
						<div
							key={note.id}
							style={{
								width: '200px',
								height: '200px',
								fontSize: '10px',
								backgroundColor: 'darkgray',
							}}
						>
							<h1>{note.title}</h1>
							<p>{note.description}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Notes
