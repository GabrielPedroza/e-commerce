import React, { useEffect } from "react"
import styles from "../styles/Success.module.scss"
import { interval } from "../lib/utils"

const Success = () => {
	useEffect(() => {
		interval
	}, [])
	return (
		<div className={styles.card}>
			<div className={styles.container}>
				<i className={styles.checkmark}>✓</i>
			</div>
			<h1 className={styles.title}>Success</h1>
			<p className={styles.desc}>
				We received your purchase request;
				<br />
				we&apos;ll be in touch shortly!
			</p>
		</div>
	)
}

export default Success
