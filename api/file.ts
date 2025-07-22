import { api } from "@/api";

export const getFiles = async () => api.get("/file");
export const deleteFile = async (id: string) => api.delete(`/file/${id}`);
export const getSignedUrl = async (data: any) => api.post("/file/put-url", data);
export const createFileRecord = async (data: any) => api.post("/file/add", data);
