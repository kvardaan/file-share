import axios from "axios";

import * as FileAPI from "@/api/file";
import { convertBase64ToUnit8Array } from "@/lib/utils";

export const uploadFile = async (fileName: string, fileSize: number, fileType: string, fileData: string) => {
	try {
		const { data } = await FileAPI.getSignedUrl({
			fileName,
			fileSize,
			fileType,
		});
		const { url, fileName: formattedFileName } = data;

		await axios.put(url, convertBase64ToUnit8Array(fileData), {
			headers: {
				"Content-Type": fileType,
			},
		});

		return await FileAPI.createFileRecord({
			fileName: formattedFileName,
			fileSize,
			fileType,
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const removeFile = async (id: string) => {
	try {
		const response = await FileAPI.deleteFile(id);
		return response.data.message;
	} catch (error) {
		console.error("Delete failed", error);
		throw error;
	}
};
