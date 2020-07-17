const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/product');


//@desc       Get all products
//@route      GET /api/v1/products
//@access     Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc       Get single product
//@route      GET /api/v1/products/:id
//@access     Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: product
  });
});

//@desc       Create product
//@route      POST /api/v1/products
//@access     Private
exports.createProduct = asyncHandler(async (req, res, next) => {

  const { title, description, category, price } = req.body;
  const product = await Product.create({
    title: title,
    description: description,
    category: category,
    price: price
  });
  res.status(201).json({
    success: true,
    data: product
  });
});

//@desc       Delete product
//@route      Delete /api/v1/products/:id
//@access     Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  await Product.destroy({
    where: {
      id: req.params.id
    }
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

//@desc       Update product
//@route      PUT /api/v1/products/:id
//@access     Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findByPk(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  let columnsToUpdate = Object.keys(req.body);
  for (val of columnsToUpdate) {
    product[val] = req.body[val];
  }
  // test save
  await product.save();

  // product = await Product.findByPk(req.params.id);

  res.status(200).json({
    success: true,
    data: product
  });
});

//@desc       Upload photo for product
//@route      PUT /api/v1/products/:id/photo
//@access     Private
export.productPhotoUpload = asyncHandler(async (req, res, next) => {

});