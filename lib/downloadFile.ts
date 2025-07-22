import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

export const downloadFile = async (url: string, fileName: string) => {
	if (!url || !fileName) {
		return;
	}

	const permission = await MediaLibrary.requestPermissionsAsync();

	if (!permission.granted) {
		Alert.alert("Permission denied", "Cannot download with allowing the permission to download!");
		return;
	}

	try {
		const downloadPath = FileSystem.documentDirectory + fileName;

		const { uri } = await FileSystem.downloadAsync(url, downloadPath);

		await MediaLibrary.saveToLibraryAsync(uri);
		Alert.alert("Success", `${fileName} downloaded successfully!`);
	} catch (error) {
		console.error("Download error: ", error);
		alert("Error downloading file");
	}
};
