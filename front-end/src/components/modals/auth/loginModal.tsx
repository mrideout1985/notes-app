import React, { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useAuth } from "../../../hooks/useAuth"
import { userService } from "../../../services/userService"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import styles from "./loginModal.module.scss"
import { authErrors } from "../../../utils/formErrors"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import { FeedPerson, XCircle } from "../../icons"

interface LoginModalInterface {
	toggleLogin: boolean
	setToggleLogin: React.Dispatch<React.SetStateAction<boolean>>
	toggleSignUp: boolean
	setToggleSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({
	toggleLogin,
	setToggleLogin,
	setToggleSignUp,
}: LoginModalInterface) => {
	const { user, setUser } = useAuth()
	const [submitting, setSubmitting] = useState(false)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		if (submitting) {
			userService.getLoggedInUser().then(res => setUser(res))
		}
		return () => {
			setSubmitting(false)
		}
	}, [setUser, submitting])

	const onSubmit = async (data: any) => {
		await userService.login(data.email, data.password).then(() => {
			userService
				.getLoggedInUser()
				.then(res => setUser(res))
				.then(() => {
					setToggleLogin(false)
					setSubmitting(true)
				})
				.finally(() => navigate("/notes"))
		})
	}

	const handleLogout = () => {
		userService.logout()
		setUser(null)
		window.localStorage.clear()
		navigate("/")
	}

	const DropDown = (): JSX.Element => {
		return (
			<DropdownButton
				className={styles.dropdown}
				title={<FeedPerson size={35} />}
				menuVariant='dark'
				variant='none'
			>
				<Dropdown.Item href='/profile'>Profile</Dropdown.Item>
				<Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
				<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
			</DropdownButton>
		)
	}

	const LoginSignUp = () => {
		const onClick = () => setToggleLogin(true)

		return (
			<>
				<Button onClick={onClick}>Sign In</Button>
				<Button onClick={onClick}>Sign Up</Button>
			</>
		)
	}

	return (
		<>
			{user ? <DropDown /> : <LoginSignUp />}
			<Modal
				show={toggleLogin}
				backdrop='static'
				centered={true}
				keyboard={false}
				size='sm'
				className={styles.modal}
			>
				<button
					onClick={() => setToggleLogin(false)}
					className={styles.closeIcon}
				>
					<XCircle />
				</button>
				<h4>Sign in to your account</h4>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.input}>
						<input
							type='text'
							placeholder='Email'
							{...register("email", authErrors.email)}
						/>
						<div className={styles.errors}>
							{errors?.email && errors.email.message}
						</div>
					</div>
					<div className={styles.input}>
						<input
							type='password'
							placeholder='Password'
							{...register("password", authErrors.password)}
						/>
						<div className={styles.errors}>
							{errors?.password && errors?.password.message}
						</div>
					</div>
					<div className={styles.buttons}>
						<Button type='submit'>Sign in</Button>
					</div>
				</form>
			</Modal>
		</>
	)
}

export { LoginModal }
