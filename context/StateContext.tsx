import React, {
	ReactChild,
	createContext,
	useState,
	useContext,
	SetStateAction,
	Dispatch,
} from "react"
import { toast } from "react-toastify"
import { TFiresale } from "../pages/product/firesale/[slug]"
import type { TProductDetail } from "../pages/product/[slug]"

interface IStateContextProps {
	children: ReactChild | ReactChild[]
}

type Group = TFiresale | TProductDetail

export interface AppContextInterface {
	qty: number
	showCart: boolean
	cartItems: Array<Group>
	totalPrice: number
	setTotalPrice: Dispatch<SetStateAction<number>>
	setQty: Dispatch<SetStateAction<number>>
	setCartItems: Dispatch<SetStateAction<Array<Group>>>
	totalQuantities: number
	setTotalQuantities: Dispatch<SetStateAction<number>>
	setShowCart: Dispatch<SetStateAction<boolean>>
	incQty: () => void
	decQty: () => void
	addToCart: (product: Group, quantity: number) => void
	toggleCartItemQuanitity: Function
	onRemove: Function
}

const Context = createContext<AppContextInterface | null>(null)

export const StateContext = ({ children }: IStateContextProps) => {
	const [showCart, setShowCart] = useState(false)
	const [cartItems, setCartItems] = useState<any[]>([]) // fix type later
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalQuantities, setTotalQuantities] = useState(0)
	const [qty, setQty] = useState(1)

	let foundProduct: Group | undefined
	let index

	const addToCart = (product: Group, quantity: number) => {
		const isProductInCart = cartItems.find(
			(item: Group) => item.slug.current === product.slug.current
		) // returns undefined or the value

		setTotalPrice(prevTotal => prevTotal + product.price * quantity)
		setTotalQuantities(prevTotal => prevTotal + quantity)

		if (isProductInCart) {
			const updateCart = cartItems.map((currentProduct: Group) => {
				if (currentProduct._id === product._id) {
					return {
						...currentProduct, // to not lose image and name of product
						quantity: currentProduct?.quantity + quantity,
					}
				}
			})
			setCartItems(updateCart)
		} else {
			setCartItems((prev: Group[]) => [...prev, { ...product, quantity }])
		}

		toast.success(
			`${quantity} ${
				quantity === 1 ? product.name : `${product.name}s`
			} was added to your cart!`,
			{
				position: "top-center",
				autoClose: 3500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			}
		)

		setQty(c => (c = 1))
	}

	const incQty = () => {
		setQty(prevQ => prevQ + 1)
	}

	const decQty = () => {
		setQty(prevQ => {
			if (prevQ - 1 < 1) return 1

			return prevQ - 1
		})
	}

	const onRemove = (product: TProductDetail) => {
		foundProduct = cartItems.find((item: Group) => item._id === product._id)
		const newCartItems = cartItems.filter(
			(item: Group) => item._id !== product._id
		)

		setTotalPrice(
			prevTotalPrice =>
				prevTotalPrice - foundProduct!.price * foundProduct!.quantity
		)
		setTotalQuantities(
			prevTotalQuantities => prevTotalQuantities - foundProduct!.quantity
		)
		setCartItems(newCartItems)
	}

	const toggleCartItemQuanitity = (id: number, value: "inc" | "dec") => {
		foundProduct = cartItems.find((item: Group) => item._id === id)
		index = cartItems.findIndex((product: Group) => product._id === id)
		const newCartItems = cartItems.filter((item: Group) => item._id !== id)

		if (value === "inc") {
			setCartItems([
				...newCartItems,
				{ ...foundProduct!, quantity: foundProduct!.quantity + 1 },
			])
			setTotalPrice(
				prevTotalPrice => prevTotalPrice + foundProduct!.price
			)
			setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
		} else if (value === "dec") {
			if (foundProduct!.quantity > 1) {
				setCartItems([
					...newCartItems,
					{ ...foundProduct!, quantity: foundProduct!.quantity - 1 },
				])
				setTotalPrice(
					prevTotalPrice => prevTotalPrice - foundProduct!.price
				)
				setTotalQuantities(
					prevTotalQuantities => prevTotalQuantities - 1
				)
			}
		}
	}

	return (
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				setCartItems,
				totalPrice,
				setTotalPrice,
				totalQuantities,
				setTotalQuantities,
				setQty,
				addToCart,
				qty,
				incQty,
				decQty,
				toggleCartItemQuanitity,
				onRemove,
			}}>
			{children}
		</Context.Provider>
	)
}

export const useStateContext = () => useContext(Context)
