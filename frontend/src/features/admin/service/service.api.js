import API from "../../../service/http";

export const getUsers=()=>API.get("/admin-users");