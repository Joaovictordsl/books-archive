'use client';

import { Book } from '@/lib/types';

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-40 flex items-center justify-center">
        <svg
          className="w-16 h-16 text-white opacity-80"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
        </svg>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
        {book.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{book.description}</p>
        )}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>{formatFileSize(book.size)}</span>
          <span>{formatDate(book.uploadedAt)}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <a
            href={`/books/${book.filename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            View PDF
          </a>
          <a
            href={`/books/${book.filename}`}
            download={book.originalName}
            className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Download
          </a>
          <button
            onClick={handleDelete}
            className="bg-red-100 text-red-600 py-2 px-3 rounded-md hover:bg-red-200 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
