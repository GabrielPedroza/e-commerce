import { TProduct } from "../[slug]"
import { client, urlFor } from "../../../lib/client"
import type { IParamsProps } from "../[slug]"

const Firesale = () => {
	return <>
        <div>
            
        </div>
    </>
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
	const firesaleQuery = `*[_type == "product" && slug.current == '${slug}'][0]`

	const firesale = (await client.fetch(firesaleQuery)) as object

	return {
		props: { firesale },
	}
}
export default Firesale
