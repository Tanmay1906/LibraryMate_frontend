import { mockStudents } from '../../utils/mockData';
import React from 'react';
import Card from '../../components/UI/Card';
import Navbar from '../../components/Layout/Navbar';
// import { Book } from '../../utils/mockData';
const CompletedBooks: React.FC = () => {
  const [books, setBooks] = React.useState<any[]>([]);
  const completedBooks = React.useMemo(() => books.filter(book => book.isCompleted), [books]);
  React.useEffect(() => {
    fetch('http://localhost:4000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => setBooks([]));
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Card className="p-8 bg-white/80 backdrop-blur-lg border border-slate-100 shadow-2xl rounded-2xl mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Completed Books</h1>
          <p className="text-slate-700 mb-6">Books you have finished reading will appear here. Review your completed books and revisit your favorites!</p>
          {completedBooks.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-slate-400">You haven't completed any books yet.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {completedBooks.map(book => (
                <Card key={book.id} className="p-6 bg-white/90 border border-slate-200 rounded-xl shadow">
                  <div className="flex gap-6 items-center">
                    <img src={book.coverUrl} alt={book.title} className="w-24 h-36 object-cover rounded-lg shadow" loading="lazy" />
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{book.title}</h3>
                      <p className="text-sm text-slate-600 mb-2">{book.author}</p>
                      <button className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold shadow hover:bg-amber-700 transition" onClick={() => window.location.href = `/book-reader/${book.id}`}>Read Again</button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CompletedBooks;
