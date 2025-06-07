import { vi, beforeEach, afterEach } from 'vitest';

// Import and define global mocks
export function setUpMocks() {
  vi.mock('~/utilities/csrf', () => ({
    getCSRFToken: vi.fn(() => 'csrf-token'),
  }));

  vi.mock('~/utilities/proxy', () => ({
    baseApiPath: vi.fn(() => 'http://test.example.com'),
  }));
}

// Centralized test setup
export function initializeTests() {
  // Setup global mocks
  setUpMocks();

  // Add any global before/after hooks
  beforeEach(() => {
    vi.clearAllMocks(); // Automatically clear mocks before each test
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restore original implementations after each test
  });

  // Add test utilities (if needed)
  console.debug('Test environment initialized.');
}
