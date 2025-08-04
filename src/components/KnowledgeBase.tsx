// src/components/KnowledgeBase.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { knowledgeBase, knowledgeCategories, searchArticles, getArticlesByCategory } from '../data/knowledgeBase';
import ArticleViewer from './ArticleViewer';
import type { KnowledgeArticle } from '../data/knowledgeBase';

const KnowledgeBase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [sortBy, setSortBy] = useState<'difficulty' | 'readTime' | 'updated' | 'title'>('difficulty');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('knowledge-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Modal states
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Form states
  const [suggestionForm, setSuggestionForm] = useState({
    title: '',
    category: 'basics',
    difficulty: 'beginner',
    description: '',
    reason: '',
    contactEmail: ''
  });
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'feedback'
  });

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('knowledge-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (articleId: string) => {
    setFavorites(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  // Form handlers for static site solutions
  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Option 1: EmailJS (recommended for static sites)
      // First install: npm install @emailjs/browser
      // Then uncomment this section and configure EmailJS:
      
      /*
      import emailjs from '@emailjs/browser';
      
      const templateParams = {
        suggestion_title: suggestionForm.title,
        category: suggestionForm.category,
        difficulty: suggestionForm.difficulty,
        description: suggestionForm.description,
        reason: suggestionForm.reason,
        contact_email: suggestionForm.contactEmail,
        timestamp: new Date().toLocaleString('cs-CZ')
      };
      
      await emailjs.send(
        'YOUR_SERVICE_ID',    // Get from EmailJS dashboard
        'YOUR_TEMPLATE_ID',   // Create template in EmailJS
        templateParams,
        'YOUR_PUBLIC_KEY'     // Get from EmailJS dashboard
      );
      */
      
      // Option 2: Formspree (simple alternative)
      // Uncomment and replace with your Formspree endpoint:
      /*
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: suggestionForm.title,
          category: suggestionForm.category,
          difficulty: suggestionForm.difficulty,
          description: suggestionForm.description,
          reason: suggestionForm.reason,
          contactEmail: suggestionForm.contactEmail,
          type: 'article_suggestion'
        })
      });
      
      if (!response.ok) throw new Error('Failed to send');
      */
      
      // Option 3: Web3Forms (another good alternative)
      // Uncomment and replace with your Web3Forms key:
      /*
      const formData = new FormData();
      formData.append('access_key', 'YOUR_WEB3FORMS_KEY');
      formData.append('subject', `Návrh článku: ${suggestionForm.title}`);
      formData.append('title', suggestionForm.title);
      formData.append('category', suggestionForm.category);
      formData.append('difficulty', suggestionForm.difficulty);
      formData.append('description', suggestionForm.description);
      formData.append('reason', suggestionForm.reason);
      formData.append('contact_email', suggestionForm.contactEmail);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to send');
      */
      
      // Fallback: Advanced mailto with better formatting
      const subject = encodeURIComponent(`[Detailing Wiki] Návrh článku: ${suggestionForm.title}`);
      const body = encodeURIComponent(
        `📝 NÁVRH NOVÉHO ČLÁNKU\n\n` +
        `Název: ${suggestionForm.title}\n` +
        `Kategorie: ${suggestionForm.category}\n` +
        `Obtížnost: ${suggestionForm.difficulty}\n\n` +
        `POPIS OBSAHU:\n${suggestionForm.description}\n\n` +
        `DŮVOD/PŘÍNOS:\n${suggestionForm.reason}\n\n` +
        `Kontakt: ${suggestionForm.contactEmail}\n` +
        `Odeslano: ${new Date().toLocaleString('cs-CZ')}`
      );
      
      // Create mailto link
      const mailtoLink = `mailto:admin@car-glow.cz?subject=${subject}&body=${body}`;
      window.open(mailtoLink);
      
      alert('Děkujeme za návrh! Váš email klient byl otevřen s předvyplněnou zprávou.');
      
    } catch (error) {
      console.error('Error sending suggestion:', error);
      alert('Došlo k chybě. Zkuste to prosím znovu nebo nás kontaktujte přímo.');
    }
    
    // Reset form and close modal
    setSuggestionForm({
      title: '',
      category: 'basics', 
      difficulty: 'beginner',
      description: '',
      reason: '',
      contactEmail: ''
    });
    setShowSuggestModal(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Option 1: EmailJS (recommended)
      // Uncomment after setting up EmailJS:
      /*
      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        inquiry_type: contactForm.inquiryType,
        subject: contactForm.subject,
        message: contactForm.message,
        timestamp: new Date().toLocaleString('cs-CZ')
      };
      
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_CONTACT_TEMPLATE_ID', 
        templateParams,
        'YOUR_PUBLIC_KEY'
      );
      */
      
      // Option 2: Formspree
      // Uncomment and configure:
      /*
      const response = await fetch('https://formspree.io/f/YOUR_CONTACT_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(contactForm)
      });
      
      if (!response.ok) throw new Error('Failed to send');
      */
      
      // Fallback: Enhanced mailto
      const subject = encodeURIComponent(`[Detailing Wiki] ${contactForm.subject}`);
      const body = encodeURIComponent(
        `🤝 KONTAKT OD UŽIVATELE\n\n` +
        `Jméno: ${contactForm.name}\n` +
        `Email: ${contactForm.email}\n` + 
        `Typ dotazu: ${contactForm.inquiryType}\n\n` +
        `ZPRÁVA:\n${contactForm.message}\n\n` +
        `Odeslano: ${new Date().toLocaleString('cs-CZ')}`
      );
      
      const mailtoLink = `mailto:admin@car-glow.cz?subject=${subject}&body=${body}`;
      window.open(mailtoLink);
      
      alert('Děkujeme za zprávu! Váš email klient byl otevřen s předvyplněnou zprávou.');
      
    } catch (error) {
      console.error('Error sending contact:', error);
      alert('Došlo k chybě. Zkuste to prosím znovu nebo nás kontaktujte přímo na admin@car-glow.cz');
    }
    
    // Reset form and close modal
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      inquiryType: 'feedback'
    });
    setShowContactModal(false);
  };

  // Enhanced filtering and sorting
  const filteredArticles = useMemo(() => {
    let articles = knowledgeBase;

    // Apply category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'favorites') {
        articles = articles.filter(article => favorites.includes(article.id));
      } else {
        articles = getArticlesByCategory(selectedCategory);
      }
    }

    // Apply difficulty filter
    if (filterDifficulty !== 'all') {
      articles = articles.filter(article => article.difficulty === filterDifficulty);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      articles = searchArticles(searchQuery);
    }

    // Sort articles
    return articles.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
          const diffA = difficultyOrder[a.difficulty];
          const diffB = difficultyOrder[b.difficulty];
          if (diffA !== diffB) return diffA - diffB;
          return a.title.localeCompare(b.title, 'cs-CZ');
        case 'readTime':
          return a.readTime - b.readTime;
        case 'updated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'title':
          return a.title.localeCompare(b.title, 'cs-CZ');
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy, filterDifficulty, favorites]);

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDifficultyLabel = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'Začátečník';
      case 'intermediate': return 'Pokročilý';
      case 'advanced': return 'Expert';
      case 'expert': return 'Profesionál';
      default: return difficulty;
    }
  };

  const getReadingTimeEstimate = (readTime: number): string => {
    if (readTime < 5) return 'Rychlé čtení';
    if (readTime < 10) return 'Krátké čtení';
    if (readTime < 20) return 'Střední čtení';
    return 'Dlouhé čtení';
  };

  if (selectedArticle) {
    return (
      <ArticleViewer
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  return (
    <section className="p-4 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
            📚 Detailing Wiki & Know-How
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Kompletní znalostní báze pro profesionální auto detailing
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>📖 {knowledgeBase.length} článků</span>
            <span>•</span>
            <span>⏱️ {knowledgeBase.reduce((sum, article) => sum + article.readTime, 0)} minut čtení</span>
            <span>•</span>
            <span>🏷️ {new Set(knowledgeBase.flatMap(article => article.tags)).size} tagů</span>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="🔍 Hledat články, techniky, tipy... (např. 'keramické coating', 'mytí', 'business')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="mb-8 space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
              }`}
            >
              📋 Vše ({knowledgeBase.length})
            </button>
            <button
              onClick={() => setSelectedCategory('favorites')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'favorites'
                  ? 'bg-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-600'
              }`}
            >
              ❤️ Oblíbené ({favorites.length})
            </button>
            {knowledgeCategories.map(category => {
              const count = getArticlesByCategory(category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Řadit:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
              >
                <option value="difficulty">Podle obtížnosti</option>
                <option value="readTime">Podle času čtení</option>
                <option value="updated">Podle aktualizace</option>
                <option value="title">Podle názvu</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Úroveň:</label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
              >
                <option value="all">Všechny úrovně</option>
                <option value="beginner">Začátečník</option>
                <option value="intermediate">Pokročilý</option>
                <option value="advanced">Expert</option>
                <option value="expert">Profesionál</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg p-1 border border-gray-300 dark:border-gray-600">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded text-sm ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                ⊞ Dlaždice
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded text-sm ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                ≡ Seznam
              </button>
            </div>
          </div>
        </div>

        {/* Knowledge Base Stats - Moved up */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Articles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {knowledgeBase.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Celkem článků</div>
            <div className="text-xs text-gray-500 mt-1">
              +{knowledgeBase.filter(a => new Date(a.lastUpdated) > new Date('2024-08-01')).length} nových
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              {knowledgeCategories.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Kategorií</div>
            <div className="text-xs text-gray-500 mt-1">Kompletní pokrytí</div>
          </div>

          {/* Reading Time */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {Math.round(knowledgeBase.reduce((sum, article) => sum + article.readTime, 0) / 60)}h
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Celkem hodin</div>
            <div className="text-xs text-gray-500 mt-1">
              Průměr {Math.round(knowledgeBase.reduce((sum, article) => sum + article.readTime, 0) / knowledgeBase.length)} min
            </div>
          </div>

          {/* Difficulty Distribution */}  
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
              {knowledgeBase.filter(a => a.difficulty === 'expert').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Expert článků</div>
            <div className="text-xs text-gray-500 mt-1">Pro profesionály</div>
          </div>
        </div>

        {/* Learning Path Suggestions - Moved up */}
        <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
            🎯 Doporučené učební cesty
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Beginner Path */}
            <div className="text-center">
              <div className="text-3xl mb-2">🌱</div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Pro začátečníky</h4>
              <div className="space-y-2">
                {knowledgeBase
                  .filter(article => article.difficulty === 'beginner')
                  .slice(0, 3)
                  .map(article => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="block w-full px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors text-sm"
                    >
                      {article.title}
                    </button>
                  ))}
              </div>
            </div>

            {/* Intermediate Path */}
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Pro pokročilé</h4>
              <div className="space-y-2">
                {knowledgeBase
                  .filter(article => article.difficulty === 'intermediate')
                  .slice(0, 3)
                  .map(article => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="block w-full px-3 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/40 transition-colors text-sm"
                    >
                      {article.title}
                    </button>
                  ))}
              </div>
            </div>

            {/* Expert Path */}
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Pro experty</h4>
              <div className="space-y-2">
                {knowledgeBase
                  .filter(article => article.difficulty === 'expert')
                  .slice(0, 3)
                  .map(article => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="block w-full px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors text-sm"
                    >
                      {article.title}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? (
              <>Nalezeno <strong>{filteredArticles.length}</strong> článků pro "<em>{searchQuery}</em>"</>
            ) : (
              <>Zobrazeno <strong>{filteredArticles.length}</strong> článků</>
            )}
            {filterDifficulty !== 'all' && (
              <> • Úroveň: <strong>{getDifficultyLabel(filterDifficulty)}</strong></>
            )}
          </p>
        </div>

        {/* Articles Display */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3">
              Žádné články nenalezeny
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              Zkuste upravit vyhledávací dotaz nebo vybrat jinou kategorii
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterDifficulty('all');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Resetovat filtry
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredArticles.map(article => {
              const isFavorite = favorites.includes(article.id);
              
              if (viewMode === 'list') {
                return (
                  <div
                    key={article.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer transform hover:scale-[1.02]"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">
                            {knowledgeCategories.find(cat => cat.id === article.category)?.icon}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {article.title}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(article.id);
                            }}
                            className={`transition-colors ${
                              isFavorite ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
                            }`}
                          >
                            {isFavorite ? '❤️' : '🤍'}
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(article.difficulty)}`}>
                            {getDifficultyLabel(article.difficulty)}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ⏱️ {article.readTime} min • {getReadingTimeEstimate(article.readTime)}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            📅 {article.lastUpdated}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {article.content.summary}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="ml-4 text-blue-600 text-2xl">
                        →
                      </div>
                    </div>
                  </div>
                );
              }

              // Grid view (default)
              return (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden group"
                  data-testid={`article-card-${article.id}`}
                >
                  {/* Article Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(article.id);
                          }}
                          className={`transition-colors ${
                            isFavorite ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
                          }`}
                        >
                          {isFavorite ? '❤️' : '🤍'}
                        </button>
                        <span className="text-xl">
                          {knowledgeCategories.find(cat => cat.id === article.category)?.icon}
                        </span>
                      </div>
                    </div>

                    {/* Difficulty & Read Time */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                        {getDifficultyLabel(article.difficulty)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ⏱️ {article.readTime} min
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        📅 {article.lastUpdated}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                      {article.content.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{article.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all">
                    <div className="flex items-center justify-between text-white">
                      <span className="font-medium">Číst článek</span>
                      <span className="text-lg transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-3">💡 Máte nápad na nový článek?</h3>
          <p className="text-lg mb-4 opacity-90">
            Pomozte rozšířit znalostní bázi o vaše zkušenosti a tipy
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowSuggestModal(true)}
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📝 Navrhnout článek
            </button>
            <button 
              onClick={() => setShowContactModal(true)}
              className="px-6 py-3 bg-indigo-400 text-white rounded-lg font-semibold hover:bg-indigo-300 transition-colors"
            >
              🤝 Kontaktovat autory
            </button>
          </div>
        </div>

        {/* Suggest Article Modal */}
        {showSuggestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Navrhnout nový článek</h3>
                  <button
                    onClick={() => setShowSuggestModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Název článku *
                    </label>
                    <input
                      type="text"
                      required
                      value={suggestionForm.title}
                      onChange={(e) => setSuggestionForm({...suggestionForm, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="např. Správná aplikace keramického waxu"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Kategorie
                      </label>
                      <select
                        value={suggestionForm.category}
                        onChange={(e) => setSuggestionForm({...suggestionForm, category: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
                        {knowledgeCategories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Obtížnost
                      </label>
                      <select
                        value={suggestionForm.difficulty}
                        onChange={(e) => setSuggestionForm({...suggestionForm, difficulty: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="beginner">Začátečník</option>
                        <option value="intermediate">Pokročilý</option>
                        <option value="advanced">Expert</option>
                        <option value="expert">Profesionál</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Popis obsahu *
                    </label>
                    <textarea
                      required
                      value={suggestionForm.description}
                      onChange={(e) => setSuggestionForm({...suggestionForm, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Stručně popište, co by článek měl obsahovat..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Proč by tento článek byl užitečný? *
                    </label>
                    <textarea
                      required
                      value={suggestionForm.reason}
                      onChange={(e) => setSuggestionForm({...suggestionForm, reason: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Jaký problém by řešil nebo jaké znalosti by přinesl..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Váš email (volitelné)
                    </label>
                    <input
                      type="email"
                      value={suggestionForm.contactEmail}
                      onChange={(e) => setSuggestionForm({...suggestionForm, contactEmail: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="pro případné dotazy k návrhu"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowSuggestModal(false)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Zrušit
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Odeslat návrh
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">🤝 Kontaktovat autory</h3>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Jméno *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Typ dotazu
                    </label>
                    <select
                      value={contactForm.inquiryType}
                      onChange={(e) => setContactForm({...contactForm, inquiryType: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="feedback">Zpětná vazba</option>
                      <option value="collaboration">Spolupráce</option>
                      <option value="correction">Oprava článku</option>
                      <option value="question">Technická otázka</option>
                      <option value="other">Jiné</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Předmět *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Stručný popis vašeho dotazu"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Zpráva *
                    </label>
                    <textarea
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Napište nám váš dotaz nebo komentář..."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Zrušit
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Odeslat zprávu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default KnowledgeBase;
