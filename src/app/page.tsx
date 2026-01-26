'use client';

import { useState, useEffect, useCallback } from 'react';
import { Book } from '@/lib/types';
import BookGrid from '@/components/BookGrid';
import SearchBar from '@/components/SearchBar';
import UploadForm from '@/components/UploadForm';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBooks(books.filter((book) => book.id !== id));
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Books Archive</h1>
              <p className="text-gray-500 mt-1">
                {books.length} {books.length === 1 ? 'book' : 'books'} in your library
              </p>
            </div>
            <UploadForm onUploadSuccess={fetchBooks} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-500">Loading books...</p>
          </div>
        ) : (
          <BookGrid books={filteredBooks} onDelete={handleDelete} />
        )}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm">
          Books Archive &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
