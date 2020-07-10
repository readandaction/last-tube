import routes from "./routes";

export const localsMiddlware = (req, res, next) => {
  res.locals.siteTitle = "Last-tube";
  res.locals.routes = routes;
  next();
};
