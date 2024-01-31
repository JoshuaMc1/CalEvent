import catchError from "./catchError";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function login(data) {
    try {
        const response = await axios.post(`${baseURL}login`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function register(data) {
    try {
        const response = await axios.post(`${baseURL}register`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function logout(token) {
    try {
        const response = await axios.delete(`${baseURL}logout`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}
