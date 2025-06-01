Tawk Weather App

A responsive, single-page Vue 3 weather application built with TypeScript, Vite, Vue Router, and the OpenWeatherMap API. It demonstrates best practices in front-end architecture, API integration, accessibility, state management, and user experience.

🌤 Features
•	Search for cities using real-time suggestions (powered by Geo API)
•	View current weather data (temperature, high/low, icon, description)
•	View weather details by city with navigation
•	Save favorite cities and load them on startup
•	Responsive design with mobile-first layout
•	Editable user profile (avatar, name, email, phone)
•	Accessibility-focused (keyboard navigation, semantic elements)

🛠 Technologies
•	Vue 3 + Composition API
•	TypeScript
•	Vite
•	Vue Router
•	VueUse (localStorage, reactive utils)
•	OpenWeatherMap API
•	SCSS Modules + BEM conventions

📁 Folder Structure (Atomic Design)

src/
├── assets/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── icons/
├── composables/
├── pages/
├── router/
├── store/ or state/
├── types/
└── utils/

🔑 API Setup

This project uses the OpenWeatherMap and Geocoding APIs.

Create a .env file at the root:

VITE_WEATHER_API_KEY=your_openweathermap_key

🚀 Getting Started

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Lint the code
pnpm lint

# Run unit tests
pnpm test:unit

# Build for production
pnpm build

✨ Developer Notes
•	State is managed using ref/computed via the Composition API.
•	Saved cities are persisted using VueUse’s useLocalStorage().
•	Form validation is handled manually (no external lib used).
•	Lazy-loading applied for route components.
•	Weather icons are custom SVGs mapped from OpenWeatherMap icon codes.

✅ Accessibility
•	Semantic HTML tags (section, form, button, ul, etc.)
•	ARIA labels used on icons and buttons
•	Fully keyboard-navigable
•	Responsive on all viewports

🧪 Tests
•	Unit tests powered by Vitest

pnpm test:unit

📝 Commit Convention

This project uses Angular-style commit messages:

feat: add weather detail page
fix: correct city icon alignment
chore: update dependencies

📄 License

This project is for assessment purposes only.

⸻

Made with ❤️ for the Tawk.to Interview Challenge.