# AURA Assets

The 59MB of project images (villa, stages, rooms, panoramas, gallery) live in the
**v2 `assets/`** folder at the repository root.

To run this v3 Next.js project locally, either:

```bash
# Option 1 — symlink (recommended, no duplication)
ln -s ../../assets public/aura

# Option 2 — copy
cp -r ../../assets/* public/aura/
```

The `public/aura/` path is referenced by `src/components/sections/*.tsx` files.
