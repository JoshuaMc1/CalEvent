import catchError from "./catchError";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function getEvents(token) {
    try {
        const response = await axios.get(`${baseURL}events`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function getEvent(token, slug) {
    try {
        const response = await axios.get(`${baseURL}events/${slug}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function createEvent(token, data) {
    try {
        const response = await axios.post(`${baseURL}events`, data, {
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

export async function updateEvent(token, slug, data) {
    try {
        const response = await axios.post(`${baseURL}events-update/${slug}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function deleteEvent(token, slug) {
    try {
        const response = await axios.delete(`${baseURL}events/${slug}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}
