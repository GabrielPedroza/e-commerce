import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const client = sanityClient({
	projectId: "gz95qrem",
	dataset: "production",
	apiVersion: "2022-04-27",
	useCdn: true,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
	ignoreBrowserTokenWarning: true, // should not store token in client-side. best way is to store it is in the backend
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => {
	return builder.image(source)
}
