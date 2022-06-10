import styles from "../styles/HeroBanner.module.scss"

interface IHeroBannerProps {
	quote: string
	author: string
	props?: any
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
			{
				Object.entries(rest).map(([key, value]) => null) // for future developers that wish to fork this repo and add more props
			}
		</>
	)
}

export default HeroBanner
