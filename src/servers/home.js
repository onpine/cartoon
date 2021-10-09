import request from "@/utils/request.js";

export const getHome = function () {
  return request.get("/comic_list");
};
