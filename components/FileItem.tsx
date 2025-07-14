import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { TFileItem } from "@/lib/types";

export const FileItem: React.FC<{
	file: TFileItem;
}> = ({ file }) => {
	return (
		<View style={styles.fileContainer}>
			<Ionicons name="musical-notes" size={24} color="red" style={styles.musicIcon} />
			<View style={styles.fileTextContainer}>
				<Text style={styles.sectionTitle}>{file.value}</Text>
				<Text style={styles.sectionSubTitle}>{file.size}</Text>
			</View>
			<Pressable
				style={styles.actionButton}
				accessibilityLabel="delete file item"
				onPress={() => alert("show modal/pop-up to download, edit & delete")}
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
