import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

// Add access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use((response)=>{
  return response;
},
async(error)=>{
  const originalRequest = error.config;

  if(error.response?.status===401 && !originalRequest._retry)
{
  originalRequest._retry=true;
 try {
  const refreshToken= localStorage.getItem("refresh_token");
  if(!refreshToken){
    return Promise.reject(error);

  }
  const response = await axios.post ("http://127.0.0.1:5000/refresh",{},{
    headers:{
      Authorization:`Bearer ${refereshtoken}`,
    },
  }
  );
  const newAccessToken =response.data.access_token;

  localStorage.setItem("access_token",newAccessToken);
  originalRequest.headers.Authorization=`Bearer ${newAccessToken}`;
  return api(originalRequest);


  
 }
  catch(refreshError){
    console.log("Refresh token Failed :",refreshError);

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("email");

    window.location.href = "/login";

    return Promise.reject(refreshError);
  }

}
return Promise.reject(error);})

export default api;