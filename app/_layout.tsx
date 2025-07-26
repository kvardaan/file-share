import { FileProvider } from "@/lib/context/file";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
	return (
		<FileProvider>
			<SafeAreaProvider>
				<Stack screenOptions={{ headerShown: false, animation: "none" }}>
					<Stack.Screen name="index" />
					<Stack.Screen
						name="add"
						options={{
							presentation: "modal",
							animation: Platform.OS === "ios" ? "slide_from_bottom" : "slide_from_right",
							title: "Add File",
							headerShown: true,
							headerBackVisible: true,
							headerTitleAlign: Platform.OS === "ios" ? "center" : "left",
							headerBackButtonDisplayMode: "generic",
						}}
					/>
				</Stack>
			</SafeAreaProvider>
		</FileProvider>
	);
}
