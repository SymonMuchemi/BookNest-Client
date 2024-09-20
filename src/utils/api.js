import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL
});

export const fetchBooks = (params = '') => api.get(`/books/get_books${params}`);
export const fetchBooksBySearch = (searchType, searchTerm, page = 1, perPage = 10) => {
    const endpoint = searchType === 'author' ? 'get_by_author' : 'get_by_title';
    return api.get(`/books/${endpoint}/${searchTerm}`, {
        params: { page, per_page: perPage }
    });
};
export const deleteBook = (id) => api.delete(`/books/delete/${id}`);
export const createBook = (bookData) => api.post('/books/create', bookData);
export const updateBook = (book) => api.put(`/books/update/${book.id}`, book);

export const fetchMembers = (page = 1, perPage = 10) => {
    return api.get(`/members/get_members`, {
        params: { page, per_page: perPage }
    });
};
export const deleteMember = (id) => api.delete(`/members/delete/${id}`);
export const createMember = (memberData) => api.post('/members/create', memberData);
export const updateMember = (member) => api.put(`/members/update/${member.id}`, member);

export default api;
