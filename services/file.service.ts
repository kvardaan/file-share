import RNFS from "react-native-fs";

import * as FileAPI from "@/api/file";
import { CHUNK_SIZE } from "@/lib/constants";
import { convertBase64ToUnit8Array } from "@/lib/utils";

export const uploadFile = async (fileName: string, fileSize: number, fileType: string, fileData: Blob) => {
	try {
		const { data } = await FileAPI.getSignedUrl({
			fileName,
			fileSize,
			fileType,
		});
		const { url, fileName: formattedFileName } = data;

		await fetch(url, {
			method: "PUT",
			body: fileData,
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

export const uploadLargeFile = async (
	fileName: string,
	fileSize: number,
	fileType: string,
	fileUri: string,
	totalParts: number
) => {
	try {
		const initRes = await FileAPI.initiateMultipartUpload({
			fileName,
			fileType,
		});

		const { uploadId, key, fileName: formattedFileName } = initRes.data;

		const presignedRes = await FileAPI.getPresignedPartUrls({
			uploadId,
			key,
			partsCount: totalParts,
		});

		const { urls } = await presignedRes.data;

		const etags: { PartNumber: number; ETag: string }[] = [];

		for (let i = 0; i < urls.length; i++) {
			const start = i * CHUNK_SIZE;

			// read file chunk as base64
			const chunkBase64 = await RNFS.read(fileUri, CHUNK_SIZE, start, "base64");
			const chunkData = convertBase64ToUnit8Array(chunkBase64);

			const { partNumber, signedUrl } = urls[i];

			const uploadRes = await fetch(signedUrl, {
				method: "PUT",
				headers: { "Content-Type": fileType },
				body: chunkData,
			});

			if (!uploadRes.ok) {
				throw new Error(`Failed to upload part ${partNumber}`);
			}

			const etag = uploadRes.headers.get("ETag")?.replace(/"/g, "");
			if (!etag) {
				throw new Error(`Failed to get ETag for part ${partNumber}`);
			}

			etags.push({ PartNumber: partNumber, ETag: etag });
		}

		await FileAPI.completeMultipartUpload({
			uploadId,
			key,
			parts: etags,
		});

		return await FileAPI.createFileRecord({
			fileName: formattedFileName,
			fileSize,
			fileType,
		});
	} catch (error: any) {
		console.error("uploadLargeFile", error.raw);
		throw error;
	}
};
