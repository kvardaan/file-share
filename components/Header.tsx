import { StyleSheet, Text } from "react-native";

export const Header = ({ title }: { title: string }) => {
	return <Text style={styles.header}>{title}</Text>;
};

const styles = StyleSheet.create({
	header: {
		textAlign: "center",
		fontWeight: 700,
		fontSize: 20,
		marginTop: 10,
		marginBottom: 20,
	},
});
