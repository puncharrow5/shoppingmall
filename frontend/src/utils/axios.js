import axios from "axios";

// 요청을 보낼 때 중복된 경로를 입력하지 않기 위해서 인스턴스화를 함 
const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ?
  "": "http://localhost:4000" // " " 공백은 배포를 할 때의 url
})

export default axiosInstance;