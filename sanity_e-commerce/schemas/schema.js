import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"
import firesale from "./firesale"
import product from "./product"
import quote from "./quote"

export default createSchema({
	name: "default",
	types: schemaTypes.concat([quote, firesale, product]),
})
