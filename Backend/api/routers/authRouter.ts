import type { Request, Response } from "express";
import express from "express";
import {
  createUser,
  deleteUserRequestToken,
  getUser,
  getUserByEmail,
} from "../controllers/userController";
import { setUserRequestToken } from "../controllers/userController";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../controllers/authController";
import { body, validationResult } from "express-validator";

const authRouter = express.Router();

authRouter.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 5 }),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (email && password) {
      const user = await getUserByEmail(email);
      if (user) {
        if (user.password == password) {
          const accessToken = generateAccessToken({ email: user.email });
          const refreshToken = generateRefreshToken({ email: user.email });
          setUserRequestToken(user.id, refreshToken);
          res.json({
            accessToken,
            refreshToken,
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              profileImage: user.profileImage,
              likedFlavours: user.likedFlavours,
              favouriteCocktails: user.favouriteCocktails,
              readInsights: user.readInsights,
            },
          });
        } else {
          return res.status(404).json({ message: "Invalid password" });
        }
      } else {
        return res
          .status(404)
          .json({ message: "User not found, invalid email" });
      }
    } else {
      return res.status(404).json({ message: "No email or password provided" });
    }
  },
);

authRouter.post(
  "/logout",
  body("id").notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    //users has to have an access token to logout as well as their id in the body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.body;
    if (id) {
      const user = await getUser(id);
      if (user) {
        deleteUserRequestToken(user.id);
        res.json({ message: "User logged out" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      return res.status(404).json({ message: "No id provided" });
    }
  },
);

authRouter.post(
  "/register",
  body(["firstName", "lastName", "email", "password"]).notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password,
    });
    if (newUser) {
      try {
        const accessToken = generateAccessToken({ email: newUser.email });
        const refreshToken = generateRefreshToken({ email: newUser.email });
        setUserRequestToken(newUser.id, refreshToken);
        res.status(200).json({
          accessToken,
          refreshToken,
          user: {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            profileImage: newUser.profileImage,
            likedFlavours: [],
            favouriteCocktails: [],
            readInsights: [],
          },
        });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
    } else {
      return res.status(409).json({ message: "User already exists" });
    }
  },
);

authRouter.post("/refresh_token", async (req: Request, res: Response) => {
  const { email, refreshToken } = req.body;
  if (email) {
    const user = await getUserByEmail(email);
    if (user) {
      if (refreshToken == user.requestToken && refreshToken != null) {
        const accessToken = generateAccessToken({ email: user.email });
        res.status(200).json({ accessToken });
      } else {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});
export default authRouter;
