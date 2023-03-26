import useUserStore from '@/stores/authstore'
import { useEffect, useState } from 'react'

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
}

export default function useArticles({ sortBy, email }: UseArticlesOptions) {
	const [articles, setArticles] = useState<Article[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const jwtToken = useUserStore((state) => state.currentUser?.token)

	const fetchArticles = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/articles/my-articles?email=${email}&sortBy=${sortBy}`,

				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${jwtToken}`,
					},
				},
			)
			if (!response.ok) {
				throw new Error(`Failed to fetch articles: ${response.status}`)
			}
			const data = await response.json()
			setArticles(data)
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchArticles()
	}, [sortBy])

	const refetch = () => {
		setLoading(true)
		fetchArticles()
	}

	return { articles, loading, error, refetch }
}
