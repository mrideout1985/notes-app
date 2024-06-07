import useSWR from 'swr'
import useUserStore from '../../stores/authstore'
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
				authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json())
	}

const useGetUserNotes = ({ email, sortBy }: UseArticlesOptions) => {
	const user = useUserStore()
	const fetcherWithToken = fetcher({ token: user.currentUser?.token })
	const key = ['my-articles', email, sortBy]
	const { data, error, isLoading, isValidating } = useSWR(
		key,
		([, email, sortBy]) =>
			fetcherWithToken(
				`http://localhost:3000/articles/my-articles/?email=${email}&sortBy=${sortBy}`,
			),
	)

	return {
		notes: data,
		isLoading,
		isValidating,
		error,
	}
}

export default useGetUserNotes
