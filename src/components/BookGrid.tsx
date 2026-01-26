'use client';

import { Book } from '@/lib/types';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  onDelete: (id: string) => void;
}

export default function BookGrid({ books, onDelete }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="w-24 h-24 mx-auto text-gray-300 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-500 mb-2">No books yet</h3>
        <p className="text-gray-400">Upload your first PDF book to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
}
