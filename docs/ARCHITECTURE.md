# 🏗 Lafontant Learning Platform

# Tecnologías

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Prisma
- Supabase
- PostgreSQL
- Git
- GitHub
- Cursor

---

# Arquitectura

app/
→ Rutas (App Router)

components/
→ Componentes reutilizables

design-system/
→ Tokens y componentes base

lib/
→ Servicios, utilidades y configuración

prisma/
→ Esquema de base de datos

public/
→ Assets

docs/
→ Documentación

---

# Route Groups

(marketing)
(auth)
(student)
(teacher)
(admin)

---

# Roles

- Student
- Teacher
- Admin
- Super Admin

---

# Principios

1. Problems = 0 antes de continuar.
2. Un commit por tarea.
3. No duplicar componentes.
4. Reutilizar el Design System.
5. No modificar más archivos de los necesarios.
6. Arquitectura antes que implementación.
7. Todo cambio importante se documenta.

---

# Flujo de desarrollo

Plan

↓

Task

↓

Cursor

↓

Review

↓

Problems = 0

↓

Commit

↓

Push
