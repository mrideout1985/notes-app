import styles from "./button.module.scss"

type ButtonProps = {
	onClick?: any
	text: string
	type: "button" | "submit" | "reset"
}

const Button = ({ onClick, text, type }: ButtonProps): JSX.Element => {
	return (
		<button type={type} className={styles["button"]} onClick={onClick}>
			{text ? text : "Button"}
		</button>
	)
}

export { Button }
