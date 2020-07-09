const { Op } = require('sequelize');

const advancedResults = (model) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };
  // console.log(reqQuery);

  // Fields to exlude
  const removeFields = ['price', 'gt'];
  // Loop over removeFields and delete em from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  // console.log(reqQuery);

  // Make query to string in order to manipulate it
  let queryStr = JSON.stringify(reqQuery);
  console.log(queryStr);

  if (req.query.price && req.query.gt) {
    let obj = { [Op.gt]: req.query.gt };
    let queryObj = { where: JSON.parse(queryStr), price: obj };
    console.log(queryObj);
    query = model.findAll(queryObj);
  };


  let tämä2 = {
    where: {
      category: 't-shirts',
      price: { [Op.gt]: 12 }
    }
  };

  console.log(tämä2, 'töööö');

  const results = await query;

  res.advancedResults = {
    success: true,
    data: results
  };
  next();
};

module.exports = advancedResults;