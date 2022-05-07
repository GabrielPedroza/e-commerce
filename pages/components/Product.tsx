import { ImageUrlBuilder } from "next-sanity-image"
import Link from "next/link"
import React from "react"
import { urlFor } from "../../lib/client"
import styles from '../../styles/Product.module.scss'

interface IProductProps<T> {
	image: ImageUrlBuilder
	name: string
	slug: {
		current: string
	}
	price: number

	props?: T
}

const Product = ({ image, name, slug, price }: IProductProps<object>) => {
	return (
		<div>
			<Link href={`/products/${slug.current}`}>
				<div className={styles.productContainer}>
          {/* @ts-ignore | src needs to be a string or undefined to work, The type is ImageUrlBuilder so it can be dynamically changed from sanity */}
					<img src={urlFor(image && image[0]!)} alt={`Picture of ${name}. It only costs ${price} dollars!`}/> 
					{/* image[0] is used because each product will have multiple images (array of images from sanity) */}
					<div className={styles.name}>{name && name!}</div>
					<div className={styles.price}>{price && name!}</div>
				</div>
			</Link>
		</div>
	)
}

export default Product
