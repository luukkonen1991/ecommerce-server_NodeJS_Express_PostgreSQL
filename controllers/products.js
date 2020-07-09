const asyncHandler = require('../middleware/async');
const Product = require('../models/product');


//@desc       Get all products
//@route      GET /api/v1/products
//@access     Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  // console.log(req.query);
  // if (req.query) {
  //   const products = await Product.findAll({where: {

  //   }})
  // }
  // const products = await Product.findAll();

  // res
  //   .status(200)
  //   .json({ success: true, count: products.length, data: products });
  res.status(200).json(res.advancedResults);
});




//@desc       Create product
//@route      POST /api/v1/products
//@access     Public
exports.createProduct = asyncHandler(async (req, res, next) => {
  const { title, description, price } = req.body;
  const product = await Product.create({
    title: title,
    description: description,
    price: price
  });
  res.status(201).json({
    success: true,
    data: product
  });
});