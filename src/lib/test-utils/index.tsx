import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/themeContext';
import type { AllTheProviderProps } from '@/types';

// reusable helper
const AllTheProvider: React.FC<AllTheProviderProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProvider, ...options});

export * from '@testing-library/react';
export { customRender as render };

