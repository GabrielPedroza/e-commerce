import React, { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from "react-icons/ai"
import { TiDeleteOutline } from "react-icons/ti"
import toast from "react-toastify"
import type { AppContextInterface } from "../context/StateContext"

import { useStateContext } from "../context/StateContext"
import { urlFor } from "../lib/client"
// import getStripe from "../lib/getStripe"
import styles from "../styles/Cart.module.scss"

const Cart = () => {
	const cartRef = useRef(null)
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuanitity,
		onRemove,
	} = useStateContext() as AppContextInterface

	// const handleCheckout = async () => {
	// 	const stripe = await getStripe()

	// 	const response = await fetch("/api/stripe", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(cartItems),
	// 	})

	// if (response.statusCode === 500) return

	// const data = await response.json()

	// toast.loading("Redirecting...")

	// stripe.redirectToCheckout({ sessionId: data.id })
	// }

	console.log(cartItems)

	return (
		<div className={styles.cartWrapper} ref={cartRef}>
			<div className={styles.cartContainer}>
				<button
					type="button"
					className={styles.cartHeading}
					onClick={() => setShowCart(false)}>
					<AiOutlineLeft />
					<span className={styles.heading}>Your Cart</span>
					<span className={styles.cartNumItems}>
						{`(${totalQuantities} ${
							totalQuantities === 1 ? `item` : `items`
						})`}
					</span>
				</button>

				{cartItems.length < 1 && (
					<div className={styles.emptyCart}>
						<AiOutlineShopping size={150} />
						<h3>Your shopping bag is empty</h3>
						<Link href="/" passHref>
							<button
								type="button"
								onClick={() => setShowCart(false)}
								className={styles.btn}>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className={styles.productContainer}>
					{cartItems.length >= 1 &&
						cartItems.map(item => (
							<div className={styles.product} key={item._id}>
								<div className={styles.pImage}>
									<Image
										layout="fill"
										loader={() =>
											urlFor(item?.image[0]!).url()
										}
										src={urlFor(item?.image[0]!).url()}
										alt={`Image of ${item}`}
									/>
								</div>
								<div className={styles.itemDesc}>
									<div
										className={`${styles.flex} ${styles.top}`}>
										<h5>{item.name}</h5>
										<h4>${item.price}</h4>
									</div>
									<div
										className={`${styles.flex} ${styles.bottom}`}>
										<div>
											<p className={styles.quantityDesc}>
												<span
													className={styles.minus}
													onClick={() =>
														toggleCartItemQuanitity(
															item._id,
															"dec"
														)
													}>
													<AiOutlineMinus />
												</span>
												<span className={styles.num}>
													{item.quantity}
												</span>
												<span
													className={styles.plus}
													onClick={() =>
														toggleCartItemQuanitity(
															item._id,
															"inc"
														)
													}>
													<AiOutlinePlus />
												</span>
											</p>
										</div>
										<button
											type="button"
											className={styles.removeItem}
											onClick={() => onRemove(item)}>
											<TiDeleteOutline />
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
				{cartItems.length >= 1 && (
					<div className={styles.cartBottom}>
						<div className={styles.total}>
							<h3>Subtotal:</h3>
							<h3>${totalPrice}</h3>
						</div>
						<div className={styles.btnContainer}>
							<button
								type="button"
								className={styles.btn}
								// onClick={handleCheckout}
							>
								Pay with Stripe
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart
