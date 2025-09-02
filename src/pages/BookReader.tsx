import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Bookmark, 
  Settings, 
  ZoomIn, 
  ZoomOut,
  Sun,
  Moon,
  Type,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockBooks } from '../utils/mockData';

/**
 * Book Reader Page Component
 * Provides inline book reading experience with customization options
 * Features page navigation, reading settings, and progress tracking
 */
const BookReader: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(mockBooks.find(b => b.id === bookId));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(156);
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [readingProgress, setReadingProgress] = useState(book?.readingProgress || 0);

  /**
   * Mock book content for demonstration
   */
  const bookContent = `
    Chapter 1: The Beginning

    In the quiet town of Millbrook, where the autumn leaves danced through crisp October air, Sarah Mitchell found herself standing before the old Victorian library that had been her sanctuary for as long as she could remember. The weathered brick facade, adorned with ivy that turned brilliant shades of amber and crimson each fall, seemed to whisper stories of all the readers who had passed through its heavy oak doors.

    The morning sun cast long shadows across the cobblestone path, and Sarah could hear the familiar creak of the old building settling into another day. Mrs. Henderson, the head librarian, had called her the night before with news that would change everything. The library, which had served the community for over a century, was facing closure due to budget cuts.

    As Sarah pushed through the entrance, the familiar scent of aged paper and leather bindings enveloped her like a warm embrace. The morning light filtered through the tall windows, illuminating thousands of books that held countless worlds, adventures, and dreams. Each shelf told a story not just through its contents, but through the memories of everyone who had discovered something magical within these walls.

    "Sarah, dear, thank you for coming so early," called Mrs. Henderson from behind the circulation desk. Her silver hair was pulled back in its usual neat bun, but there was something different in her eyes today—a mixture of determination and hope that Sarah hadn't seen before.

    "Of course, Mrs. Henderson. I couldn't sleep after our call last night. What can we do?" Sarah approached the desk, her footsteps echoing softly in the quiet morning air.

    The elderly librarian smiled, that same warm smile that had welcomed Sarah as a shy six-year-old, clutching her first library card like a treasure. "Well, my dear, I have an idea. It's ambitious, perhaps even a bit crazy, but I believe it might just work..."

    As Mrs. Henderson began to outline her plan, Sarah felt a spark of excitement that she hadn't experienced in years. The library didn't just need saving—it needed a revolution. And perhaps, just perhaps, Sarah was exactly the person to help make it happen.

    The plan was simple in concept but complex in execution: transform the traditional library into a modern community hub while preserving its historical charm and literary soul. It would require community support, innovative programming, and most importantly, a team of dedicated individuals who believed in the power of books to change lives.

    Outside, the first commuters of the day began their journey to work, unaware that inside the old library, two women were plotting to save not just a building, but a cornerstone of their community's identity.
  `;

  /**
   * Update reading progress based on current page
   */
  useEffect(() => {
    const progress = Math.round((currentPage / totalPages) * 100);
    setReadingProgress(progress);
    
    // Update book progress in mock data
    if (book) {
      setBook(prev => prev ? { ...prev, readingProgress: progress } : prev);
    }
  }, [currentPage, totalPages, book]);

  /**
   * Handle navigation
   */
  const goBack = () => {
    navigate(-1);
  };

  /**
   * Navigate between pages
   */
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  /**
   * Adjust font size
   */
  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(prev => prev + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(prev => prev - 2);
    }
  };

  /**
   * Add bookmark (placeholder)
   */
  const addBookmark = () => {
    alert(`Bookmark added at page ${currentPage}`);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Book not found</h1>
          <Button onClick={goBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-6 flex items-center justify-between ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={goBack} className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Books
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                by {book.author}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={addBookmark}
              className="flex items-center gap-2"
            >
              <Bookmark size={18} />
              Bookmark
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2"
            >
              <Settings size={18} />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Reading Area */}
          <div className="lg:col-span-3">
            <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'} transition-colors duration-300`}>
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {readingProgress}% complete
                    </span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full h-2`}>
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${readingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Book Content */}
                <div 
                  className={`prose max-w-none leading-relaxed transition-all duration-300 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                  style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                >
                  {bookContent}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <Button
                    variant="outline"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  
                  <Button
                    variant="primary"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Info */}
            <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'} transition-colors duration-300`}>
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Book Details
                </h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Category
                  </label>
                  <p className={`${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                    {book.category}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Description
                  </label>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {book.description}
                  </p>
                </div>
                <div>
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Reading Progress
                  </label>
                  <p className={`${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                    {readingProgress}% Complete
                  </p>
                </div>
              </div>
            </Card>

            {/* Reading Settings */}
            {showSettings && (
              <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'} transition-colors duration-300`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Reading Settings
                </h3>
                
                <div className="space-y-4">
                  {/* Font Size */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Font Size
                    </label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={decreaseFontSize}>
                        <ZoomOut size={14} />
                      </Button>
                      <span className={`px-3 py-1 ${isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-800'} rounded text-sm`}>
                        {fontSize}px
                      </span>
                      <Button variant="outline" size="sm" onClick={increaseFontSize}>
                        <ZoomIn size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Theme Toggle */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Theme
                    </label>
                    <Button
                      variant="outline"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="flex items-center gap-2"
                    >
                      {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                  </div>

                  {/* Typography */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Font Family
                    </label>
                    <select className={`w-full px-3 py-2 border rounded-lg ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-slate-200' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}>
                      <option value="serif">Serif</option>
                      <option value="sans-serif">Sans Serif</option>
                      <option value="monospace">Monospace</option>
                    </select>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation Shortcuts */}
            <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'} transition-colors duration-300`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Quick Navigation
              </h3>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  Chapter 1: The Beginning
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Chapter 2: The Discovery
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Chapter 3: The Plan
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReader;