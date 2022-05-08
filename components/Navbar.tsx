import React from "react"
import Link from "next/link"
import styles from "../styles/Navbar.module.scss"

const Navbar = () => {
	return (
		<>
			<nav className={styles.container}>
				<Link href="/">
					<img
						className={styles.logo}
						src="/totem-logo-removebg-preview.png"
						alt="Totem Logo"
						role="button"
						aria-label="Logo"
						aria-roledescription="If you are in another page and want to go back to the home page, click here!"
					/>
				</Link>
				<div className={styles.burger}>
					<div
						className={styles.burgerMenu}
						role="navigation"
						aria-pressed="false"></div>
				</div>
			</nav>
		</>
	)
}

export default Navbar
