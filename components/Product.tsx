import { ImageUrlBuilder } from "next-sanity-image"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { urlFor } from "../lib/client"
import styles from '../styles/Product.module.scss'

interface IProductProps<T, K> {
	image: K
	name: string
	slug: {
		current: string
	}
	price: number

	rest?: T // optional props
}

const Product = ({ image, name, slug, price, ...rest }: IProductProps<object | undefined, Array<object>>) => {
	const src = urlFor(image && image[0]!).url() // url() method stringifies the image url
	console.log(src);
	
	return (
		<div className={styles.main_container}>
			{/* when container is clicked, it will be send to a dynamic file ([slug].ts) from product folder and will show the product dynamically isolated from other products with added features */}
			<Link href={`/product/${slug.current}`} passHref>
				<div className={styles.productContainer}>
					<div className={styles.image}>
						<Image loader={() => src} src={src} unoptimized layout='fill' alt={`Picture of ${name}. It only costs ${price} dollars!`}/> 
						{/* https://stackoverflow.com/questions/64909447/got-an-error-invalid-src-prop-here-is-a-link-on-next-image-hostname-loca */}
					</div>
					{/* image[0] is used because each product will have multiple images (array of images from sanity) image[0] will be the default shown */}
					<div className={styles.name}>{name && name!}</div>
					<div className={styles.price}>{price && price!}</div>
				</div>
			</Link>
	</div>
	)
}

export default Product