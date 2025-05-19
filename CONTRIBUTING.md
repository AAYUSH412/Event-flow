# Contributing to EventFlow

Thank you for your interest in contributing to EventFlow! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

- Before submitting a bug report, check if the issue has already been reported
- Use the bug report template when creating an issue
- Include detailed steps to reproduce the bug
- Include screenshots if applicable
- Specify your operating system, browser, and any other relevant versions

### Suggesting Features

- Check if the feature has already been suggested or implemented
- Use the feature request template
- Provide a clear and detailed explanation of the feature
- Explain why this feature would be useful to most EventFlow users

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Run the tests to ensure your changes don't break existing functionality
5. Submit a pull request with a clear description of the changes

## Development Setup

### Prerequisites

- Node.js 16.x or higher
- MongoDB 4.4 or higher
- npm or yarn

### Installation

```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/EventFlow.git
cd EventFlow

# Install dependencies for backend
cd backend
npm install

# Install dependencies for frontend
cd ../frontend
npm install

# Create environment variables
# Copy .env.example files in both backend and frontend folders
# and configure with your settings
```

### Running Locally

```bash
# Start the backend server
cd backend
npm run dev

# Start the frontend development server
cd ../frontend
npm run dev
```

## Coding Guidelines

- Follow the existing code style
- Write clean, readable, and maintainable code
- Write tests for your code when applicable
- Document new code with comments when necessary
- Update documentation if needed

## Commit Guidelines

- Use clear and meaningful commit messages
- Reference issue numbers in commit messages when applicable
- Keep commits focused on a single issue or feature

Thank you for contributing to EventFlow!
