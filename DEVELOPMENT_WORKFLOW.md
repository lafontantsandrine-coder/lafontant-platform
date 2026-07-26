# Lafontant Learning Platform

## Official Development Workflow

### 1. Design

The HTML prototype is the official design reference.

Never redesign an approved HTML.

Only convert it into React components.

---

### 2. Component Conversion

Convert HTML into reusable React components.

Requirements:

- TypeScript
- Design System
- Responsive
- No duplicated HTML
- No duplicated styles

No business logic.

---

### 3. Page Assembly

Assemble pages using reusable components.

No duplicated UI.

No authentication logic.

---

### 4. Logic Integration

Implement:

- Supabase
- API calls
- Validation
- State management
- Hooks
- Services

UI must remain unchanged.

---

### 5. Automatic Review

Cursor must verify:

- Problems = 0
- TypeScript
- Uses Design System
- No duplicated HTML
- No duplicated styles
- Scope respected
- Responsive

---

### 6. Technical Review

Every task must be reviewed before Keep.

---

### 7. Keep

Accept changes only after approval.

---

### 8. Commit

One commit per completed task.

Commit messages follow Conventional Commits.

Example:

feat(auth): assemble login page

---

### 9. Push

Push after every successful commit.
