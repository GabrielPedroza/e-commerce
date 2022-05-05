import React from "react"
import { client } from "../lib/client"
import { WavesOpacity, Product, HeroBanner } from "./components"

// interface IHomeProps {
// 	products: Array<object>
// 	firesaleData: Array<object>
// }

const Home = ({ products, firesaleData }: any) => {
	// fix any
	return (
		<>
			<div>
				<WavesOpacity />
				<HeroBanner />
				<section
					aria-details="A product with a massive discount!"
					role="listitem">
					<div className="firesale-container">
						<h2 className="firesale-h2__title">
							🔥 Firesale of the day 🔥
						</h2>
						<h2 className="firesale-h2">
							{firesaleData.length && firesaleData[0].discount}
						</h2>
						<h3 className="firesale-h3">
							{firesaleData.length && firesaleData[0].price}
						</h3>
						<h4 className="firesale-h4">
							{firesaleData.length && firesaleData[0].product}
						</h4>
						<p className="firesale-p">
							{firesaleData.length && firesaleData[0].desc}
						</p>
					</div>
				</section>
				<p>section separator brbrbrbr</p>
				<section
					role="listitem"
					aria-roledescription="This showcases what Totem offers">
					add more details here later on
					<p></p>
					<h2>
						What <i>Totem</i> offers
					</h2>
					{products?.map((product: any) => product) ?? null}
				</section>
			</div>
		</>
	)
}
// this will work like a componentDidMount lifecycle useEffect hook. (It will run when the component is mounted)
export const getServerSideProps = async () => {
	/* using server side rendering to get first contentful paint time faster and makes website available 
	for social media and scrape bots. also improves seo. (alternative: ISR (Incremental Static Rendering)) */
	const query = '*[_type == "product"]'
	const products = await client.fetch(query)

	const firesaleQuery = '*[_type == "firesale"]'
	const firesaleData = await client.fetch(firesaleQuery)

	return {
		props: { products, firesaleData },
	}
}

export default Home
