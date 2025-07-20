import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";

const Edit = () => {
	return (
		<SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
			<Header title="Add File" />
			<View>
				<Text>Add New File Form</Text>
			</View>
		</SafeAreaView>
	);
};

export default Edit;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eeeeee",
	},
});
