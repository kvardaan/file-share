import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { allowedFileTypes, maxAllowedFileSize } from "@/lib/constants";
import { uploadFile } from "@/services/file.service";

const Edit = () => {
	const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
	const [fileUri, setFileUri] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const [fileSize, setFileSize] = useState<number | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const pickFile = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				copyToCacheDirectory: true,
				base64: false,
				type: allowedFileTypes,
			});

			if (result.canceled || !result.assets[0]) {
				return;
			}

			const file = result.assets[0];

			if (file.size && file.size > maxAllowedFileSize) {
				// 50MB
				Alert.alert("Error", "File size is too large");
				return;
			}

			setFile(file);
			setFileUri(file.uri);
			setFileSize(file.size || 0);
		} catch (error) {
			Alert.alert("Oops!", `Error picking file: ${error}`);
		}
	};

	const handleUpload = async () => {
		if (!fileUri || !fileSize || !fileName) {
			Alert.alert("Error", "Incomplete fields");
			return;
		}

		try {
			setIsUploading(true);

			const fileBlob = await (await fetch(fileUri)).blob();
			console.log({ blobSize: fileBlob.size });
			const fileType = `audio/${fileUri.split(".").pop()}`;
			console.log({ fileType });
			await uploadFile(fileName, fileSize, fileType, fileBlob);
			console.log("uploaded");
			Alert.alert("File uploaded successfully");
			router.back();
		} catch (error: any) {
			console.error(`Error uploading file: ${error}`);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<SafeAreaView style={styles.safeContainer} edges={["top", "bottom", "left", "right"]}>
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>File Name</Text>
					<TextInput
						placeholder="File Name"
						placeholderTextColor="grey"
						onChangeText={(text) => setFileName(text)}
						style={styles.input}
					/>
				</View>
				<View style={{ gap: 8 }}>
					<Pressable onPress={pickFile} style={styles.fileButton}>
						<Text>{file ? "Change File" : "Select File"}</Text>
					</Pressable>
					{file && file.size && (
						<Text style={styles.fileInfo}>
							{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
						</Text>
					)}
				</View>
				<Pressable onPress={handleUpload} style={styles.uploadButton}>
					<Text style={styles.uploadButtonText}>
						{isUploading ? <ActivityIndicator color="white" size="small" /> : "Upload File"}
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Edit;

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: "#eeeeee",
		padding: 16,
		gap: 16,
	},
	inputContainer: {
		gap: 8,
	},
	inputLabel: {
		fontWeight: 600,
		fontSize: 16,
	},
	input: {
		borderWidth: 1,
		padding: 8,
		borderRadius: 4,
		borderColor: "#00000050",
		fontSize: 16,
		color: "black",
	},
	fileButton: {
		padding: 12,
		backgroundColor: "orange",
		borderRadius: 12,
		alignItems: "center",
		width: "50%",
		alignSelf: "center",
	},
	fileInfo: {
		color: "#00000050",
		textAlign: "center",
		fontSize: 12,
	},
	uploadButton: {
		padding: 12,
		backgroundColor: "black",
		borderRadius: 12,
		alignItems: "center",
	},
	uploadButtonText: {
		color: "white",
		fontWeight: 700,
		fontSize: 16,
	},
});
