import React from "react"
import styles from "../../styles/HeroBanner.module.scss"

const HeroBanner = () => {
	return (
		<>
			<div
				className={styles.container}
				aria-roledescription="This is the main page of Totem. Here, you can see what we broadly offer!">
				<h1 className={styles.title}>
					Represent <span className="offsetTitle">Spirituality</span>
				</h1>
			</div>
		</>
	)
}

export default HeroBanner
