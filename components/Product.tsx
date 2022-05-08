import { ImageUrlBuilder } from "next-sanity-image"
import Link from "next/link"
import React from "react"
import { urlFor } from "../lib/client"
import styles from '../styles/Product.module.scss'

interface IProductProps<T> {
	image: ImageUrlBuilder
	name: string
	slug: {
		current: string
	}
	price: number

	rest?: T
}

const Product = ({ image, name, slug, price, ...rest }: IProductProps<object | undefined>) => {
	return (
		<div className={styles.main_container}>
			<Link href={`/product/${slug.current!}`}> {/* when container is clicked, it will be send to a dynamic file ([slug].ts) from product folder and will show the product dynamically isolated from other products with added features */}
				<div className={styles.productContainer}>
          {/* @ts-ignore | src needs to be a string or undefined to work; the type is ImageUrlBuilder so it can be dynamically changed from sanity */}
					<img className={styles.image} src={urlFor(image && image[0]!)} alt={`Picture of ${name}. It only costs ${price} dollars!`}/> 
					{/* image[0] is used because each product will have multiple images (array of images from sanity) image[0] will be the default shown */}
					<div className={styles.name}>{name && name!}</div>
					<div className={styles.price}>{price && price!}</div>
				</div>
			</Link>
		</div>
	)
}

export default Product