import { mockStudents } from '../../utils/mockData';
import React from 'react';
import Card from '../../components/UI/Card';
import Navbar from '../../components/Layout/Navbar';
// import { Book } from '../../utils/mockData';
const Wishlist: React.FC = () => {
  const [books, setBooks] = React.useState<any[]>([]);
  const wishlistedBooks = React.useMemo(() => books.filter(book => book.isWishlisted), [books]);
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
          <h1 className="text-3xl font-bold text-slate-900 mb-4">My Wishlist</h1>
          <p className="text-slate-700 mb-6">Books you have saved for later will appear here. Add books to your wishlist to keep track of what you want to read next!</p>
          {wishlistedBooks.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-slate-400">Your wishlist is empty.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {wishlistedBooks.map(book => (
                <Card key={book.id} className="p-6 bg-white/90 border border-slate-200 rounded-xl shadow">
                  <div className="flex gap-6 items-center">
                    <img src={book.coverUrl} alt={book.title} className="w-24 h-36 object-cover rounded-lg shadow" loading="lazy" />
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{book.title}</h3>
                      <p className="text-sm text-slate-600 mb-2">{book.author}</p>
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold shadow hover:bg-emerald-700 transition" onClick={() => window.location.href = `/book-reader/${book.id}`}>Read Now</button>
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

export default Wishlist;
