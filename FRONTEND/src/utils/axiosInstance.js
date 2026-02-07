import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:8080/api`,
 

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
  
});


// Optional: response error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network Error:", error.message);
      return Promise.reject({
        message: "Network error. Please check your internet connection.",
      });
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        console.error("Bad Request:", data?.message);
        break;
      case 401:
        console.error("Unauthorized. Please login again.");
        break;
      case 403:
        console.error("Forbidden access.");
        break;
      case 404:
        console.error("API not found.");
        break;
      case 500:
        console.error("Server error. Try again later.");
        break;
      default:
        console.error("Unexpected error:", data?.message);
    }

    return Promise.reject({
      status,
      message: data?.message || "Something went wrong",
    });
  }
);

export default axiosInstance;
