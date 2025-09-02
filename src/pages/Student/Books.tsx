import { mockStudents } from '../../utils/mockData';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Filter, Heart, BookOpen, CheckCircle, Play, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Layout/Navbar';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
// import { type Book } from '../../utils/mockData';
/**
 * Books Page Component
 * Displays all available books with search, filtering, and interaction capabilities
 * Features wishlist management, reading progress tracking, and book categorization
 */
const Books: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  React.useEffect(() => {
    fetch('http://localhost:4000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => setBooks([]));
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  /**
   * Get unique categories from books
   */
  const categories = ['all', ...new Set(books.map(book => book.category))];

  /**
   * Filter books based on search term, category, and status
   */
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
    
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'completed' && book.isCompleted) ||
                         (statusFilter === 'reading' && book.readingProgress > 0 && !book.isCompleted) ||
                         (statusFilter === 'wishlist' && book.isWishlisted) ||
                         (statusFilter === 'unread' && book.readingProgress === 0 && !book.isCompleted);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  /**
   * Toggle wishlist status
   */
  const toggleWishlist = (bookId: string) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId ? { ...book, isWishlisted: !book.isWishlisted } : book
      )
    );
  };

  /**
   * Mark book as completed
   */
  const markAsCompleted = (bookId: string) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId ? { ...book, isCompleted: true, readingProgress: 100 } : book
      )
    );
  };

  /**
   * Get reading status badge
   */
  const getStatusBadge = (book: Book) => {
    if (book.isCompleted) {
      return <span className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
        <CheckCircle size={12} className="mr-1" />
        Completed
      </span>;
    }
    
    if (book.readingProgress > 0) {
      return <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
        <Play size={12} className="mr-1" />
        Reading
      </span>;
    }
    
    return <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
      <BookOpen size={12} className="mr-1" />
      Unread
    </span>;
  };

  /**
   * Get category color
   */
  const getCategoryColor = (category: string) => {
    const colors = {
      'Classic Literature': 'bg-purple-100 text-purple-700',
      'Dystopian Fiction': 'bg-red-100 text-red-700',
      'Science Fiction': 'bg-blue-100 text-blue-700',
      'Mystery': 'bg-indigo-100 text-indigo-700',
      'Romance': 'bg-pink-100 text-pink-700',
      'Non-Fiction': 'bg-green-100 text-green-700'
    };
    return colors[category as keyof typeof colors] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50 relative">
      <Navbar />
      {/* Glassmorphism background accent */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl absolute top-0 left-0" />
        <div className="w-72 h-72 bg-emerald-200/30 rounded-full blur-2xl absolute bottom-0 right-0" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight drop-shadow-lg">My Books</h1>
          <p className="text-lg text-slate-600 mt-3">Explore, read, and manage your digital library collection.</p>
        </div>

        {/* Filters */}
        <Card className="mb-12 bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
                <Input
                placeholder="Search by title, author, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/60 border border-indigo-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2.5 border border-indigo-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/60"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-indigo-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/60"
              >
                <option value="all">All Books</option>
                <option value="unread">Unread</option>
                <option value="reading">Currently Reading</option>
                <option value="completed">Completed</option>
                <option value="wishlist">Wishlist</option>
              </select>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white/60 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow"
                onClick={() => alert('Filter options coming soon!')}
              >
                <Filter size={20} />
                More Filters
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Books Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="group bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-6 rounded-2xl">
                <div className="space-y-6">
                  {/* Book Cover */}
                  <div className="relative">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-56 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                    />
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(book.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                        book.isWishlisted 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'bg-white/80 text-slate-400 hover:bg-white hover:text-red-600'
                      }`}
                    >
                      <Heart size={18} fill={book.isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                    {/* Reading Progress */}
                    {book.readingProgress > 0 && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/90 rounded-full p-1">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${book.readingProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Book Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-slate-900 line-clamp-2 text-lg">{book.title}</h3>
                      <p className="text-sm text-slate-600">{book.author}</p>
                    </div>
                    {/* Category & Status */}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(book.category)}`}>{book.category}</span>
                      {getStatusBadge(book)}
                    </div>
                    {/* Description */}
                    <p className="text-sm text-slate-600 line-clamp-2">{book.description}</p>
                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link to={`/book-reader/${book.id}`} className="flex-1">
                        <Button variant="primary" size="sm" className="w-full flex items-center justify-center gap-2">
                          <Eye size={16} />
                          {book.readingProgress > 0 ? 'Continue' : 'Read'}
                        </Button>
                      </Link>
                      {!book.isCompleted && book.readingProgress > 0 && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => markAsCompleted(book.id)}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle size={16} />
                          Done
                        </Button>
                      )}
                    </div>
                    {/* Rating Placeholder */}
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={`${i < 4 ? 'text-amber-400 fill-current' : 'text-slate-300'}`} />
                        ))}
                        <span className="text-xs ml-1">4.0</span>
                      </div>
                      <span className="text-xs">{book.readingProgress}% read</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {/* Empty State */}
            {filteredBooks.length === 0 && (
              <Card className="text-center py-16 bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl rounded-2xl">
                <div className="text-slate-400 mb-6">
                  <BookOpen size={56} className="mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No books found</h3>
                <p className="text-slate-500">
                  {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Your library collection will appear here.'}
                </p>
              </Card>
            )}
          </div>

          {/* Sidebar: Reading Stats Summary & Quick Actions */}
          <div className="space-y-10">
            {/* Reading Stats Summary */}
            {filteredBooks.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Reading Statistics</h3>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">{filteredBooks.length}</div>
                    <div className="text-sm text-slate-600">Total Books</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{filteredBooks.filter(book => book.isCompleted).length}</div>
                    <div className="text-sm text-slate-600">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-600">{filteredBooks.filter(book => book.readingProgress > 0 && !book.isCompleted).length}</div>
                    <div className="text-sm text-slate-600">In Progress</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{filteredBooks.filter(book => book.isWishlisted).length}</div>
                    <div className="text-sm text-slate-600">Wishlist</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-lg border border-slate-100 shadow-xl p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-indigo-100 to-indigo-50 hover:from-indigo-200 hover:to-indigo-100 rounded-xl shadow flex items-center gap-3 text-indigo-900 font-semibold"
                  onClick={() => navigate('/student/books')}
                >
                  <BookOpen size={18} className="mr-2" />Browse All Books
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-emerald-100 to-emerald-50 hover:from-emerald-200 hover:to-emerald-100 rounded-xl shadow flex items-center gap-3 text-emerald-900 font-semibold"
                  onClick={() => navigate('/student/wishlist')}
                >
                  <Heart size={18} className="mr-2" />View Wishlist
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 rounded-xl shadow flex items-center gap-3 text-amber-900 font-semibold"
                  onClick={() => navigate('/student/completed-books')}
                >
                  <CheckCircle size={18} className="mr-2" />Completed Books
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 rounded-xl shadow flex items-center gap-3 text-blue-900 font-semibold"
                  onClick={() => navigate('/student/currently-reading')}
                >
                  <Eye size={18} className="mr-2" />Currently Reading
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;