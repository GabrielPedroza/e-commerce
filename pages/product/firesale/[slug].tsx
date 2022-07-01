import { useEffect } from "react"
import { IParamsProps, TProduct } from "../[slug]"
import Image from "next/image"
import { client, urlFor } from "../../../lib/client"
import firesaleconfetti from "../../../lib/utils"
import styles from "../../../styles/EnhancedFiresale.module.scss"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import {
	AppContextInterface,
	useStateContext,
} from "../../../context/StateContext"
import {
	AiFillStar,
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineStar,
} from "react-icons/ai"

export type TFiresale = {
	_id: number
	type: "firesale"
	slug: {
		current: string
	}
	name: string
	quantity: number
	image: SanityImageSource[]
	desc: string
	price: number
	discount: number
}
interface IFiresaleProps {
	firesale: Array<TFiresale>
}

const Firesale = ({ firesale }: IFiresaleProps) => {
	const { name, desc, price, image, discount } = firesale[0]

	console.log(firesale)

	const { incQty, decQty, qty, addToCart } =
		useStateContext() as AppContextInterface

	useEffect(() => {
		firesaleconfetti()
	}, [])

	const src = urlFor(image && image[0]!)?.url() ?? "No image"

	const firesaleObject = firesale[0]

	return (
		<>
			<div className={styles.container}>
				<div className={styles.Bimage}>
					<Image
						loader={() => src}
						unoptimized
						src={src}
						alt={`${name} is the firesale of the day!`}
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<hr />
				<div className={styles.productDetailDesc}>
					<h1>{name}</h1>
					<div className={styles.reviews}>
						<div className={styles.starReviews}>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p className={styles.reviewsNum}>(20)</p>
					</div>
					<h4 className={styles.desc}>Details: </h4>
					<p>{desc}</p>
					<p className={styles.prices}>${price}</p>
					<div className={styles.quantities}>
						<h3>Quantity:</h3>
						<p className={styles.quantityDesc}>
							<span className={styles.minus} onClick={decQty}>
								<AiOutlineMinus />
							</span>
							<span className={styles.num}>{qty}</span>
							<span className={styles.plus} onClick={incQty}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className={styles.buttons}>
						<button
							type="button"
							className={styles.addToCart}
							onClick={() => addToCart(firesaleObject, qty)}>
							Add to Cart
						</button>
						<button type="button" className={styles.buyNow}>
							Buy Now
						</button>
					</div>
				</div>
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
