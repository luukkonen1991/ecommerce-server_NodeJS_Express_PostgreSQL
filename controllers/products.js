// const path = require('path');
const fs = require('fs');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/product');
const sequelize = require('../utils/database');


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
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {

  const product = await Product.findByPk(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 401));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file(s)`, 400));
  }



  let keys = Object.keys(req.files);
  console.log(req.files, '[REQUEST FILES]');
  console.log(keys, '[ObjectKeys]');
  // const mainImage = req.files.main;

  // Remove old product photos from db/uploads if req.files includes a new ones
  if (product.product_imgs && keys.includes('product')) {
    const oldPhotos = Object.values(product.product_imgs);
    for (oldPhoto of oldPhotos) {
      let photoPath = `${process.env.FILE_UPLOAD_PATH}/${oldPhoto}`;
      fs.unlinkSync(photoPath);
    }
    console.log(oldPhotos, '[Old photos]');
    product.product_imgs = [];
    console.log(product.product_imgs);
  }

  // Remove old main_img from db/uploads if req.files includes a new one
  if (product.main_img && keys.includes('main')) {
    const oldPhoto = product.main_img;
    let photoPath = `${process.env.FILE_UPLOAD_PATH}/${oldPhoto}`;
    fs.unlinkSync(photoPath);
    // console.log(oldPhotos, '[Old photos]');
    // product.product_imgs = [];
    // console.log(product.product_imgs);
  }

  for (key of keys) {
    console.log(key, '[KEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY]');
    console.log(typeof key, '[TYPE]');
    let counter = keys.indexOf(key);
    console.log(counter, '[----------------------counter-----------------]');
    let img = req.files[key];
    console.log(img, '[BEGINNING-------------------------------------------]');

    // Make sure the image(s) are photos
    if (!img.mimetype.startsWith('image')) {
      return next(new ErrorResponse(`File ${img.name} is not an image file`, 400));
    }

    // Check filesize
    if (img.size > process.env.MAX_FILE_UPLOAD) {
      return next(new ErrorResponse(`Image ${img.name} is larger than supported file size: ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom fileName
    // mainImage.name = `photo_${product.id}${path.parse(mainImage.name).ext}`;
    img.name = `photo_${product.id}_${img.name}`;
    // console.log(img.name, '[NEWNAME]');
    img.mv(`${process.env.FILE_UPLOAD_PATH}/${img.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file(s) upload`, 500));
      }
      if (counter === 0) {
        product.main_img = img.name;
        await product.save();
      } else {
        console.log(img.name, '[IMGNAME_____________________________________________________]');
        product.update({
          product_imgs: sequelize.fn('array_append', sequelize.col('product_imgs'), img.name)
        });
      }
    });
  }

  res.status(200).json({
    success: true,
  });

  // jatka tästä

  // ------------------------------------------------------

  // // Make sure the image is a photo
  // if (!mainImage.mimetype.startsWith('image')) {
  //   return next(new ErrorResponse(`Please upload an image file(s)`, 400));
  // }

  // // Check filesize
  // if (mainImage.size > process.env.MAX_FILE_UPLOAD) {
  //   return next(new ErrorResponse(`Please upload image(s) less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  // }

  // // Create custom filename
  // mainImage.name = `photo_${product.id}${path.parse(mainImage.name).ext}`;
  // mainImage.mv(`${process.env.FILE_UPLOAD_PATH}/${mainImage.name}`, async err => {
  //   if (err) {
  //     console.error(err);
  //     return next(new ErrorResponse(`Problem with file(s) upload`, 500));
  //   }
  //   product.mainImgUrl = mainImage.name;
  //   await product.save();

  //   res.status(200).json({
  //     success: true,
  //     data: mainImage.name
  //   });
  // });
});