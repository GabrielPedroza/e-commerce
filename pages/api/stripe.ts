import { NextApiRequest, NextApiResponse } from "next"
import { urlFor } from "../../lib/client"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const params = {
				submit_type: "pay",
				mode: "payment",
				payment_method_types: ["card"],
				billing_address_collection: "auto",
				shipping_options: [
					{ shipping_rate: "shr_1LGnxWFq42m7etLRK1il0bfT" },
					{ shipping_rate: "shr_1LGo01Fq42m7etLRVcrCNpga" },
				],
				line_items: req.body.map((item: any) => {
					const newImage = urlFor(item.image[0]).url()

					return {
						price_data: {
							currency: "usd",
							product_data: {
								name: item.name,
								images: [newImage],
							},
							unit_amount: item.price * 100,
						},
						adjustable_quantity: {
							enabled: true,
							minimum: 1,
						},
						quantity: item.quantity,
					}
				}),
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/canceled`,
			}

			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create(params)

			res.status(200).json(session)
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message)
		}
	} else {
		res.setHeader("Allow", "POST")
		res.status(405).end("Method Not Allowed")
	}
}
