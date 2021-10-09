import request from "@/utils/request.js";

export const getChapterData = (data) => {
  return request.post("/view_comic", data);
};
