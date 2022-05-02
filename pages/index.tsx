import React from "react"

const Home = () => {
	return (
		<>
			Navbar here
			<main aria-roledescription="This is the main page of Totem. Here, you can see what we broadly offer!"></main>
			<section
				role="listitem"
				aria-aria-roledescription="This showcases what Totem offers">
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
				<h2>🔥Firesale of the day🔥</h2>
			</section>
			Footer here
		</>
	)
}

export default Home
