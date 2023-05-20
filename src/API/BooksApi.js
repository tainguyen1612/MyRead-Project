import axiosClient from "./axiosClient";

const BooksApi = {
    getStatus: () => {
        const url = "/status";
        return axiosClient.get(url);
    },

    getAllBooks: () => {
        const url = "/books";
        return axiosClient.get(url);
    },

    getSelfBooks: (id) => {
        const url = `/books/${id}`;
        return axiosClient.get(url);
    },

    updateBooks: (id, shelf) => {
        const url = `/books/${id}`;
        return axiosClient.put(url, shelf);
    },
};

export default BooksApi;
