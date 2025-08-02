// src/components/KnowledgeBase.tsx
import React, { useState, useMemo } from 'react';
import { knowledgeBase, knowledgeCategories, searchArticles, getArticlesByCategory } from '../data/knowledgeBase';
import ArticleViewer from './ArticleViewer';
import type { KnowledgeArticle } from '../data/knowledgeBase';

const KnowledgeBase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    let articles = knowledgeBase;

    // Apply category filter
    if (selectedCategory !== 'all') {
      articles = getArticlesByCategory(selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      articles = searchArticles(searchQuery);
    }

    // Sort by difficulty and then by title
    return articles.sort((a, b) => {
      const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
      const diffA = difficultyOrder[a.difficulty];
      const diffB = difficultyOrder[b.difficulty];
      
      if (diffA !== diffB) return diffA - diffB;
      return a.title.localeCompare(b.title, 'cs-CZ');
    });
  }, [selectedCategory, searchQuery]);

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
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            📚 Detailing Wiki & Know-How
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Kompletní znalostní báze pro profesionální auto detailing
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="🔍 Hledat články, techniky, tipy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
              }`}
            >
              📋 Vše ({knowledgeBase.length})
            </button>
            {knowledgeCategories.map(category => {
              const count = getArticlesByCategory(category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
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
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Žádné články nenalezeny
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Zkuste upravit vyhledávací dotaz nebo vybrat jinou kategorii
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
                data-testid={`article-card-${article.id}`}
              >
                {/* Article Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                    <div className="ml-2">
                      {knowledgeCategories.find(cat => cat.id === article.category)?.icon}
                    </div>
                  </div>

                  {/* Difficulty & Read Time */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
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
                  <div className="flex flex-wrap gap-1">
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
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3">
                  <div className="flex items-center justify-between text-white">
                    <span className="font-medium">Číst článek</span>
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Knowledge Base Stats */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            📊 Statistiky znalostní báze
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {knowledgeBase.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Celkem článků</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {knowledgeCategories.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Kategorií</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {knowledgeBase.reduce((sum, article) => sum + article.readTime, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Minut čtení</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {new Set(knowledgeBase.flatMap(article => article.tags)).size}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Unikátních tagů</div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🚀 Rychlý přístup pro začátečníky
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {knowledgeBase
              .filter(article => article.difficulty === 'beginner')
              .slice(0, 4)
              .map(article => (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
                >
                  {article.title}
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;