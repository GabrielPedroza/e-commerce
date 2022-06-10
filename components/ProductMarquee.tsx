import Product from "./Product"
import styles from '../styles/ProductMarquee.module.scss'
import type { TProducts } from "../pages/index"

interface IProductMarqueeProps {
	products: TProducts<Array<object>>
}

const ProductMarquee = ({ products }: IProductMarqueeProps) => {
	return (
		<section aria-roledescription="This showcases what Totem offers">
			<h2 className={styles.header}>Best Seller Products</h2>
			{products.map(product => (
				<Product key={product._id} {...product} />
			))}
		</section>
	)
}

export default ProductMarquee
