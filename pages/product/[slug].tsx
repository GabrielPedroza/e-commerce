import Image from "next/image"
import { client, urlFor } from "../../lib/client"

type TProductDetail = {
	image: string
	name: string
	details: string
	price: string
	[key: string]: unknown
}

interface IProductDetailsProps {
	product: TProductDetail
	products: Array<TProductDetail>
}

const ProductDetails = ({ product, products }: IProductDetailsProps) => {
	const { image, name, details, price } = product
	const src = urlFor(image && image[0]).url()

	return (
		<>
			<div>
				Product Container
				<div>
					<Image
						loader={() => src}
						src={src}
						unoptimized
						loading="lazy"
						objectFit="cover"
						layout="fill"
						alt={`Picture of ${name}. It only costs ${price} dollars!`}
					/>
					<div>Desc</div>
				</div>
			</div>
		</>
	)
}

export type IParamsProps = {
	params: {
		slug: unknown
	}
}

interface ISSGProps<T> {
	ProductDetail: object
	ProductPictures: T
	SuggestedProducts: T
}

export type TProduct = {
	slug: {
		current: string
	}
}

export const getStaticPaths = async () => {
	// required for static data in dynamic routes
	const query = `*[_type == "product" && _type == "product"] {
    slug {
      current
    }
  }
  `
	const products = (await client.fetch(query)) as Array<TProduct>

	const paths = products.map((product: TProduct) => ({
		params: {
			slug: product.slug.current,
		},
	}))

	return {
		paths,
		fallback: "blocking",
	}
}

export const getStaticProps = async ({ params: { slug } }: IParamsProps) => {
	const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
	const productsQuery = '*[_type == "product"]'

	const [product, products] = (await Promise.all([
		client.fetch(productQuery),
		client.fetch(productsQuery),
	])) as Array<ISSGProps<object>>

	return {
		props: { products, product },
	}
}

export default ProductDetails
