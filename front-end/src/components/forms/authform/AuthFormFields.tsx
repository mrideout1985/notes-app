import { Box, InputLabel, Stack, TextField } from '@mui/material'
import { Control, Controller, FormState } from 'react-hook-form'

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
		<Stack gap={2}>
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<Box>
						<InputLabel htmlFor="email">Email</InputLabel>
						<TextField
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
					<Box>
						<InputLabel htmlFor="password">Password</InputLabel>
						<TextField
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
