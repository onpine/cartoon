import request from "@/utils/request.js";

export const getDetail = (data) => {
  return request.post("/view_comic", data);
};
