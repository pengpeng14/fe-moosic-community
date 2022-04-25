import request from "./request";

export const signout = async () => {
  const data = await request
    .post("auth/oauth/sign-out")
    .then(({ data }) => data);

  localStorage.clear();
  return data;
};
