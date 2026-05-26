
## Project Snapshot

- Angular 21 app using standalone APIs and modern builders in [angular.json](angular.json).
- TypeScript strict mode is enabled in [tsconfig.json](tsconfig.json).
- Unit tests run with Vitest (not Jasmine/Karma) in [package.json](package.json) and [tsconfig.spec.json](tsconfig.spec.json).
- Current routing starts empty in [src/app/app.routes.ts](src/app/app.routes.ts).

## Commands Agents Should Use

- Dev server: `npm start`
- Production build: `npm run build`
- Development watch build: `npm run watch`
- Unit tests: `npm test`

Do not run `ng e2e` unless an e2e target is added first in [angular.json](angular.json).

## Angular Coding Rules

- Keep using standalone components and modern Angular control flow (`@if`, `@for`, `@switch`).
- Do not add `standalone: true` to decorators in Angular v20+.
- Prefer signals for local state and `computed()` for derived values.
- Use `input()` and `output()` APIs instead of decorator-based inputs/outputs.
- Put host bindings/listeners in the `host` field, not `@HostBinding`/`@HostListener`.
- Prefer reactive forms over template-driven forms.
- Prefer class/style bindings instead of `ngClass`/`ngStyle`.
- Use `inject()` for dependency injection.

## Testing Rules

- Write tests that are compatible with Vitest.
- Keep TestBed patterns aligned with standalone component testing.
- Avoid introducing Jasmine/Karma-only globals or helpers.

## UI And Accessibility Rules

- Keep templates simple and avoid heavy logic in HTML.
- Ensure WCAG AA accessibility and keyboard/focus support.
- Use `NgOptimizedImage` for static images where applicable.

## Repo-Specific Pitfalls

- A large starter template lives in [src/app/app.html](src/app/app.html); many visual styles are currently inline there.
- Changes to [src/app/app.css](src/app/app.css) may appear ineffective until styles are moved out of inline template blocks.
- Respect build budgets in [angular.json](angular.json), especially `anyComponentStyle` limits.

## Agent Checklist Before Finishing

- Run `npm run build` after code changes.
- Run `npm test` when behavior or templates are modified.
- Verify no assumptions about existing routes if `routes` remains empty.
