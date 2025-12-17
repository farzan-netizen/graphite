
## 📋 Prerequisites

- Node.js 18+ 
- pnpm 10.20.0+ (specified in `package.json`)

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **GraphQL**: Apollo Client with GraphQL Code Generator
- **UI Components**: React Aria Components
- **Package Manager**: pnpm

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bettermode-nexus
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (if needed):
```bash
# Create .env file with required variables
# You can copy the content of .env.example
BRAND_FETCH_API_KEY=your_api_key
BRAND_FETCH_BASE_URL=your_base_url
```

4. Generate GraphQL types:
```bash
pnpm codegen
```

## 🚦 Getting Started

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
pnpm build
```

### Start Production Server

Start the production server:

```bash
pnpm start
```

### Linting

Run ESLint to check and fix code issues:

```bash
pnpm lint
```

## 📁 Project Structure

```
bettermode-nexus-signup/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── signup/            # Signup flow pages and components
│   │   ├── wizard/            # Wizard flow pages
│   │   ├── components/         # App-level components
│   │   ├── providers/         # React context providers
│   │   └── server-actions/    # Next.js server actions
│   ├── components/            # Shared components
│   │   ├── base/             # Base UI components
│   │   └── ui/               # UI components
│   ├── constants/            # Application constants
│   ├── generated/            # Auto-generated GraphQL types
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Redux store configuration
│   ├── styles/               # Global styles
│   ├── type/                 # TypeScript type definitions
│   └── utils/                # Utility functions
├── public/                   # Static assets
├── codegen.ts               # GraphQL codegen configuration
├── next.config.mjs          # Next.js configuration
└── tsconfig.json            # TypeScript configuration
```

## 🔧 Configuration

### GraphQL Code Generation

The project uses GraphQL Code Generator to create type-safe GraphQL queries. Configuration is in `codegen.ts`. To regenerate types:

```bash
pnpm codegen
```

### Routing

The application uses Next.js App Router with the following main routes:

- `/` - Redirects to `/signup`
- `/signup` - Main signup flow
- `/wizard` - Wizard flow

Routes are defined in `src/constants/routes.ts`.

## 🎨 Styling

The project uses Tailwind CSS 4 with custom configuration:

- Custom theme variables in `src/styles/theme.css`
- Typography styles in `src/styles/typography.css`
- Global styles in `src/styles/globals.css`

## 📝 Code Style

The project uses:

- **ESLint** for linting (Next.js config with custom rules)
- **Prettier** for code formatting
- **TypeScript** with strict mode enabled

## 🧪 Development Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Use Redux Toolkit for state management
- Leverage React Aria Components for accessible UI
- Generate GraphQL types before using new queries/mutations
