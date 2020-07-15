import { videos } from "../db";

export const home = (req, res) =>
  res.render("home", { pageTitle: "home", videos });

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", {
    pageTitle: "search",
    searchingBy: searchingBy,
    videos,
  });
};

export const upload = (req, res) => res.send("upload", { pageTitle: "upload" });
export const videoDetail = (req, res) =>
  res.send("videoDetail", { pageTitle: "videoDetail" });
export const editVideo = (req, res) =>
  res.send("editVideo", { pageTitle: "editVideo" });
export const deleteVideo = (req, res) =>
  res.send("deleteVideo", { pageTitle: "deleteVideo" });
