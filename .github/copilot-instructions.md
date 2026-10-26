# Copilot Project Instructions

## Role
Generate production-style UI code for an Operations & Analytics Dashboard with a FastAPI backend.

## UI Guardrails
- Prefer clean React + TypeScript components and small reusable building blocks.
- Use Tailwind utility classes for layout and visual consistency.
- Ensure responsive behavior on mobile, tablet, and desktop.
- Support both light and dark mode where practical.
- Include skeleton loaders and empty states for async data views.
- Keep forms validated and user-friendly.

## API Guardrails
- Use Pydantic models for all request/response contracts.
- Prefer deterministic mock fixtures for local prototype data.
- Keep endpoint names explicit and front-end friendly.
- Include basic CORS support for local UI integration.

## Workflow
- When generating features, update both UI and API contract code together.
- Preserve component naming consistency and avoid large monolith components.
- Keep code comments concise and meaningful.
