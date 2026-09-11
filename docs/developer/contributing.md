# Contributing

Thank you for your interest in contributing to AI Resource Manager v2!

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies
4. Start development

```bash
git clone https://github.com/your-username/AI-Resource-Manager.git
cd AI-Resource-Manager
npm install
npm run dev
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow the coding standards
- Write tests for new features
- Update documentation

### 3. Test Your Changes

```bash
# Run all tests
npm run test

# Run backend tests
npm run test:backend

# Run frontend tests
npm run test

# Build the application
npm run build
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Coding Standards

### JavaScript/JSX

- Use ES6+ features
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript for new components (if applicable)
- Follow the component pattern in the codebase

### CSS/Tailwind

- Use Tailwind CSS classes
- Follow the design system
- Use CSS variables for theming
- Keep styles consistent

## Architecture Guidelines

### Repository Pattern

- All database access goes through repositories
- Never access SQLite directly from React
- Use the IPC layer for communication

### IPC Pattern

```
Renderer → preload.cjs → ipc.js → IPC Handler → Repository → SQLite
```

### Component Structure

```
src/components/
├── ui/              # shadcn/ui components
├── common/          # Shared components
├── features/        # Feature-specific components
└── layout/          # Layout components
```

## Testing Guidelines

### Unit Tests

- Test repository methods
- Test utility functions
- Test custom hooks

### Component Tests

- Test component rendering
- Test user interactions
- Test error states

### Integration Tests

- Test IPC handlers
- Test end-to-end flows

## Documentation

- Update README.md for new features
- Add comments for complex code
- Update API documentation
- Update user guide

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows coding standards
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] No console errors

### PR Description

- Describe the changes
- Link to related issues
- Include screenshots (if UI changes)
- List breaking changes

## Code Review

### Review Checklist

- [ ] Code quality
- [ ] Test coverage
- [ ] Documentation
- [ ] Performance
- [ ] Security

### Responding to Reviews

- Address feedback promptly
- Make requested changes
- Ask questions if unclear

## Issues

### Bug Reports

Include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- System information

### Feature Requests

Include:

- Problem description
- Proposed solution
- Alternatives considered

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
