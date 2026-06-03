# Contributing

Proyek ini bersifat **private** dan dikelola oleh tim Mawmaw Interior.

## Development Workflow

### Branch Strategy

- `main` — Production branch, auto-deploy ke Vercel
- `dev` — Development branch
- `feature/*` — Feature branches

### Sebelum Push

Jalankan validasi berikut:

```bash
npm run lint
npm run typecheck
npm run build
```

Pastikan ketiga command di atas berhasil tanpa error.

### Commit Message

Gunakan format [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

feat(services): add interactive tabbed layout
fix(nav): resolve anchor navigation offset
style(hero): adjust responsive padding
refactor(sections): remove SectionWrapper, flatten DOM
docs(readme): rewrite with accurate project info
chore(gitignore): add agent tooling exclusions
```

**Types:** `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `perf`, `test`

### Code Style

- Ikuti konvensi yang sudah ada di codebase
- Gunakan design tokens dari `globals.css`, jangan hardcode warna/spacing
- Komponen UI baru masuk ke `src/components/ui/`
- Komponen section masuk ke `src/components/sections/`
- Server queries masuk ke `src/lib/queries.ts`
- Validasi schema masuk ke `src/lib/validation.ts`

### Environment

- Jangan pernah commit `.env.local` atau file berisi secret
- Update `.env.example` jika menambah environment variable baru
- Pastikan `prisma generate` sudah dijalankan setelah mengubah schema
