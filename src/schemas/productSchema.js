import joi from "joi";

const productSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().regex(/(https:\/{2}.+\.(png|jpg))/).required(),
  value: joi.number().required()
})

export default productSchema;