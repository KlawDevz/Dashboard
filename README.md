# Dashboard Système

Tableau de bord haut de gamme pour la supervision du système.

## Fonctionnalités

- Interface moderne avec design SaaS sombre
- Navigation par onglets (Tableau de bord, Contenu, Agents, Tâches, Paramètres)
- Visualisations de données avec Chart.js
- Connexion sécurisée à Supabase
- Déploiement automatisé avec GitHub Actions

## Technologies

- HTML5/CSS3/JavaScript (fichier unique)
- Tailwind CSS (via CDN)
- Chart.js (via CDN)
- Supabase JS SDK (via CDN)
- GitHub Actions pour le déploiement

## Déploiement

Le projet est automatiquement déployé sur GitHub Pages via GitHub Actions à chaque push sur la branche `main`.

## Sécurité

- La clé Supabase est gérée dans l'environnement GitHub Actions
- Permissions restreintes sur la base de données
- RLS (Row Level Security) activé

## Structure du projet

```
├── public/          # Fichiers statiques
├── src/             # Code source (futur développement)
├── docs/            # Documentation
├── tests/           # Tests
├── README.md        # Documentation du projet
└── .github/workflows/ # Workflows CI/CD
```