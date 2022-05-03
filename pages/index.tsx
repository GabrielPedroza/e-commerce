import React from "react"
import { Navbar, WavesOpacity, Product, Footer, HeroBanner } from "./components"

const Home = () => {
	return (
		<>
			<div>
				<Navbar />
				<WavesOpacity />
				<HeroBanner />
				<section
					role="listitem"
					aria-roledescription="This showcases what Totem offers">
					add more details here later on
					<p></p>
					<h2>
						What <i>Totem</i> offers
					</h2>
					{["product1, product2, product3"].map(product => product)}
				</section>
				<section
					aria-details="A product with a massive discount!"
					role="listitem">
					<h2>🔥 Firesale of the day 🔥</h2>
				</section>
				<Footer />
			</div>
		</>
	)
}

export default Home
