import passport from "passport";
import GitHubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userControllers";
import routes from "./routes";

passport.use(User.createStrategy());
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://glacial-spire-25329.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
