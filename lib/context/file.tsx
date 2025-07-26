import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import { getFiles } from "@/api/file";
import { TFileItem } from "@/lib/types/file";
import { removeFile } from "@/services/file.service";

interface IFileProps {
	files: TFileItem[];
	deleteFile: (id: string) => Promise<void>;
	fetchFiles: () => void;
	loading: boolean;
	error: string | null;
}

const FileContext = createContext<IFileProps>({
	files: [],
	deleteFile: async () => {},
	fetchFiles: () => {},
	loading: false,
	error: null,
});

export const useFiles = () => {
	return useContext(FileContext);
};

export const FileProvider = ({ children }: PropsWithChildren) => {
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

	useEffect(() => {
		fetchFiles();
	}, []);

	const value = {
		files,
		deleteFile,
		fetchFiles,
		loading,
		error,
	};

	return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};
