import useUserStore from '@/stores/authstore'
import axios from 'axios'
import { useState } from 'react'

const useHandleArchiveNotes = () => {
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const jwtToken = useUserStore((state) => state.currentUser?.token)

	const handleArchiveNotes = async (id: string, archive: boolean) => {
		try {
			const response = await axios.patch(
				`http://localhost:3000/articles/${
					archive ? 'add-to' : 'remove-from'
				}-archive/${id}    `,
				{
					archived: archive,
				},
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${jwtToken}`,
					},
				},
			)
			if (response.status === 200) {
				return response.data
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	return { handleArchiveNotes, loading, error }
}

export default useHandleArchiveNotes
