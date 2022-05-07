import { ImageUrlBuilder } from "next-sanity-image"
import { urlFor } from "../../lib/client"
import React from "react"

interface IFiresaleProps {
	name: string
	image: ImageUrlBuilder
	price: number
	discount: number
	desc: string
	rest: any
}

const Firesale = ({
	name,
	image,
	price,
	discount,
	desc,
	...rest // for future developers that wish to fork this repo and add more props
}: IFiresaleProps) => {
	return (
		<>
			<section
				role="banner"
				aria-details="A product with a massive discount!">
				<div
					className="firesale-container"
					role="listitem"
					aria-roledescription="This is a single item that we showcase to show our customers the hottest deal of the day. As the same implies, the deal will last for 24 hours EST.">
					<h2 className="firesale-h2__title">
						🔥 Firesale of the day 🔥
					</h2>
					<h2
						className="firesale-h2"
						aria-label="How much we lowered the price; represented in percentage.">
						{`${discount && discount!}% off`}
					</h2>
					<h3 className="firesale-h3">{`$${price && price!}`}</h3>
					<img
						className="firesale-img"
						/* @ts-ignore | src needs to be a string or undefined to work, The type is ImageUrlBuilder so it can be dynamically changed from sanity */
						src={urlFor(image && image!)}
						alt={
							name ??
							`Image of firesale product of the day: ${name!}`
						}
					/>
					<h4 className="firesale-h4">{name && name!}</h4>
					<p className="firesale-p">{desc && desc!}</p>
				</div>
			</section>
		</>
	)
}

export default Firesale
