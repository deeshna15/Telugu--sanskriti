# Overview

Telugu Sanskriti is a cultural awareness web application designed to preserve and promote Telugu language and culture. The application serves as an interactive platform where users can explore Telugu literature, folk stories, participate in quizzes and riddles, learn the language through structured content, and connect with the global Telugu community. Built as a full-stack application, it combines educational content with community features to create an engaging cultural learning experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React and TypeScript, utilizing a component-based architecture with shadcn/ui for consistent design patterns. The application uses Wouter for client-side routing and TanStack Query for server state management. The UI follows a tabbed navigation pattern with sections for About, Literature & Arts, Community, Learning, Interactive content, and Folk Stories.

The styling system combines Tailwind CSS with CSS variables for theming, supporting both light themes with warm color palettes inspired by Telugu cultural aesthetics. Components are organized in a modular structure with reusable UI components, page-specific components, and shared utilities.

## Backend Architecture
The server is built with Express.js and TypeScript, following a RESTful API design. The application uses a layered architecture with clear separation between routes, storage logic, and business rules. The server implements middleware for request logging, JSON parsing, and error handling.

The storage layer is abstracted through an interface-based design, currently implemented with an in-memory storage system but designed to easily support database integration. API endpoints are organized by resource type (quizzes, stories, riddles, proverbs) with support for filtering by categories and difficulty levels.

## Data Storage Solutions
The application currently uses an in-memory storage implementation for development, with plans for PostgreSQL integration using Drizzle ORM. The database schema defines tables for users, quizzes, stories, riddles, proverbs, and learning content, with support for bilingual content (English and Telugu).

The schema supports hierarchical content organization with categories, difficulty levels, and metadata for educational progression tracking. Content includes both English and Telugu text fields to support bilingual learning experiences.

## Authentication and Authorization
The current implementation includes basic user schema with username/password authentication, though the authentication middleware is not yet fully implemented. The system is designed to support session-based authentication for future user-specific features like progress tracking and personalized content.

## Development and Build Architecture
The application uses Vite for frontend development and building, with hot module replacement in development mode. The build process compiles both frontend assets and backend TypeScript code, with separate output directories for client and server bundles.

The development setup includes TypeScript compilation, ESLint configuration, and path aliases for clean imports. The application supports both development and production environments with appropriate optimization settings.

# External Dependencies

## UI and Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives for building the component library
- **Tailwind CSS**: Utility-first CSS framework for styling with custom color schemes and responsive design
- **Lucide React**: Icon library providing consistent iconography throughout the application
- **shadcn/ui**: Pre-built component system combining Radix UI with Tailwind CSS for rapid development

## State Management and Data Fetching
- **TanStack Query**: Server state management for caching, synchronization, and background updates of API data
- **React Hook Form**: Form state management with validation support
- **Wouter**: Lightweight client-side routing library for navigation

## Backend Framework and Utilities
- **Express.js**: Web server framework for building RESTful APIs
- **Drizzle ORM**: TypeScript-first ORM for database operations with PostgreSQL support
- **Drizzle Kit**: Database migration and schema management tools

## Development Tools
- **Vite**: Build tool and development server with fast hot module replacement
- **TypeScript**: Type safety across both frontend and backend code
- **esbuild**: Fast JavaScript bundler for production builds

## Database and Storage
- **Neon Database**: Serverless PostgreSQL database service for data persistence
- **PostgreSQL**: Relational database for storing application data with support for complex queries and relationships

## Fonts and Typography
- **Google Fonts**: Web fonts including Inter for UI text, Noto Sans Telugu for Telugu content, and Fira Code for monospace text

## Replit Integration
- **Replit Development Tools**: Banner scripts and development environment integration for cloud-based development