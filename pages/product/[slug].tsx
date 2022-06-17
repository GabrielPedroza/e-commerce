import { client, urlFor } from "../../lib/client"

const ProductDetails = () => {
	return (
		<>
			<div>
				Product Container
				<div>
					Image
					<div>Desc</div>
				</div>
			</div>
		</>
	)
}

type IParamsProps = {
	params: {
		slug: unknown
	}
}

interface ISSGProps<T> {
	ProductDetail: object
	ProductPictures: T
	SuggestedProducts: T
}

type TProduct = {
  products: {
    product: object
  }
}

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `

	const products = (await client.fetch(query))

	const paths = products.map(product => ({
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
