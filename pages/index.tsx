import { client } from "../lib/client"
import {
	WavesOpacity,
	HeroBanner,
	Firesale,
	ProductMarquee,
} from "../components"
import { ImageUrlBuilder } from "next-sanity-image"

export type TProducts<T> = Array<{
	_id: string
	image: T
	name: string
	slug: {
		current: string
	}
	price: number
}>

export type TFiresaleData<T> = Array<{
	type?: "firesale"
	name: string
	image: ImageUrlBuilder
	price: number
	discount: number
	desc: string
	rest: T
}>

export type quoteData = Array<{
	name: string
	author: string
}>

interface IHomeProps {
	products: TProducts<Array<object>>

	firesaleData: TFiresaleData<object>

	quoteData: quoteData
}

const Home = ({ products, firesaleData, quoteData }: IHomeProps) => {
	const { name, image, price, discount, desc, ...rest } = firesaleData[0] // will only have one object in firesaleData, hence the [0]. rest isn't applicable for me but can be for other developers who fork and add more props
	const { name: quote, author } = quoteData[0] // will only have one object in quoteData, hence the [0]

	{
		/* contains navbar and footer by default on all pages, hence why not explicitly written in the return statement. Written explicity in Layout.tsx under components folder */
	}
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
				<p>section separator ignore</p>
				<ProductMarquee products={products} />
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
