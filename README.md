<div align="center">

# [Sugar Labs](https://www.sugarlabs.org/)

**Empowering children worldwide through free educational software**

[![Website](https://img.shields.io/badge/Website-www.sugarlabs.org-blue)](https://www.sugarlabs.org/)
[![License](https://img.shields.io/badge/License-GPL%20v3-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)

</div>

## About

Sugar Labs is a non-profit organization dedicated to creating free educational software for children. Our website serves as the central hub for our community, showcasing our mission, software products, and providing resources for users and developers worldwide.

### Our Mission

- **Empower children** through free, open-source educational software
- **Promote learning** with tools like Sugar, Sugarizer, and Music Blocks
- **Build community** around educational technology and child development
- **Advocate** for free software in education

## Tech Stack

This website is built as a modern, performant single-page application using cutting-edge web technologies.

### Core Technologies

- **React 19.1** - Modern UI library with latest features
- **TypeScript 5.9** - Type-safe JavaScript development
- **Vite 7.1** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework

### Key Libraries & Tools

- **React Router DOM 7.8** - Client-side routing
- **Framer Motion 12.23** - Smooth animations and transitions
- **Lucide React 0.543** - Beautiful icon library
- **React Markdown 10.1** - Markdown rendering with syntax highlighting
- **Axios 1.11** - HTTP client for API requests
- **DOMPurify 3.2** - XSS protection for content sanitization

### Development Tools

- **ESLint 9.35** - Code linting and quality assurance
- **Prettier 3.6** - Code formatting
- **TypeScript ESLint 8.43** - TypeScript-specific linting rules
- **Markdownlint 0.38** - Markdown file linting
- **Gh-pages 6.3** - GitHub Pages deployment

### Build & Performance

- **Vite** with optimized chunk splitting for better performance
- **Manual chunking** for vendor libraries and markdown content
- **Path aliases** (`@/`) for clean imports
- **TypeScript** strict mode for type safety

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/sugarlabs/www-v2.git
cd www-v2

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run deploy       # Deploy to GitHub Pages
```

## Contributing

We welcome contributions from the community! Content about Sugar, Sugarizer, or Music Blocks is **far more important** than the site's style or appearance.

### How to Contribute

1. **Be a user or developer** of Sugar Labs software (Sugar, Sugarizer, or Music Blocks)
2. **Prioritize content** over design changes
3. **Follow our guidelines** in the [Contribution Guide](docs/CONTRIBUTING.md)
4. **Check the [Developer Guide](docs/dev_guide.md)** for technical setup

### Development Guidelines

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Test your changes locally before submitting
- Ensure responsive design for all screen sizes
- Maintain accessibility standards

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components and routing
├── constants/          # Static data and configuration
├── styles/             # Global styles and animations
├── utils/              # Utility functions and helpers
└── lib/                # Shared libraries and utilities
```

## License

This project is licensed under the GPL v3 License - see the [LICENSE](LICENSE) file for details.

## Links

- **Website**: [www.sugarlabs.org](https://www.sugarlabs.org/)
- **Documentation**: [docs/](docs/)
- **Contributing**: [CONTRIBUTING.md](docs/CONTRIBUTING.md)
- **Developer Guide**: [dev_guide.md](docs/dev_guide.md)
