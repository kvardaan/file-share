import axios from "axios";
import { useEffect, useState } from "react";

import { api } from "@/lib/axios";
import { TFileItem } from "@/lib/types/file";

interface iUseFile {
	isLoading: boolean;
	files: TFileItem[];
	handleRefresh: () => void;
	deleteFile: (id: string) => Promise<void>;
	addFile: (fileName: string, fileSize: number, fileType: string) => Promise<void>;
}

const useFile = (): iUseFile => {
	const [files, setFiles] = useState<TFileItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getFiles = async () => {
		setIsLoading(true);
		try {
			const response = await api({
				method: "get",
				url: "/file",
			});
			const { files } = response.data;

			const formattedFiles = files.map((file: { id: number; url: string; metadata: string }) => {
				return {
					...file,
					metadata: JSON.parse(file.metadata),
				};
			});

			setFiles(formattedFiles);
		} catch (error) {
			console.error("getFiles Error", error);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteFile = async (id: string) => {
		setIsLoading(true);
		try {
			await api({
				method: "delete",
				url: `/file/${id}`,
			});

			setFiles((prev) => prev.filter((file) => file.id !== Number(id)));
		} catch (error) {
			console.error("deteFile Error", error);
		} finally {
			setIsLoading(false);
		}
	};

	const addFile = async (fileName: string, fileSize: number, fileType: string) => {
		try {
			const signedPutUrlResponse = await api({
				method: "post",
				url: "/file/put-url",
				data: {
					fileName,
					fileSize,
					fileType,
				},
			});

			if (signedPutUrlResponse.status !== 200) {
				throw new Error("Failed to get upload url");
			}

			const { url, fileName: formattedFileName } = signedPutUrlResponse.data;

			const response = await axios({
				method: "PUT",
				url,
				headers: {
					"Content-Type": fileType,
				},
				data: fileName,
			});

			if (response.status !== 200) {
				throw new Error("Failed to upload file");
			} else {
				const createdFile = await api({
					method: "post",
					url: "/file/add",
					data: {
						fileName: formattedFileName,
						fileSize,
						fileType,
					},
				});
				setFiles((prev) => [...prev, createdFile.data.file]);
			}
		} catch (error) {
			console.error("addFile Error", error);
		}
	};

	const handleRefresh = () => {
		console.log("refreshed");
		getFiles();
	};

	useEffect(() => {
		getFiles();
	}, []);

	return { isLoading, files, handleRefresh, deleteFile, addFile };
};

export default useFile;
