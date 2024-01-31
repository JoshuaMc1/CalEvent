import catchError from "./catchError";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function user(token) {
    try {
        const response = await axios.get(`${baseURL}user`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        })

        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function updateProfile(data, token) {
    try {
        const response = await axios.post(`${baseURL}update-profile`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        });

        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function updatePassword(data, token) {
    try {
        const response = await axios.put(`${baseURL}change-password`, data, {
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

export async function disableUser(token) {
    try {
        const response = await axios.delete(`${baseURL}disable-user`, {
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

export async function deleteUser(token) {
    try {
        const response = await axios.delete(`${baseURL}delete-user`, {
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
