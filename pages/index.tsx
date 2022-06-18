import { client } from "../lib/client"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import {
	WavesOpacity,
	HeroBanner,
	Firesale,
	ProductMarquee,
	HorizontalDivider,
	Candle,
} from "../components"

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
	type: "firesale"
	name: string
	slug: {
		current: string
	}
	image: SanityImageSource
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
				<Candle />
				<HeroBanner
					quote={quote}
					author={author}
					props={quoteData[0]} // not needed, but for future developers that wish to fork this repo and add more props
				/>
				<Firesale {...firesaleData[0]} />
				<HorizontalDivider />
				<ProductMarquee products={products} />
			</div>
		</>
	)
}
// data fetching is done in the getStaticProps function
export const getStaticProps = async () => {
	// fetching data from Sanity using SSG because in this specific e-commerce, it'll be static data.
	// If this was a real e-commerce with dynamic data and multiple pages, we can combine SSR and SSG.
	const query = '*[_type == "product"]'
	const firesaleQuery = '*[_type == "firesale"]'
	const quoteQuery = '*[_type == "quote"]'

	interface ISSRProps {
		products: TProducts<Array<object>>
		firesaleData: TFiresaleData<object>
		quoteData: quoteData
	}

	const [products, firesaleData, quoteData] = (await Promise.all([
		// get all data from Sanity at once
		client.fetch(query),
		client.fetch(firesaleQuery),
		client.fetch(quoteQuery),
	])) as Array<ISSRProps>

	return {
		props: { products, firesaleData, quoteData },
	}
}

export default Home
