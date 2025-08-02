import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleViewer from '../ArticleViewer';
import type { KnowledgeArticle } from '../../data/knowledgeBase';

// Mock window.print
Object.defineProperty(window, 'print', {
  value: jest.fn(),
  writable: true
});

const mockArticle: KnowledgeArticle = {
  id: 'test-article',
  title: 'Test Knowledge Article',
  category: 'basics',
  tags: ['test', 'example', 'demo'],
  difficulty: 'intermediate',
  readTime: 10,
  lastUpdated: '2024-08-02',
  content: {
    summary: 'This is a comprehensive test article to verify the ArticleViewer component functionality.',
    sections: [
      {
        title: 'Introduction',
        type: 'text',
        content: 'This is a text section explaining the basics of the topic.'
      },
      {
        title: 'Key Points',
        type: 'list',
        content: ['First important point', 'Second key aspect', 'Third crucial element']
      },
      {
        title: 'Step by Step Process',
        type: 'steps',
        content: ['Start with preparation', 'Execute the main process', 'Complete with finishing touches']
      },
      {
        title: 'Important Warning',
        type: 'warning',
        content: 'This is a critical safety warning that users must follow.'
      },
      {
        title: 'Pro Tip',
        type: 'tip',
        content: 'Here is a professional tip for better results.'
      },
      {
        title: 'Comparison Table',
        type: 'table',
        content: {
          headers: ['Method', 'Time', 'Cost', 'Quality'],
          rows: [
            ['Basic', '30 min', '100 Kč', 'Good'],
            ['Advanced', '60 min', '200 Kč', 'Excellent'],
            ['Professional', '120 min', '500 Kč', 'Perfect']
          ]
        }
      }
    ]
  }
};

describe('ArticleViewer', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
    (window.print as jest.Mock).mockClear();
  });

  it('renders article title and metadata', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('Test Knowledge Article')).toBeInTheDocument();
    expect(screen.getByText('Pokročilý')).toBeInTheDocument();
    expect(screen.getByText('⏱️ 10 min čtení')).toBeInTheDocument();
    expect(screen.getByText('📅 Aktualizováno: 2024-08-02')).toBeInTheDocument();
  });

  it('displays article summary', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('📋 Shrnutí článku')).toBeInTheDocument();
    expect(screen.getByText(/comprehensive test article/)).toBeInTheDocument();
  });

  it('shows article tags', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('#test')).toBeInTheDocument();
    expect(screen.getByText('#example')).toBeInTheDocument();
    expect(screen.getByText('#demo')).toBeInTheDocument();
  });

  it('renders text sections correctly', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText(/text section explaining the basics/)).toBeInTheDocument();
  });

  it('renders list sections with bullet points', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('Key Points')).toBeInTheDocument();
    expect(screen.getByText('First important point')).toBeInTheDocument();
    expect(screen.getByText('Second key aspect')).toBeInTheDocument();
    expect(screen.getByText('Third crucial element')).toBeInTheDocument();
  });

  it('renders step sections with numbered steps', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('Step by Step Process')).toBeInTheDocument();
    expect(screen.getByText('Start with preparation')).toBeInTheDocument();
    expect(screen.getByText('Execute the main process')).toBeInTheDocument();
    expect(screen.getByText('Complete with finishing touches')).toBeInTheDocument();

    // Check for numbered indicators
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders warning sections with proper styling', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('⚠️ Important Warning')).toBeInTheDocument();
    expect(screen.getByText(/critical safety warning/)).toBeInTheDocument();
  });

  it('renders tip sections with proper styling', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('💡 Pro Tip')).toBeInTheDocument();
    expect(screen.getByText(/professional tip for better results/)).toBeInTheDocument();
  });

  it('renders table sections correctly', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('Comparison Table')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByText('Method')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Cost')).toBeInTheDocument();
    expect(screen.getByText('Quality')).toBeInTheDocument();

    // Check table content
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('100 Kč')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    const backButton = screen.getByText('Zpět na přehled');
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('calls onBack when "další články" button is clicked', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    const moreArticlesButton = screen.getByText('📚 Další články');
    fireEvent.click(moreArticlesButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('calls window.print when print button is clicked', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    const printButton = screen.getByText('🖨️ Tisknout');
    fireEvent.click(printButton);

    expect(window.print).toHaveBeenCalledTimes(1);
  });

  it('displays difficulty badge with correct color', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    const difficultyBadge = screen.getByText('Pokročilý');
    expect(difficultyBadge).toHaveClass('bg-yellow-100');
  });

  it('shows category information', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText(/🎯.*Základy/)).toBeInTheDocument();
  });

  it('displays completion message', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('Článek dokončen')).toBeInTheDocument();
    expect(screen.getByText(/doufáme, že byl užitečný/i)).toBeInTheDocument();
  });

  it('shows related articles section', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    expect(screen.getByText('🔗 Doporučené články')).toBeInTheDocument();
    expect(screen.getByText(/funkce doporučených článků/i)).toBeInTheDocument();
  });

  it('handles beginner difficulty correctly', () => {
    const beginnerArticle = { ...mockArticle, difficulty: 'beginner' as const };
    render(<ArticleViewer article={beginnerArticle} onBack={mockOnBack} />);

    expect(screen.getByText('Začátečník')).toBeInTheDocument();
  });

  it('handles expert difficulty correctly', () => {
    const expertArticle = { ...mockArticle, difficulty: 'expert' as const };
    render(<ArticleViewer article={expertArticle} onBack={mockOnBack} />);

    expect(screen.getByText('Profesionál')).toBeInTheDocument();
  });

  it('has sticky header with navigation', () => {
    render(<ArticleViewer article={mockArticle} onBack={mockOnBack} />);

    const header = screen.getByTestId('article-header');
    expect(header).toHaveClass('sticky');
  });
});
