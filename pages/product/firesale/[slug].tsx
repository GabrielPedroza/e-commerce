import { useEffect } from "react"
import { TProduct } from "../[slug]"
import Image from "next/image"
import { client, urlFor } from "../../../lib/client"
import type { IParamsProps } from "../[slug]"
import firesaleconfetti from "../../../lib/utils"
import styles from "../../../styles/Firesale.module.scss"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

type TFiresale = {
	name: string
	image: SanityImageSource
	desc: string
	price: number
	discount: number
}
interface IFiresaleProps {
	firesale: Array<TFiresale>
}

const Firesale = ({ firesale }: IFiresaleProps) => {
	const { name, desc, price, image, discount } = firesale[0] as TFiresale

	console.log(firesale)

	useEffect(() => {
		firesaleconfetti()
	}, [])

	const src = urlFor(image && image!)?.url() ?? "No image"

	return (
		<>
			<div className={styles.container}>
				<Image
					loader={() => src}
					unoptimized
					src={src}
					alt={`${name} is the firesale of the day!`}
					layout="fill"
					objectFit="cover"
				/>
			</div>
		</>
	)
}

export const getStaticPaths = async () => {
	// required for static data in dynamic routes
	const query = `*[_type == "firesale"] {
    slug {
      current
    }
  }
  `
	const product = (await client.fetch(query)) as Array<TProduct>

	const paths = product.map((item: TProduct) => ({
		params: {
			slug: item.slug.current,
		},
	}))

	return {
		paths,
		fallback: "blocking",
	}
}

export const getStaticProps = async ({ params: { slug } }: IParamsProps) => {
	const firesaleQuery = `*[_type == "firesale" && slug.current == '${slug}']`

	const firesale = (await client.fetch(firesaleQuery)) as object

	return {
		props: { firesale },
	}
}
export default Firesale
