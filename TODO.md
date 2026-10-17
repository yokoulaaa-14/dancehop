# TODO

Les questions encore ouvertes sont ici, avec leur contenu ; une fois tranchées, elles deviennent une décision dans `docs/arbitrage.md`.

## En cours

_(rien)_

## À faire

- [ ] **Compléter `docs/design.md`** : Personnalité, Références, forme retenue d'écriture inclusive.
- [ ] Saisir les 24 cours de Juste Debout School.
- [ ] **Choisir le nom** (une fois un produit utilisable sous les yeux, D42). Shortlist : Dancehop, Studiohop, Bounce. Critères : prononçable sans l'épeler, pas une marque déjà utilisée par un studio parisien, domaine `.fr` ou `.app` libre. Test : dire le nom à deux danseurs et voir s'ils l'épellent du premier coup.
- [ ] **Prendre le domaine**, avant le test terrain. Resend exige un domaine vérifié pour envoyer les liens magiques ; sans lui, SMTP de test Supabase (limité, pas fiable). Le domaine lève aussi la protection « Vercel Authentication » qui bloque les visiteurs sur dancehop.vercel.app (sinon, la désactiver pour la production).
- [ ] **Créer `docs/research.md` avant le test terrain** (D16) : hypothèses, panel (~10 danseurs qui entrent réellement dans un nouveau style, 3 à 4 semaines), métriques instrumentées (comptes créés, onboardings terminés, cours ajoutés par utilisateur, plannings exportés, retours à 4 semaines, formulaire « as-tu testé un cours grâce à ça ? »), seuils de succès et d'arrêt. L'ajouter à la structure de `CLAUDE.md` à ce moment-là.

## Fait

- [x] Style des créneaux Guest et binômes de profs (D37, D38) — 10/10
- [x] Restructurer la documentation (D40) — 16/10
- [x] Remplir Utilisateurs avec D02 ; supprimer le registre des questions du journal (D40 révisé) — 17/10
- [x] Initier le repo GitHub et la stack : repo privé, scaffold Vite + TS + Tailwind + shadcn, Supabase (migrations appliquées, relié au repo), Vercel (https://dancehop.vercel.app), CI — 17/10
