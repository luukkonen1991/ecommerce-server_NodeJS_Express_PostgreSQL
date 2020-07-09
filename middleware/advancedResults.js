const advancedResults = (model) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  query = model.findAll(reqQuery);

  const results = await query;

  res.advancedResults = {
    success: true,
    data: results
  };
  next();
};

module.exports = advancedResults;