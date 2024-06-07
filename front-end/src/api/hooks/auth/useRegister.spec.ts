import { act, renderHook } from '@testing-library/react'
import useRegister from './useRegister'
import { server } from '../../../mocks/server'
import { makeServerErrorResponsePost } from '../../../mocks/helpers'
import { registerHandler } from '../../../mocks/handlers'

const mockOnSuccess = jest.fn()
const mockOnError = jest.fn()

describe('useRegister', () => {
	it('should successfully call the api', async () => {
		const { result } = renderHook(() =>
			useRegister({ onSuccess: mockOnSuccess }),
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
		server.use(makeServerErrorResponsePost(registerHandler))

		const { result } = renderHook(() =>
			useRegister({ onError: mockOnError }),
		)

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
