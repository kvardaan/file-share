import { api } from "@/api";

export const getFiles = async () => api.get("/file");
export const deleteFile = async (id: string) => api.delete(`/file/${id}`);
export const getSignedUrl = async (data: any) => api.post("/file/put-url", data);
export const createFileRecord = async (data: any) => api.post("/file/add", data);
export const initiateMultipartUpload = async (data: any) => api.post("/file/initiate-multipart-upload", data);
export const getPresignedPartUrls = async (data: any) => api.post("/file/presigned-part-urls", data);
export const completeMultipartUpload = async (data: any) => api.post("/file/complete-multipart-upload", data);
