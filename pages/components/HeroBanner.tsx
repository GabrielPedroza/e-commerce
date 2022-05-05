import React from "react"
import styles from "../../styles/HeroBanner.module.scss"

const HeroBanner = () => {
	return (
		<>
			<div
				role="banner"
				className={styles.container}
				aria-roledescription="This is the main page of Totem. Here, you can see what we broadly offer!">
				<h1 role="heading" className={styles.title}>
					Represent Spirituality
				</h1>
				<p className={styles.description}>"QUOTE" - AUTHOR</p>
			</div>
		</>
	)
}

export default HeroBanner
