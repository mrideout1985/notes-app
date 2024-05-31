import { Box, InputLabel, Stack, TextField } from '@mui/material'
import { Control, Controller, FormState } from 'react-hook-form'
import styles from './AuthFormFields.module.scss'

interface AuthFormFields {
	control: Control<{ email: string; password: string }>
	formState: FormState<{ email: string; password: string }>
	disabledPasswordHelperText?: boolean
}

const AuthFormFields = ({
	control,
	formState,
	disabledPasswordHelperText,
}: AuthFormFields) => {
	return (
		<Stack gap={2} className={styles['authformfields__container']}>
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<Box className={styles['authformfields__email']}>
						<InputLabel
							className={styles['authformfields__email-label']}
							htmlFor="email"
						>
							Email
						</InputLabel>
						<TextField
							className={styles['authformfields__email-input']}
							id="email"
							type={'email'}
							InputLabelProps={{
								shrink: true,
							}}
							size="small"
							name={field.name}
							onChange={field.onChange}
							fullWidth
							error={Boolean(formState.errors.email)}
							helperText={formState.errors.email?.message}
						/>
					</Box>
				)}
			/>
			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<Box className={styles['authformfields__password']}>
						<InputLabel
							className={styles['authformfields__password-label']}
							htmlFor="password"
						>
							Password
						</InputLabel>
						<TextField
							className={styles['authformfields__password-input']}
							id="password"
							type={'password'}
							InputLabelProps={{
								shrink: true,
							}}
							size="small"
							name={field.name}
							value={field.value}
							onChange={field.onChange}
							fullWidth
							error={Boolean(formState.errors.password)}
							helperText={
								disabledPasswordHelperText
									? null
									: formState.errors.password?.message
							}
						/>
					</Box>
				)}
			/>
		</Stack>
	)
}

export default AuthFormFields
