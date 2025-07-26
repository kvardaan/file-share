export const convertBase64ToUnit8Array = (base64String: string) => {
	const binaryString = atob(base64String);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes;
};

export const formatBytes = (bytes: number) => {
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	let i = 0;
	while (bytes >= 1024 && i < sizes.length) {
		bytes /= 1024;
		i += 1;
	}
	return `${bytes.toFixed(2)} ${sizes[i]}`;
};
