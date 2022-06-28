import React, {
	ReactChild,
	createContext,
	useState,
	useContext,
	SetStateAction,
	Dispatch,
} from "react"
import { toast } from "react-toastify"
import type { TProductDetail } from "../pages/product/[slug]"

interface IStateContextProps {
	children: ReactChild | ReactChild[]
}

export interface AppContextInterface {
	qty: number
	showCart: boolean
	cartItems: Array<object>
	totalPrice: number
	setTotalPrice: Dispatch<SetStateAction<number>>
	setQty: Dispatch<SetStateAction<number>>
	setCartItems: Dispatch<SetStateAction<Array<TProductDetail>>>
	totalQuantities: number
	setTotalQuantities: Dispatch<SetStateAction<number>>
	setShowCart: Dispatch<SetStateAction<boolean>>
	incQty: () => void
	decQty: () => void
	addToCart: (product: TProductDetail, quantity: number) => void
}

const Context = createContext<AppContextInterface | null>(null)

export const StateContext = ({ children }: IStateContextProps) => {
	const [showCart, setShowCart] = useState(false)
	const [cartItems, setCartItems] = useState<TProductDetail[]>([])
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalQuantities, setTotalQuantities] = useState(0)
	const [qty, setQty] = useState(1)

	const addToCart = (product: TProductDetail, quantity: number) => {
		const isProductInCart = cartItems.find(
			item => item.slug.current === product.slug.current
		) // boolean

		setTotalPrice(prevTotal => prevTotal + product.price * quantity)
		setTotalQuantities(prevTotal => prevTotal + quantity)

		if (isProductInCart) {
			const updateCart = cartItems.map(currentProduct => {
				if (currentProduct._id === product._id) {
					return {
						...currentProduct, // to not lose image and name of product
						quantity: currentProduct?.quantity + quantity,
					}
				}
			})
			/* @ts-ignore */
			setCartItems(updateCart)
		} else {
			setCartItems(prev => [...prev, { ...product, quantity }])
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
			}}>
			{children}
		</Context.Provider>
	)
}

export const useStateContext = () => useContext(Context)
