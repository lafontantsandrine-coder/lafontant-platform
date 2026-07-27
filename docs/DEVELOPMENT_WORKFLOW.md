# Development Workflow

## Rule #1

One task at a time.

Never start a new task until the current one is finished.

Problems must be 0 before continuing.

---

## 1. Planning

Define the objective.

Review the architecture.

Break the work into a small task.

---

## 2. Design

The approved HTML is the single source of truth.

Never redesign approved screens.

Only convert them into React components.

---

## 3. Component Development

Convert HTML into reusable React components.

Requirements:

- TypeScript
- Responsive
- Design System
- No duplicated components
- No duplicated styles

No business logic.

---

## 4. Page Assembly

Assemble pages using reusable components.

No duplicated UI.

---

## 5. Logic Integration

Implement:

- Authentication
- API calls
- Database
- Validation
- Hooks
- State Management

UI must remain unchanged.

---

## 6. Review

Verify:

- Problems = 0
- TypeScript
- Scope respected
- Responsive
- Design System used
- No duplicated code

---

## 7. Git

One commit per completed task.

Use Conventional Commits.

Example:

feat(auth): build login page

---

## 8. Push

Push after every successful commit.
