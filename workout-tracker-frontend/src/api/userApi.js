import instance from "../utils/axiosConfig";

export const userApi = {
  getAll: () => instance.get("/users"),
  getById: (id) => instance.get(`/users/${id}`),
  create: (data) => instance.post("/users", data),
  update: (id, data) => instance.put(`/users/${id}`, data),
  delete: (id) => instance.delete(`/users/${id}`),
};
