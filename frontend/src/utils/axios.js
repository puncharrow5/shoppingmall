import axios from "axios";

// 요청을 보낼 때 중복된 경로를 입력하지 않기 위해서 인스턴스화를 함
const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "" : "http://localhost:4000", // " " 공백은 배포를 할 때의 url
});

// 요청 헤더의 Authorization 필드에 로컬스토리지에 저장되어있던 토큰과 Bearer토큰이 같이 담겨 보내짐
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  },

  // 에러 발생 시 에러 객체 넘겨줌
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },

  // 에러 발생 시 에러 객체 넘겨줌
  function (error) {
    if (error.response.data === "jwt expired") {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
