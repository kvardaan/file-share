import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { getFiles } from "@/api/file";
import { TFileItem } from "@/lib/types/file";
import { removeFile } from "@/services/file.service";

interface iUseFiles {
	loading: boolean;
	files: TFileItem[];
	error: string | null;
	handleRefresh: () => void;
	deleteFile: (id: string) => Promise<void>;
}

const useFiles = (): iUseFiles => {
	const [files, setFiles] = useState<TFileItem[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchFiles = async () => {
		setLoading(true);
		try {
			const response = await getFiles();

			const formattedFiles = response.data.files.map((file: any) => ({
				...file,
				metadata: JSON.parse(file.metadata),
			}));

			setFiles(formattedFiles);
		} catch (error: any) {
			setError(error.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const deleteFile = async (id: string) => {
		try {
			await removeFile(id);
			setFiles((prev) => prev.filter((file) => file.id !== Number(id)));
			Alert.alert("Success", "File deleted successfully");
		} catch (error: any) {
			setError(error.message || "Error deleting file");
		}
	};

	const handleRefresh = () => {
		fetchFiles();
	};

	useEffect(() => {
		fetchFiles();
	}, []);

	return { loading, files, error, handleRefresh, deleteFile };
};

export default useFiles;
