import useUserStore from '@/stores/authstore'
import { useEffect, useState } from 'react'

export interface Data {
	body: string
	createdAt: string
	description: string
	id: number
	published: boolean
	title: string
	updatedAt: string
	authorEmail: string
}

function useGetUserNotes(): {
	data: Data[] | undefined
	done: boolean
	error: string | undefined
	refetch: { execute: () => Promise<void> }
} {
	const [data, setData] = useState<Data[]>()
	const [done, setDone] = useState(false)
	const [error, setError] = useState('')
	const jwtToken = localStorage.getItem('token')

	const getUserNotes = async () => {
		if (jwtToken) {
			fetch('http://localhost:3000/articles/my-articles', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwtToken}`,
				},
			})
				.then(async (res) => await res.json())
				.then((res) => {
					if (res) {
						setData(res)
						setDone(true)
					}
				})
				.catch((error) => {
					if (error) {
						setError(error)
					}
				})
		}
	}

	const refetch = {
		execute: getUserNotes,
	}

	useEffect(() => {
		getUserNotes()
	}, [done])

	return {
		data,
		done,
		error,
		refetch,
	}
}

export default useGetUserNotes
