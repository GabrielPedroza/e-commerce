import React from "react"
import { client } from "../lib/client"
import { WavesOpacity, Product, HeroBanner, Firesale } from "../components"
import { ImageUrlBuilder } from "next-sanity-image"

interface IHomeProps<T> {
	products: Array<{
		_id: string
		image: ImageUrlBuilder
		name: string
		slug: {
			current: string
		}
		price: number
	}>
	firesaleData: Array<{
		type?: "firesale"
		name: string
		image: ImageUrlBuilder
		price: number
		discount: number
		desc: string
		rest: T
	}>

	quoteData: Array<{
		name: string
		author: string
	}>
}

const Home = ({ products, firesaleData, quoteData }: IHomeProps<object>) => {
	const { name, image, price, discount, desc, ...rest } = firesaleData[0] // will only have one object in firesaleData, hence the [0]
	const { name: quote, author } = quoteData[0] // will only have one object in quoteData, hence the [0]

	return (
		<>
			<div>
				<WavesOpacity />
				<HeroBanner
					quote={quote}
					author={author}
					props={quoteData[0]} // not needed, but for future developers that wish to fork this repo and add more props
				/>
				<Firesale {...firesaleData[0]} />
				<p>section separator brbrbrbr</p>
				<section aria-roledescription="This showcases what Totem offers">
					add more details here later on
					<p></p>
					<h2>
						What <i>Totem</i> offers
					</h2>
					{products.map(product => (
						<Product key={product._id} {...product} />
					))}
				</section>
			</div>
		</>
	)
}
// this will work like a componentDidMount lifecycle / useEffect hook. (It will run when the component is mounted)
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
