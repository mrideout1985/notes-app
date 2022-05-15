import styles from "../styles/pagestyles/unauthorized.module.scss"

const Unauthorized = () => {
	return (
		<section className={styles.container}>
			<h1>Unauthorized</h1>
			<br />
			<p>You do not have access to the requested page. Please log in.</p>
		</section>
	)
}

export { Unauthorized }
