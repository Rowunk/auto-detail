import React from 'react';
import { knowledgeCategories } from '../data/knowledgeBase';
import type { KnowledgeArticle, KnowledgeSection, TableData } from '../data/knowledgeBase';

interface ArticleViewerProps {
  article: KnowledgeArticle;
  onBack: () => void;
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, onBack }) => {
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

  const getCategoryInfo = (categoryId: string) => {
    return knowledgeCategories.find(cat => cat.id === categoryId);
  };

  const renderSection = (section: KnowledgeSection, index: number) => {
    const baseClasses = "mb-6";
    switch (section.type) {
      case 'text':
        return (
          <div key={index} className={baseClasses}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {section.content as string}
            </p>
          </div>
        );
      case 'list':
        return (
          <div key={index} className={baseClasses}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {(section.content as string[]).map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">▸</span>
                  <span className="text-gray-700 dark:text-gray-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'steps':
        return (
          <div key={index} className={baseClasses}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <ol className="space-y-3">
              {(section.content as string[]).map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {stepIndex + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-lg pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        );
      case 'warning':
        return (
          <div key={index} className={baseClasses}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              ⚠️ {section.title}
            </h3>
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <p className="text-red-800 dark:text-red-400 text-lg font-medium">
                  {section.content as string}
                </p>
              </div>
            </div>
          </div>
        );
      case 'tip':
        return (
          <div key={index} className={baseClasses}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              💡 {section.title}
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <p className="text-blue-800 dark:text-blue-400 text-lg">
                  {section.content as string}
                </p>
              </div>
            </div>
          </div>
        );
      case 'table':
        const tableData = section.content as TableData;
        return (
          <div key={index} className={baseClasses}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {tableData.headers.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const categoryInfo = getCategoryInfo(article.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-10" data-testid="article-header">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <span className="text-xl mr-2">←</span>
              <span className="font-medium">Zpět na přehled</span>
            </button>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(article.difficulty)}`}>
                {getDifficultyLabel(article.difficulty)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ⏱️ {article.readTime} min čtení
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  {categoryInfo?.icon} {categoryInfo?.name}
                </span>
                <span>📅 Aktualizováno: {article.lastUpdated}</span>
              </div>
            </div>
          </div>
          {/* Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
              📋 Shrnutí článku
            </h2>
            <p className="text-blue-800 dark:text-blue-300 text-lg leading-relaxed">
              {article.content.summary}
            </p>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        {/* Article Sections */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {article.content.sections.map((section, index) => renderSection(section, index))}
        </div>
        {/* Reading Progress & Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-green-600 dark:text-green-400 text-2xl">✓</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Článek dokončen
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Doufáme, že byl užitečný!
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                🖨️ Tisknout
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📚 Další články
              </button>
            </div>
          </div>
        </div>
        {/* Related Articles Suggestions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🔗 Doporučené články
          </h3>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Funkce doporučených článků bude brzy k dispozici</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleViewer;
