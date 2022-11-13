import React from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
	className?: string
	onClick: any
	type: "button" | "submit" | "reset" | undefined
	text: string
}

const Button: React.FC<ButtonProps> = ({ text, type, onClick, className }) => {
	return (
		<button
			type={type}
			className={type !== "submit" ? styles["cancel"] : ""}
			onClick={onClick}
		>
			{text}
		</button>
	)
}

export default Button
