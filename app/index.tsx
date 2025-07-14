import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FileItem } from "@/components/FileItem";
import { TFileItem } from "@/lib/types";

const initFiles: TFileItem[] = [
	{ id: 0, value: "Get groceries", size: 10 },
	{ id: 1, value: "Eat healthy", size: 20 },
	{ id: 2, value: "Do some movement", size: 30 },
];

export default function Index() {
	const [items, setItems] = useState<TFileItem[]>([]); // data will come from a backend api

	useEffect(() => {
		const fetchFileItems = async () => {
			try {
				setItems(initFiles);
			} catch (error) {
				console.error(error);
				Alert.alert("Error", "Something went wrong");
			}
		};

		fetchFileItems();
	}, []);

	return (
		<SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
			<Stack.Screen options={{ headerShown: false }} />
			<Text style={styles.header}>File Storage</Text>

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
				/>
			</View>

			<Pressable style={styles.addButton}>
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
	header: {
		textAlign: "center",
		fontWeight: 700,
		fontSize: 20,
		marginTop: 10,
		marginBottom: 20,
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
