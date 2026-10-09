const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const router = express.Router();

const createSession = (user) => {
  const publicUser = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    picture: user.picture,
  };
  const token = jwt.sign(
    { userId: publicUser.id, email: publicUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { token, user: publicUser };
};

router.post("/auth/google", async (req, res) => {
  const { token } = req.body || {};

  if (typeof token !== "string" || !token.trim()) {
    return res.status(400).json({ message: "Google credential is required" });
  }

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.JWT_SECRET) {
    console.error("Google sign-in requires GOOGLE_CLIENT_ID and JWT_SECRET");
    return res
      .status(500)
      .json({ message: "Google sign-in is not configured" });
  }

  let payload;
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (error) {
    console.error("Google credential verification failed:", error.message);
    return res.status(401).json({ message: "Invalid Google credential" });
  }

  if (!payload?.sub || !payload.email || payload.email_verified !== true) {
    return res
      .status(401)
      .json({ message: "Google account email is not verified" });
  }

  const email = payload.email.toLowerCase();
  let user;
  try {
    user = await User.findOne({ googleId: payload.sub });

    if (!user) {
      user = await User.findOne({ email });

      if (user?.googleId && user.googleId !== payload.sub) {
        return res.status(409).json({
          message: "This email is linked to a different Google account",
        });
      }

      if (!user) {
        const name = (payload.name || email.split("@")[0]).trim().slice(0, 100);
        user = new User({
          googleId: payload.sub,
          name: name.length >= 2 ? name : "Google User",
          email,
          picture: payload.picture,
        });
      } else {
        user.googleId = payload.sub;
        user.picture = user.picture || payload.picture;
      }

      try {
        await user.save();
      } catch (error) {
        if (error.code !== 11000) {
          throw error;
        }

        user = await User.findOne({ googleId: payload.sub });
        if (!user) {
          return res.status(409).json({
            message: "An account with this email already exists",
          });
        }
      }
    }
  } catch (error) {
    console.error("Google account sign-in failed:", error);
    return res.status(500).json({ message: "Unable to sign in with Google" });
  }

  const session = createSession(user);

  return res.status(200).json({
    message: "Login successful",
    ...session,
  });
});

module.exports = router;
