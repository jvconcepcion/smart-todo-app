import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import TodoApp from '@/components/TodoApp';
import { useTodo } from '@/hooks';

vi.mock('@/hooks/useTodo');

// reusable mock
const mockUseTodo = {
  theme: 'dark',
  toggleTheme: vi.fn(),
  inputRef: { current: null },
  newTask: '',
  setNewTask: vi.fn(),
  filteredTasks: [],
  activeTaskCount: 0,
  filter: 'all',
  setFilter: vi.fn(),
  handleAddTask: vi.fn(e => e.preventDefault()),
  clearCompleted: vi.fn(),
};

const sampleTodo = [
  { id: 1, text: 'First todo', completed: false },
  { id: 2, text: 'Second todo', completed: true },
];

describe('TodoApp Component', () => {
  beforeEach(() => {
    // reset the implementation for useTodo
    vi.mocked(useTodo).mockReturnValue({
      ...mockUseTodo,
      filteredTasks: [],
      newTask: '',
      activeTaskCount: 0,
    });
    // clear prev mock
    vi.clearAllMocks();
  });

  it('should render the heading and an empty state message when no tasks are present', () => {
    render(<TodoApp />);
    
    // check for the new heading text
    expect(screen.getByRole('heading', { name: /smart todo/i })).toBeInTheDocument();
    // check for the new empty state text
    expect(screen.getByText('No todos found...')).toBeInTheDocument();
  });

  it('should call handleAddTask from the hook when a user types and submits a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    // find the input by checking placeholder text
    const inputField = screen.getByPlaceholderText('Add a new todo...');
    
    // user actions
    await user.type(inputField, 'A new todo from test');
    await user.keyboard('{enter}');

    // check if the correct function was called
    expect(mockUseTodo.handleAddTask).toHaveBeenCalled();
  });

    it('should render a list of tasks when they are provided by the hook', () => {
    // override the mock for this test
    vi.mocked(useTodo).mockReturnValue({
      ...mockUseTodo,
      filteredTasks: sampleTodo,
      // number of incomplete todo see useTodo hook
      activeTaskCount: 1,
    });
    render(<TodoApp />);

    // check the list of todos
    expect(screen.getByText('First todo')).toBeInTheDocument();
    expect(screen.getByText('Second todo')).toBeInTheDocument();
    
    // check if empty state message is not visible
    expect(screen.queryByText('No todos found...')).not.toBeInTheDocument();
  });
});

