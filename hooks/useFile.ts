import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { TFileItem } from "@/lib/types";

const initFiles: TFileItem[] = [
	{ id: 0, value: "Get groceries", size: 10 },
	{ id: 1, value: "Eat healthy", size: 20 },
	{ id: 2, value: "Do some movement", size: 30 },
];

interface iUseFile {
	isLoading: boolean;
	items: TFileItem[];
	handleRefresh: () => void;
}

const useFile = (): iUseFile => {
	const [items, setItems] = useState<TFileItem[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchFileItems = async () => {
		setIsLoading(true);
		try {
			setItems(initFiles);
		} catch (error) {
			console.error(error);
			Alert.alert("Error", "Something went wrong");
		}
		setIsLoading(false);
	};

	const handleRefresh = () => {
		console.log("refreshed");
		fetchFileItems();
	};

	useEffect(() => {
		fetchFileItems();
	}, []);

	return { isLoading, items, handleRefresh };
};

export default useFile;
