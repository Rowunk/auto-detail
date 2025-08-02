import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TemplateManager from '../TemplateManager';

// Mock the hook
const mockSetTemplates = jest.fn();
const mockUseLocalStorageState = jest.fn(() => [[], mockSetTemplates]);

jest.mock('../../hooks/useLocalStorageState', () => ({
  useLocalStorageState: jest.fn(() => mockUseLocalStorageState())
}));

// Mock service database
jest.mock('../../services/serviceDatabase', () => ({
  serviceDatabase: {
    'service-1': { name: 'Service 1' },
    'service-2': { name: 'Service 2' },
    'service-3': { name: 'Service 3' }
  }
}));

describe('TemplateManager', () => {
  const mockProps = {
    onApply: jest.fn(),
    onClose: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocalStorageState.mockReturnValue([[], mockSetTemplates]);
  });

  it('renders the template manager interface', () => {
    render(<TemplateManager {...mockProps} />);
    
    expect(screen.getByText('Šablony služeb')).toBeInTheDocument();
    expect(screen.getByText('+ Nová šablona')).toBeInTheDocument();
    expect(screen.getByText('Žádné šablony')).toBeInTheDocument();
  });

  it('shows existing templates', () => {
    const templates = [
      { id: '1', name: 'Template 1', services: ['service-1', 'service-2'] },
      { id: '2', name: 'Template 2', services: ['service-3'] }
    ];
    
    mockUseLocalStorageState.mockReturnValue([templates, mockSetTemplates]);
    
    render(<TemplateManager {...mockProps} />);
    
    expect(screen.getByText('Template 1')).toBeInTheDocument();
    expect(screen.getByText('Template 2')).toBeInTheDocument();
    expect(screen.queryByText('Žádné šablony')).not.toBeInTheDocument();
  });

  it('applies a template when apply button is clicked', () => {
    const templates = [
      { id: '1', name: 'Template 1', services: ['service-1', 'service-2'] }
    ];
    
    mockUseLocalStorageState.mockReturnValue([templates, mockSetTemplates]);
    
    render(<TemplateManager {...mockProps} />);
    
    fireEvent.click(screen.getByText('Aplikovat'));
    
    expect(mockProps.onApply).toHaveBeenCalledWith(['service-1', 'service-2']);
  });

  it('deletes a template when delete button is clicked', () => {
    const templates = [
      { id: '1', name: 'Template 1', services: ['service-1'] },
      { id: '2', name: 'Template 2', services: ['service-2'] }
    ];
    
    mockUseLocalStorageState.mockReturnValue([templates, mockSetTemplates]);
    
    render(<TemplateManager {...mockProps} />);
    
    const deleteButtons = screen.getAllByText('Smazat');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockSetTemplates).toHaveBeenCalledWith([
      { id: '2', name: 'Template 2', services: ['service-2'] }
    ]);
  });

  it('opens new template form when new button is clicked', () => {
    render(<TemplateManager {...mockProps} />);
    
    fireEvent.click(screen.getByText('+ Nová šablona'));
    
    expect(screen.getByText('Nová šablona')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Název šablony')).toBeInTheDocument();
  });

  it('opens edit form when edit button is clicked', () => {
    const templates = [
      { id: '1', name: 'Template 1', services: ['service-1'] }
    ];
    
    mockUseLocalStorageState.mockReturnValue([templates, mockSetTemplates]);
    
    render(<TemplateManager {...mockProps} />);
    
    fireEvent.click(screen.getByText('Upravit'));
    
    expect(screen.getByText('Upravit šablona')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Template 1')).toBeInTheDocument();
  });

  it('creates new template when save is clicked', async () => {
    render(<TemplateManager {...mockProps} />);
    
    // Open new template form
    fireEvent.click(screen.getByText('+ Nová šablona'));
    
    // Fill in template name
    const nameInput = screen.getByPlaceholderText('Název šablony');
    await userEvent.type(nameInput, 'New Template');
    
    // Select a service
    const serviceCheckbox = screen.getByRole('checkbox', { name: /service 1/i });
    fireEvent.click(serviceCheckbox);
    
    // Save template
    fireEvent.click(screen.getByText('Uložit'));
    
    expect(mockSetTemplates).toHaveBeenCalledWith([
      expect.objectContaining({
        name: 'New Template',
        services: ['service-1']
      })
    ]);
  });

  it('updates existing template when save is clicked', async () => {
    const templates = [
      { id: '1', name: 'Template 1', services: ['service-1'] }
    ];
    
    mockUseLocalStorageState.mockReturnValue([templates, mockSetTemplates]);
    
    render(<TemplateManager {...mockProps} />);
    
    // Edit existing template
    fireEvent.click(screen.getByText('Upravit'));
    
    // Update name
    const nameInput = screen.getByDisplayValue('Template 1');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Template');
    
    // Save
    fireEvent.click(screen.getByText('Uložit'));
    
    expect(mockSetTemplates).toHaveBeenCalledWith([
      { id: '1', name: 'Updated Template', services: ['service-1'] }
    ]);
  });

  it('closes when close button is clicked', () => {
    render(<TemplateManager {...mockProps} />);
    
    fireEvent.click(screen.getByText('Zavřít'));
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when X button is clicked', () => {
    render(<TemplateManager {...mockProps} />);
    
    fireEvent.click(screen.getByText('✕'));
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('toggles service selection in template form', () => {
    render(<TemplateManager {...mockProps} />);
    
    // Open new template form
    fireEvent.click(screen.getByText('+ Nová šablona'));
    
    // Select and unselect service
    const serviceCheckbox = screen.getByRole('checkbox', { name: /service 1/i });
    
    expect(serviceCheckbox).not.toBeChecked();
    fireEvent.click(serviceCheckbox);
    expect(serviceCheckbox).toBeChecked();
    fireEvent.click(serviceCheckbox);
    expect(serviceCheckbox).not.toBeChecked();
  });
});