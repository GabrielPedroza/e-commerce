import { AiOutlineShopping } from "react-icons/ai"
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Navbar.module.scss"

const Navbar = () => {
	return (
		<>
			<nav className={styles.container}>
				<Link href="/" passHref>
					<div className={styles.logo}>
						<Image
							priority
							className={styles.logo}
							src="/logo.png"
							alt="Totem Logo"
							layout="fill"
							objectFit="cover"
							role="button"
							aria-label="Logo"
							aria-roledescription="If you are in another page and want to go back to the home page, click here!"
						/>
					</div>
				</Link>
				<>
					<div
						className={styles.shop}
						aria-label="cart"
						aria-roledescription="Click here to check out the items you've put in the cart">
						<AiOutlineShopping size={40} />
						<span
							className={styles.cartQuantity}
							aria-label="number of items in cart">
							1
						</span>
					</div>
				</>
			</nav>
		</>
	)
}

export default Navbar
