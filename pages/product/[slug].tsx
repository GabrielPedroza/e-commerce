import Image from "next/image"
import { Fragment, useState } from "react"
import { client, urlFor } from "../../lib/client"
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiFillStar,
	AiOutlineStar,
} from "react-icons/ai"
import styles from "../../styles/EnhancedProduct.module.scss"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import Marquee from "react-fast-marquee"
import Link from "next/link"
import { useStateContext } from "../../context/StateContext"
import type { AppContextInterface } from "../../context/StateContext"

export type TProductDetail = {
	image: SanityImageSource[]
	name: string
	type: "product"
	slug: {
		current: string
	}
	description: string
	price: number
	quantity: number
	[key: string]: any
}

interface IProductDetailsProps {
	product: TProductDetail
	products: Array<TProductDetail>
}

const ProductDetails = ({ product, products }: IProductDetailsProps) => {
	const { image, name, description, price, slug } = product

	const { incQty, decQty, qty, addToCart, setShowCart, setQty } =
		useStateContext() as AppContextInterface

	const [index, setIndex] = useState(0)

	const buyNow = (product: TProductDetail, quantity: number) => {
		addToCart(product, quantity)
		setQty(1)
		setShowCart(true)
	}

	const src = urlFor(image && image[index]!)?.url() ?? "No image"

	return (
		<div className={styles.container}>
			<div className={styles.Bimage}>
				<Image
					loader={() => src}
					src={src}
					unoptimized
					loading="lazy"
					objectFit="cover"
					layout="fill"
					alt={`Picture of ${name}. It only costs ${price} dollars!`}
				/>
			</div>
			<div className={styles.LimageContainer}>
				{image?.map((item, i) => (
					<Fragment key={i}>
						<div className={styles.Limage}>
							<Image
								loader={() => src}
								priority
								unoptimized
								src={urlFor(item)?.url()}
								layout="fill"
								alt={`${name}. It costs ${price}`}
								className={
									i === index
										? `${styles.smallImage} ${styles.selectedImage}`
										: `${styles.smallImage}`
								}
								onMouseEnter={() => setIndex(i)}
							/>
						</div>
					</Fragment>
				))}
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
				<p>{description}</p>
				<p className={styles.prices}>${price}</p>
				<div className={styles.quantities}>
					<h3 className={styles.quant}>Quantity:</h3>
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
						onClick={() => addToCart(product, qty)}>
						Add to Cart
					</button>
					<button
						type="button"
						className={styles.buyNow}
						onClick={() => buyNow(product, qty)}>
						Buy Now
					</button>
				</div>
				<h4 className={styles.h4}>You may also like:</h4>
				<div
					className={styles.marqueeContainer}
					onClick={() => setIndex(0)}>
					<Marquee
						pauseOnHover
						gradientWidth={25}
						speed={30}
						pauseOnClick>
						{products.map(
							(item, i) =>
								slug.current !== item.slug.current && ( // current product isn't shown in the marquee
									<Fragment key={i}>
										<div className={styles.Pimage}>
											<Link
												href={`/product/${item.slug.current}`}
												passHref>
												<Image
													loader={() => src}
													unoptimized
													src={urlFor(
														item.image[0]!
													)?.url()}
													layout="fill"
													alt={`${name}. It costs ${price}`}
													className={styles.marquee}
												/>
											</Link>
										</div>
									</Fragment>
								)
						)}
						{products.map(
							(item, i) =>
								slug?.current !== item?.slug?.current && ( // current product isn't shown in the marquee
									<Fragment key={i}>
										<div className={styles.Pimage}>
											<Link
												href={`/product/${item?.slug?.current}`}
												passHref>
												<Image
													loader={() => src}
													unoptimized
													src={urlFor(
														item.image[0]!
													)?.url()}
													layout="fill"
													alt={`${name}. It costs ${price}`}
													className={styles.marquee}
												/>
											</Link>
										</div>
									</Fragment>
								)
						)}
						{products.map(
							(item, i) =>
								slug.current !== item.slug.current && ( // current product isn't shown in the marquee
									<Fragment key={i}>
										<div className={styles.Pimage}>
											<Link
												href={`/product/${item.slug.current}`}
												passHref>
												<Image
													loader={() => src}
													unoptimized
													src={urlFor(
														item.image[0]!
													)?.url()}
													layout="fill"
													alt={`${name}. It costs ${price}`}
													className={styles.marquee}
												/>
											</Link>
										</div>
									</Fragment>
								)
						)}
					</Marquee>
				</div>
			</div>
		</div>
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
	const query = `*[_type == "product"] {
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
