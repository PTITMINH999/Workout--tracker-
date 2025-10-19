import instance from "../utils/axiosConfig";

export const progressApi = {
  add: (data) => instance.post("/progress", data),

  getByUser: (userId) => instance.get(`/progress/user/${userId}`),

  getByRange: (userId, start, end) =>
    instance.get(`/progress/user/${userId}/range`, {
      params: { start, end },
    }),

  delete: (progressId) => instance.delete(`/progress/${progressId}`),
};
