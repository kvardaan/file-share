import axios from "axios";

import { config } from "@/lib/env.config";

const API_BASE_URL = config.API_URL || "";

export const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;

		return Promise.reject({
			message: error?.response?.data?.error || "Something went wrong",
			status,
			raw: error,
		});
	}
);
