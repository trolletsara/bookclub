import apiClient from './axiosConfig';

export const getAllBooks = async (query, startIndex = 0) => {
    try {
        const q = query && query.trim() !== "" ? query : 'subject:fiction';
        
        const response = await apiClient.get('/volumes', {
            params: {
                q: q,
                startIndex: startIndex,
                maxResults: 20
            }
        });
        
        return response.data;
        
    } catch (error) {
        console.error("Fel vid hämtning av böcker:", error);
        throw new Error('Kunde inte hämta böcker från Google. Kontrollera din anslutning.');
    }
}

export async function getBookById(id) {
    const response = await apiClient.get(`/volumes/${id}`);
    return response.data;
}

export async function createBook(bookData) {
      try {
    const response = await apiClient.post('/volumes', bookData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create book: ${error.message}`);
  }
}

export async function updateBook(id, bookData) {
  try {
    const response = await apiClient.patch(`/volumes/${id}`, bookData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update book: ${error.message}`);
  }
}

export async function replaceBook(id, bookData) {
  try {
    const response = await apiClient.put(`/volumes/${id}`, bookData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update book: ${error.message}`);
  }
}

export async function deleteBook(id) {
  try {
    await apiClient.delete(`/volumes/${id}`);
    return { message: 'Book deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete book: ${error.message}`);
  }
}

export async function searchBooks(query) {
    const response = await apiClient.get('/volumes', {
      params: {
        q: query
      }
    });
    return response.data.items;
}