import { act, renderHook } from '@testing-library/react'
import { loginHandler } from '../../../mocks/handlers'
import { makeServerErrorResponsePost } from '../../../mocks/helpers'
import { server } from '../../../mocks/server'
import useLogin from './useLogin'

const mockOnSuccess = jest.fn()
const mockOnError = jest.fn()

jest.mock('../../../stores/authstore', () => {
	const mockStore = jest.fn()
	return {
		__esModule: true,
		default: mockStore,
	}
})

describe('useLogin', () => {
	it('should successfully call the api', async () => {
		const { result } = renderHook(() =>
			useLogin({ onSuccess: mockOnSuccess }),
		)

		await act(
			async () =>
				await result.current.execute({
					email: 'test@test.com',
					password: 'bigtestypassword',
				}),
		)

		expect(mockOnSuccess).toHaveBeenCalled()
	})

	it('should return an error when the api fails', async () => {
		server.use(makeServerErrorResponsePost(loginHandler))

		const { result } = renderHook(() => useLogin({ onError: mockOnError }))

		await act(
			async () =>
				await result.current.execute({
					email: 'test@test.com',
					password: 'bigtestypassword',
				}),
		)

		expect(mockOnError).toHaveBeenCalled()
	})
})
