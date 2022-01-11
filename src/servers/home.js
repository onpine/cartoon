import request from "@/utils/request.js";

export const getHome = function () {
  return request.get("/comic_list");
};
export const getHomeSearch = function (text) {
  return request.post(`/comic_list`, { key: text });
};
