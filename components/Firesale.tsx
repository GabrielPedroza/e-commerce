import { urlFor } from "../lib/client"
import Link from "next/link"
import Image from "next/image"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import imgStyle from "../styles/FiresaleImage.module.scss"
interface IFiresaleProps {
	name: string
	image: SanityImageSource
	price: number
	discount: number
	desc: string
	type: string
	slug: {
		current: string
	}
	rest: unknown
}

// helper function
const nameToQueryConverter = (query: string) => {
	const lowerCased = query.toLowerCase()
	const regex = /\W+/g // removes any spaces
	return lowerCased.replace(regex, "_")
}

const Firesale = ({
	name,
	image,
	slug,
	type,
	price,
	discount,
	desc,
	...rest // for future developers that wish to fork this repo and add more props
}: IFiresaleProps) => {
	const src = urlFor(image && image!)?.url()

	return (
		<>
			<Link href={`/product/firesale/${slug.current}`} passHref>
				<div role="contentinfo">
					<>
						<div
							className="firesale-container"
							aria-roledescription="This is a single item that we showcase to show our customers the hottest deal of the day. As the same implies, the deal will last for 24 hours EST.">
							<h2 className="firesale-h2__title">
								🔥 Firesale of the day 🔥
							</h2>
							<h2
								className="firesale-h2"
								// aria-label="How much we lowered the price; represented in percentage.">
							>
								{`${discount && discount!}% off`}
							</h2>
							<h3 className="firesale-h3">{`$${
								price && price!
							}`}</h3>
							<div className={"firesale-image"}>
								<Image
									loader={() => src}
									src={src}
									priority
									unoptimized
									layout="fill"
									objectFit="cover"
									alt={`Picture of ${name}. It only costs ${price} dollars!`}
								/>
							</div>
							<p
								aria-label="Name of product"
								className="firesale-h5">
								{name && name!}
							</p>
							<p
								aria-label="Description of product"
								className="firesale-p">
								{desc && desc!}
							</p>
						</div>
					</>
				</div>
			</Link>
		</>
	)
}

export default Firesale
