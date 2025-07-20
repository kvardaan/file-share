import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FileItem } from "@/components/FileItem";
import { Header } from "@/components/Header";
import useFile from "@/hooks/useFile";

export default function Index() {
	const { items, isLoading, handleRefresh } = useFile();

	return (
		<SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
			<Header title="File Storage" />

			<View style={{ flex: 1, marginHorizontal: 20 }}>
				<FlatList
					contentContainerStyle={{ gap: 10, marginTop: 10 }}
					keyExtractor={(item) => item.id.toString()}
					data={items}
					renderItem={({ item }) => <FileItem file={item} />}
					ListEmptyComponent={() => (
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyMessage}>No files yet</Text>
						</View>
					)}
					refreshing={isLoading}
					refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
				/>
			</View>

			<Pressable style={styles.addButton} onPress={() => router.push("/add")}>
				<Ionicons size={28} name="add" color="white" />
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eeeeee",
	},
	emptyContainer: {
		alignItems: "center",
	},
	emptyMessage: {
		fontSize: 24,
		marginTop: 40,
		color: "red",
		fontStyle: "italic",
	},
	addButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		borderRadius: 50,
		backgroundColor: "black",
		padding: 12,
		alignItems: "center",
		justifyContent: "center",
	},
});
