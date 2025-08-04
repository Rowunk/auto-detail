import React, { useMemo } from 'react';
import { knowledgeCategories } from '../data/knowledgeBase';
import type { KnowledgeArticle, KnowledgeSection, TableData } from '../data/knowledgeBase';

interface ArticleViewerProps {
  article: KnowledgeArticle;
  onBack: () => void;
}

// Configuration constants
const DIFFICULTY_CONFIG = {
  beginner: {
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    label: 'Začátečník'
  },
  intermediate: {
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    label: 'Pokročilý'
  },
  advanced: {
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    label: 'Expert'
  },
  expert: {
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    label: 'Profesionál'
  }
} as const;

const DEFAULT_DIFFICULTY = {
  color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
  label: 'Neznámá'
};

const DEFAULT_CATEGORY = {
  name: 'Neznámá kategorie',
  icon: '❓'
};

const ArticleViewer: React.FC<ArticleViewerProps> = ({ article, onBack }) => {
  // Input validation
  if (!article || !article.content || !article.content.sections) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <span className="text-4xl mb-4 block">⚠️</span>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Článek není dostupný
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Obsah článku se nepodařilo načíst nebo je poškozený.
          </p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Zpět na přehled článků"
          >
            Zpět na přehled
          </button>
        </div>
      </div>
    );
  }

  // Memoized computations
  const articleMetadata = useMemo(() => {
    const categoryInfo = knowledgeCategories.find(cat => cat.id === article.category) || DEFAULT_CATEGORY;
    const difficultyInfo = DIFFICULTY_CONFIG[article.difficulty as keyof typeof DIFFICULTY_CONFIG] || DEFAULT_DIFFICULTY;
    
    return {
      categoryInfo,
      difficultyColor: difficultyInfo.color,
      difficultyLabel: difficultyInfo.label
    };
  }, [article.category, article.difficulty]);

  // Simple content validation helper
  const validateContent = (content: unknown): string => {
    if (typeof content === 'string') {
      return content;
    }
    return String(content || '');
  };

  // Handle print functionality
  const handlePrint = () => {
    try {
      window.print();
    } catch (error) {
      console.warn('Print functionality not available:', error);
    }
  };

  // Section renderers
  const renderSection = (section: KnowledgeSection, index: number) => {
    if (!section || !section.type || !section.title) {
      return null;
    }

    const baseClasses = "mb-6";
    const sectionId = `section-${index}`;

    switch (section.type) {
      case 'text':
        return (
          <div key={index} className={baseClasses} id={sectionId}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {validateContent(section.content)}
            </p>
          </div>
        );

      case 'list':
        const listItems = Array.isArray(section.content) ? section.content : [];
        return (
          <div key={index} className={baseClasses} id={sectionId}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2" role="list">
              {listItems.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1" aria-hidden="true">▸</span>
                  <span className="text-gray-700 dark:text-gray-300 text-lg">
                    {validateContent(item)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'steps':
        const stepItems = Array.isArray(section.content) ? section.content : [];
        return (
          <div key={index} className={baseClasses} id={sectionId}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <ol className="space-y-3" role="list">
              {stepItems.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start">
                  <span 
                    className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3"
                    aria-label={`Krok ${stepIndex + 1}`}
                  >
                    {stepIndex + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-lg pt-1">
                    {validateContent(step)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        );

      case 'warning':
        return (
          <div key={index} className={baseClasses} id={sectionId}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              ⚠️ {section.title}
            </h3>
            <div 
              className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg"
              role="alert"
              aria-labelledby={`warning-${index}`}
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3" aria-hidden="true">⚠️</span>
                <p 
                  id={`warning-${index}`}
                  className="text-red-800 dark:text-red-400 text-lg font-medium"
                >
                  {validateContent(section.content)}
                </p>
              </div>
            </div>
          </div>
        );

      case 'tip':
        return (
          <div key={index} className={baseClasses} id={sectionId}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              💡 {section.title}
            </h3>
            <div 
              className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg"
              role="complementary"
              aria-labelledby={`tip-${index}`}
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3" aria-hidden="true">💡</span>
                <p 
                  id={`tip-${index}`}
                  className="text-blue-800 dark:text-blue-400 text-lg"
                >
                  {validateContent(section.content)}
                </p>
              </div>
            </div>
          </div>
        );

      case 'table':
        const tableData = section.content as TableData;
        if (!tableData || !tableData.headers || !tableData.rows) {
          return null;
        }

        return (
          <div key={index} className={baseClasses} id={sectionId}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h3>
            <div className="overflow-x-auto">
              <table 
                className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                role="table"
                aria-label={section.title}
              >
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {tableData.headers.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600"
                        scope="col"
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
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700" data-testid="article-header">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Zpět na přehled článků"
            >
              <span className="text-lg mr-2" aria-hidden="true">←</span>
              <span className="font-medium text-sm">Zpět na přehled</span>
            </button>

            <div className="flex items-center gap-3">
              <span 
                className={`px-2 py-1 rounded-full text-xs font-medium ${articleMetadata.difficultyColor}`}
                aria-label={`Obtížnost: ${articleMetadata.difficultyLabel}`}
              >
                {articleMetadata.difficultyLabel}
              </span>
              <span 
                className="text-xs text-gray-500 dark:text-gray-400"
                aria-label={`Doba čtení: ${article.readTime} minut`}
              >
                ⏱️ {article.readTime} min
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <header className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">{articleMetadata.categoryInfo.icon}</span>
                  <span>{articleMetadata.categoryInfo.name}</span>
                </span>
                <span>
                  <span aria-hidden="true">📅</span>
                  <span className="sr-only">Aktualizováno: </span>
                  {article.lastUpdated}
                </span>
              </div>
            </div>
          </header>

          {/* Summary */}
          {article.content.summary && (
            <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
                <span aria-hidden="true">📋</span> Shrnutí článku
              </h2>
              <p className="text-blue-800 dark:text-blue-300 text-lg leading-relaxed">
                {article.content.summary}
              </p>
            </section>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2" role="list" aria-label="Štítky článku">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                  role="listitem"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Article Sections */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8" aria-label="Obsah článku">
          {article.content.sections.map((section, index) => renderSection(section, index))}
        </section>

        {/* Reading Progress & Actions */}
        <footer className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-green-600 dark:text-green-400 text-2xl" aria-hidden="true">✓</span>
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
                onClick={handlePrint}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Vytisknout článek"
              >
                <span aria-hidden="true">🖨️</span> Tisknout
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Zobrazit další články"
              >
                <span aria-hidden="true">📚</span> Další články
              </button>
            </div>
          </div>
        </footer>

        {/* Related Articles Suggestions */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            <span aria-hidden="true">🔗</span> Doporučené články
          </h3>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Funkce doporučených článků bude brzy k dispozici</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArticleViewer;