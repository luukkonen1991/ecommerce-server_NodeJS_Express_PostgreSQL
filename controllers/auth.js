const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");

//@desc       Register user
//@route      POST /api/v1/auth/register
//@access     Public
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  sendTokenResponse(user, 200, res);
});

//@desc       Login user
//@route      POST /api/v1/auth/login
//@access     Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  // Check for user
  const user = await User.findOne({
    where: {
      email: email,
    },
    attributes: {
      include: ["password"],
    },
  });
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

//@desc       Get current logged in user
//@route      POST /api/v1/auth/me
//@access     Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc       Log user out / clear cookie
//@route      GET /api/v1/auth/logout
//@access     Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});


//@desc       Update user details
//@route      PUT /api/v1/auth/updatedetails
//@access     Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  let columnsToUpdate = Object.keys(req.body);
  for (val of columnsToUpdate) {
    user[val] = req.body[val];
  }
  await user.save();
});




// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const userId = user.id;
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token: token,
    userId: userId,
  });
};
