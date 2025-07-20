import axios from "axios";

import { config } from "./env.config";

const API_BASE_URL = config.API_URL || "http://localhost:3000/api/v1";

export const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});
