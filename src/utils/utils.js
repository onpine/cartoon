export const joinParamUrl = (uri, params) => {
  const paramsArray = [];
  Object.keys(params).forEach(
    (key) =>
      params[key] !== undefined && paramsArray.push(`${key}=${params[key]}`)
  );
  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join("&")}`;
  } else {
    uri += `&${paramsArray.join("&")}`;
  }
  return uri;
};
