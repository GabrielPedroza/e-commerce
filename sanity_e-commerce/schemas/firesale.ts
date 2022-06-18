export default {
	name: "firesale",
	title: "Firesale",
	type: "document",
	fields: [
		{
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			name: "desc",
			title: "Desc",
			type: "string",
		},
		{
			name: "price",
			title: "Price",
			type: "number",
		},
		{
			name: "discount",
			title: "Discount",
			type: "number",
		},
		{
			name: "slug", // unique identifier for product. if repeats, it will be automatically changed to a unique one
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
		},
	],
}
