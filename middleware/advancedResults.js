const { Op } = require('sequelize');
const TargetGroup = require('../models/target_group');
const Product = require('../models/product');

const advancedResults = (model) => async (req, res, next) => {

  let query = {
    where: {
    }
  };


  // // Copy req.query
  // const reqQuery = { ...req.query };

  // // Fields to exlude
  // const removeFields = [];
  // // Loop over removeFields and delete em from reqQuery
  // removeFields.forEach(param => delete reqQuery[param]);

  if (req.query.targetGroupId) {
    query.where.targetGroupId = req.query.targetGroupId;
  }

  if (req.query.categoryId) {
    query.where.categoryId = req.query.categoryId;
  }

  if (req.query.price && req.query.gt) {
    query.where.price = { [Op.gt]: req.query.price };
  }

  if (req.query.price && req.query.lt) {
    query.where.price = { [Op.lt]: req.query.price };
  }

  let finalQuery = model.findAll(query);

  const results = await finalQuery;

  res.advancedResults = {
    success: true,
    data: results
  };
  next();
};

module.exports = advancedResults;