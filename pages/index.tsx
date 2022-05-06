import React from "react"
import { client } from "../lib/client"
import { WavesOpacity, Product, HeroBanner } from "./components"
import { urlFor } from "../lib/client"

interface IHomeProps {
	products: Array<{
		_id: "product"
		name: string
		price: string
		discount: string
		desc: string
		image: string
	}>
	firesaleData: Array<{
		type?: "firesale"
		name: string
		image: any
		price: string
		discount: string
		desc: string
	}>

	quoteData: Array<{
		name: string
		author: string
	}>
}

const Home = ({ products, firesaleData, quoteData }: IHomeProps) => {
	const { name, image, price, discount, desc } = firesaleData[0]
	const { name: quote, author } = quoteData[0]

	return (
		<>
			<div>
				<WavesOpacity />
				<HeroBanner quote={quote} author={author} props={quoteData[0]} />
				<section
					aria-details="A product with a massive discount!"
					role="listitem">
					<div className="firesale-container">
						<h2 className="firesale-h2__title">
							🔥 Firesale of the day 🔥
						</h2>
						<h2 className="firesale-h2">
							{`${firesaleData.length && discount!}% off`}
						</h2>
						<h3 className="firesale-h3">
							{`$${firesaleData.length && price!}`}
						</h3>
						<img
							className="firesale-img"
							src={urlFor(firesaleData && image!)}
							alt={name ?? "Firesale image"}
						/>
						<h4 className="firesale-h4">
							{firesaleData.length && name!}
						</h4>
						<p className="firesale-p">
							{firesaleData.length && desc!}
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
	const products: Array<object> = await client.fetch(query)

	const firesaleQuery = '*[_type == "firesale"]'
	const firesaleData: Array<object> = await client.fetch(firesaleQuery)

	const quoteQuery = '*[_type == "quote"]'
	const quoteData: Array<object> = await client.fetch(quoteQuery)

	return {
		props: { products, firesaleData, quoteData },
	}
}

export default Home
