const Token = require("../models/Token");
const User = require("../models/User");
const axios = require("axios");
const { isTokenValid, attachCookiesToResponse } = require("../utils/jwt");
const TokenError = require("../errors/tokenError");
const loginLocal = require("../utils/login");

const oauthSignIn = async (req, res) => {
  try {
    const user = req.user;
    // check for existing refresh token
    const existingToken = await Token.findOne({ where: { UserId: user.id } });

    if (existingToken === null || existingToken.refreshToken === null) {
      // Set Google oauth option to resend refresh token
      const error = new TokenError(
        "Session expired, Please reauthenticate your account"
      );
      return res.redirect(`${process.env.HOMEPAGE}/login`);
    }
    refreshToken = existingToken.refreshToken;
    user.refreshToken = refreshToken;
    req.session.user = user;
    req.session.save();
    // data = {
    //   username: user.username,
    //   email: user.email,
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   is_verified: user.isVerified,
    //   is_google_user: user.isGoogleUser,
    //   is_github_user: user.isGithubUser,
    //   is_linkedin_user: user.isLinkedInUser,
    //   password: user.refreshToken,
    //   profile_pic: user.profile_pic,
    //   cover: user.cover,
    // };
    user_login = await User.findOne({ where: { id: user.id } });
    user_details = await loginLocal({
      username: user_login.username,
      password: user_login.password,
    });
    console.log(user_details);
    attachCookiesToResponse({ res, user: user_details });
    return res.redirect(process.env.HOMEPAGE);
  } catch (err) {
    console.log(err);
    return res.redirect(`${process.env.HOMEPAGE}/login`);
  }
};

const getUserData = (req, res) => {
  const user = req.session.user;
  return res.status(200).json({ user });
};

const linkedInOauth = async (req, res, next) => {
  try {
    console.log(req.query.id);
    //here we get this code from passport linkedin strategy.
    const code = req.query.code;

    const redirectUri = `${process.env.BASE_URL}/api/v1/auth/linkedin/callback`;
    let accessToken;
    let userInfo;
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    //step 2 : access token retrieval
    const accessTokenUrl = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`;
    await axios
      .post(accessTokenUrl)
      .then((res) => {
        accessToken = res.data.access_token;
      })
      .catch((err) => {
        console.log(err);
      });
    //Fetching User Data
    const userInfoUrl = `https://api.linkedin.com/v2/userinfo`;
    if (accessToken) {
      await axios
        .get(userInfoUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          userInfo = response.data;
          // res.send(res.data);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    } else {
      console.log("access token not found");
      return res.status(400).json({ error: "access token not found" });
    }
    if (userInfo) {
      if (!userInfo.email) {
        const emailNotFound = {
          message:
            "Please add a public email to your LinkedIn account to sign in in with LinkedIn",
        };
        req.flash("error", emailNotFound);
        return redirect(`${process.env.BASE_URL}/error`);
      }
      // return access token if user already exists
      const userExists = await User.findOne({
        where: {
          username: userInfo.email,
        },
      });
      if (userExists) {
        await userExists.update({ isLinkedinUser: true });
        await userExists.save();
        // generate an jwt token for user
        const userDetails = {
          id: userExists.id,
          email: userExists.email,
          accessToken,
        };
        if (accessToken) {
          existingToken = await Token.findOne({
            where: { UserId: userExists.id },
          });
          if (existingToken) {
            existingToken.refreshToken == accessToken;
            existingToken.save();
          } else {
            await Token.create({
              refreshToken: accessToken,
              UserId: userExists.id,
            });
          }
        }
        req.user = userDetails;
        return next();
      }
      const data = {
        username: `${userInfo.given_name}-${accessToken.slice(4)}`,
        email: userInfo.email,
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        is_verified: true,
        password: accessToken.slice(-15),
        // profilePic: userInfo.picture,
        // cover: userInfo.picture,
        is_linkedin_user: true,
      };
      // save user to db and return access token if user does not exist
      const user = await User.create(data)
        .then(async (res) => {
          await localRegister(data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });

      await Token.create({
        refreshToken: accessToken,
        UserId: user.id,
      });
      req.user = user;
      return next();
    }
    return res.status(400).json({ error: "User not found" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  oauthSignIn,
  linkedInOauth,
  getUserData,
};
