import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../app/App';

// Helper function to create a new QueryClient for each test
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      // Disable retries to make tests run faster and more predictably
      retry: false,
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  const { ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  // Return the client so we can use it in our tests for cleanup
  return { ...result, testQueryClient };
};

describe('App', () => {

  it('should render the main screen with all the required elements', () => {
    const { getByText, getByPlaceholderText } = renderWithClient(<App />);

    expect(getByText('Posts')).toBeTruthy();
    expect(getByPlaceholderText('Filter by userId')).toBeTruthy();
    expect(getByPlaceholderText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Body')).toBeTruthy();
    expect(getByText('Create Post')).toBeTruthy();
  });

  it('should allow a user to type in the filter input', () => {
    const { getByPlaceholderText } = renderWithClient(<App />);
    const filterInput = getByPlaceholderText('Filter by userId');

    fireEvent.changeText(filterInput, '123');

    expect(filterInput.props.value).toBe('123');
  });

  it('should allow a user to type in the new post form fields', () => {
    const { getByPlaceholderText } = renderWithClient(<App />);
    const titleInput = getByPlaceholderText('Title');
    const bodyInput = getByPlaceholderText('Body');

    fireEvent.changeText(titleInput, 'My New Post');
    fireEvent.changeText(bodyInput, 'This is the content of my new post.');

    expect(titleInput.props.value).toBe('My New Post');
    expect(bodyInput.props.value).toBe('This is the content of my new post.');
  });
});