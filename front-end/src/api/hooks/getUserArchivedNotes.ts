import useUserStore from '@/stores/authstore'
import useSWR from 'swr'

interface UseArticlesOptions {
	email: string | undefined
	sortBy: 'asc' | 'desc'
}

export interface Article {
	id: string
	title: string
	description: string
	published: boolean
	createdAt: Date
	updatedAt: Date
	authorEmail: string
	archived: boolean
}

const fetcher =
	({ token }: { token: string | undefined }) =>
	async (url: string) => {
		return await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json())
	}

const useGetArchivedUserNotes = ({ email, sortBy }: UseArticlesOptions) => {
	const user = useUserStore()
	const fetcherWithToken = fetcher({ token: user.currentUser?.token })
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`http://localhost:3000/articles/my-archived-articles/?email=${email}&sortBy=${sortBy}`,
		fetcherWithToken,
	)

	return {
		notes: data,
		isLoading,
		isValidating,
		mutate,
		error,
	}
}

export default useGetArchivedUserNotes
