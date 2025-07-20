import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import useFile from "@/hooks/useFile";
import { TFileItem } from "@/lib/types/file";

export const FileItem: React.FC<{
	file: TFileItem;
}> = ({ file }) => {
	const { deleteFile } = useFile();

	return (
		<View style={styles.fileContainer}>
			<Ionicons name="musical-notes" size={24} color="red" style={styles.musicIcon} />
			<View style={styles.fileTextContainer}>
				<Text style={styles.sectionTitle}>{file.metadata.fileName}</Text>
				<Text style={styles.sectionSubTitle}>{file.metadata.fileSize}</Text>
			</View>
			<Pressable
				style={styles.actionButton}
				accessibilityLabel="delete file item"
				onPress={() => {
					Alert.alert("Delete", "Are you sure you want to delete this file?", [
						{ text: "Cancel" },
						{
							text: "Delete",
							onPress: () => {
								deleteFile(file.id.toString());
							},
						},
					]);
				}}
			>
				<Ionicons name="ellipsis-vertical" size={24} color="black" />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	fileContainer: {
		width: "100%",
		flexDirection: "row",
		padding: 12,
		borderRadius: 12,
		borderColor: "#00000025",
		borderWidth: 0.5,
		backgroundColor: "white",
		gap: 8,
		alignItems: "center",
	},
	musicIcon: {
		backgroundColor: "#eeeeee",
		padding: 8,
		borderRadius: 4,
	},
	fileTextContainer: {
		flex: 1,
	},
	sectionTitle: {
		flex: 1,
		fontSize: 20,
		fontWeight: "400",
	},
	sectionSubTitle: {
		fontSize: 14,
		color: "gray",
	},
	actionButton: {
		justifyContent: "center",
	},
});
