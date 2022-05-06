import React from "react"
import styles from "../../styles/HeroBanner.module.scss"

interface IHeroBannerProps {
	quote: string
	author: string
	props: any
}

const HeroBanner = ({ quote, author, ...rest }: IHeroBannerProps) => {
	return (
		<>
			<div
				role="banner"
				className={styles.container}
				aria-roledescription="This is the main page of Totem. Here, you can see what we broadly offer!">
				<h1 role="heading" className={styles.title}>
					Represent Spirituality
				</h1>
				<p role="note" aria-label="quote" className={styles.quote}>
					{`"${quote}" - ${author}`}
				</p>
			</div>
		</>
	)
}

export default HeroBanner
