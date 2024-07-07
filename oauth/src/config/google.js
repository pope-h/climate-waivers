const google = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Token = require("../models/Token");
const localRegister = require("../utils/register");

google.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // return access token if user already exists
        const userExists = await User.findOne({
          where: {
            email: profile._json.email,
          },
        });
        if (userExists) {
          await userExists.update({ isGoogleUser: true });
          await userExists.save();
          // generate an jwt token for user
          const userDetails = {
            id: userExists.id,
            email: userExists.email,
            accessToken,
          };
          if (refreshToken) {
            await Token.findOrCreate({
              defaults: { UserId: userExists.id },
              where: {
                refreshToken: refreshToken,
              },
            });
          }
          return done(null, userDetails);
        }
        const username = `${profile._json.given_name}-${accessToken.slice(-5)}`;
        const data = {
          username: username,
          email: profile._json.email,
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          is_verified: profile._json.email_verified,
          is_google_user: true,
          password: refreshToken.slice(-15),
          // profile_pic: profile._json.picture,
          // cover: profile._json.picture,
        };
        console.log(data)
        const user = await User.create(data)
          .then(async (res) => {
            await localRegister(data);
            console.log(res);
          })
          .catch((err) => {
            console.log(err.message);
            const errMsg = {
              message: err.message,
            };
            return done(err, false, errMsg);
          });
        if (user) {
          console.log(user);
          const userDetails = { id: user.id, email: user.email, accessToken };
          await Token.create({
            refreshToken: refreshToken,
            UserId: user.id,
          }).catch((err) => {
            console.log(err.message);
            const errMsg = {
              message: err.message,
            };
            return done(err, false, errMsg);
          });
          return done(null, userDetails);
        }
      } catch (err) {
        console.log(err);
        return done(err, false);
      }
    }
  )
);
module.exports = google;
