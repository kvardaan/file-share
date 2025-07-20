export type TFileItem = {
	id: number;
	url: string;
	metadata: {
		fileName: string;
		fileType: string;
		fileSize: number;
	};
};
