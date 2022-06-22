import React, { ReactChild, ReactChildren } from "react"
import Marquee from "react-fast-marquee"

interface Props {
	children: ReactChild | ReactChild[]
}

const ProductMarquee = ({ children }: Props) => {
	return <Marquee>{children}</Marquee>
}

export default ProductMarquee
