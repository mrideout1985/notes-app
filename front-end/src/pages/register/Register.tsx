import { yupResolver } from '@hookform/resolvers/yup'
import {
	Alert,
	Box,
	Button,
	List,
	ListItem,
	Paper,
	Popover,
	PopoverPaper,
	Popper,
	Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import AuthFormFields from '../../components/Forms/AuthForm/AuthFormFields'
import useRegister from '../../api/hooks/auth/useRegister'
import styles from './Register.module.scss'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export interface AuthValues {
	email: string
	password: string
}

const Register = () => {
	const navigate = useNavigate()
	const register = useRegister({
		onSuccess: () => {
			navigate('/login')
		},
	})
	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup
			.string()
			.required('Password is required')
			.min(8, 'Password must be at least 8 characters')
			.max(32, 'Password must be at most 32 characters')
			.matches(
				/[A-Z]/,
				'Password must contain at least one uppercase letter',
			)
			.matches(
				/[a-z]/,
				'Password must contain at least one lowercase letter',
			)
			.matches(/[0-9]/, 'Password must contain at least one number')
			.matches(
				/[!@#$%^&*(),.?":{}|<>]/,
				'Password must contain at least one special character',
			),
	})
	const ref = useRef(null)

	const form = useForm<{ email: string; password: string }>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	})

	const onSubmit = (data: { email: string; password: string }) => {
		register.execute(data)
	}

	const password = form.watch('password')

	const passwordConditions = [
		{
			id: 1,
			text: 'At least 8 characters',
			test: (password: string) => /.{8,}/.test(password),
		},
		{
			id: 2,
			text: 'At least one uppercase letter',
			test: (password: string) => /[A-Z]/.test(password),
		},
		{
			id: 3,
			text: 'At least one lowercase letter',
			test: (password: string) => /[a-z]/.test(password),
		},
		{
			id: 4,
			text: 'At least one number',
			test: (password: string) => /[0-9]/.test(password),
		},
		{
			id: 5,
			text: 'At least one special character',
			test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
		},
		{
			id: 6,
			text: 'Must be less than 32 characters',
			test: (password: string) => password.length <= 32,
		},
	]

	return (
		<Box className={styles.container}>
			<Paper
				component="form"
				onSubmit={form.handleSubmit(onSubmit)}
				elevation={8}
				className={styles.paper}
				ref={ref}
			>
				<Box className={styles.formfields}>
					<AuthFormFields
						control={form.control}
						formState={form.formState}
						disabledPasswordHelperText={true}
					/>
					<Popper
						anchorEl={ref.current}
						open={Boolean(form.formState.errors.password)}
						placement="right"
						modifiers={[
							{
								name: 'offset',
								options: {
									offset: [0, 20],
								},
							},
						]}
					>
						<Paper sx={{ padding: 2 }}>
							<List>
								{passwordConditions.map((condition) => {
									return (
										<ListItem
											key={condition.id}
											className={
												condition.test(password)
													? styles.good
													: styles.bad
											}
										>
											{condition.text}
										</ListItem>
									)
								})}
							</List>
						</Paper>
					</Popper>
				</Box>
				<Box className={styles.footer}>
					<Box className={styles.responseError}>
						{register.responseError && (
							<Typography mt={1} color="red">
								{register.responseError}
							</Typography>
						)}
					</Box>
					<Box className={styles.actions}>
						<Link color="black" to="/login">
							Login
						</Link>
						<Button
							disabled={register.loading}
							size="small"
							variant="contained"
							type="submit"
						>
							Register
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	)
}

export default Register
