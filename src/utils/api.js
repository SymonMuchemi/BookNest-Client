import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL
})

export const fetchBooks = (params = '') => api.get(`/books/get_books${params}`);
export const fetchBooksByAuthor = (author) => api.get(`/books/get_by_author/${author}`);
export const fetchBooksByTitle = (title) => api.get(`/books/get_by_title/${title}`);
export const deleteBook = (id) => api.delete(`/books/delete/${id}`)
export const createBook = (bookData) => api.post('/books/create', bookData);

export default api;
