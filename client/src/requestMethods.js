import axios from "axios";

const appUrl = "https://maroon-waders.cyclic.app/api/routes/leetcode";
// const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//   .currentUser.token || '';

export const publicRequest = axios.create({
  baseURL: `${appUrl}`,
});

// export const userRequest = axios.create({
//   baseURL: `${appUrl}/api`,
//   headers: { token: `Bearer ${token}` },
// });
