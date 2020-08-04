const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const TargetGroup = require('../models/target_group');
const sequelize = require('../utils/database');

//@desc       Get all targetGroups
//@route      GET /api/v1/target-groups
//@access     Public
exports.getTargetGroups = asyncHandler(async (req, res, next) => {
  const targetGroups = await TargetGroup.findAll();

  if (!targetGroups) {
    return next(new ErrorResponse(`Problem with servers, please contact support`, 404));
  }
  res.status(200).json({
    success: true,
    data: targetGroups
  });
});