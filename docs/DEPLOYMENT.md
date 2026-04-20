# Déploiement du Dashboard

## Déploiement automatique avec GitHub Actions

Le projet est configuré pour un déploiement automatique sur GitHub Pages à chaque push sur la branche `main`.

### Workflow

1. **Push sur `main`** : Déclenche le workflow de déploiement
2. **Checkout** : Récupération du code source
3. **Build** : Préparation des fichiers pour le déploiement
4. **Deploy** : Publication sur la branche `gh-pages`

### Configuration requise

- Repository GitHub avec les permissions appropriées
- GitHub Pages activé dans les paramètres du repository
- Branche de déploiement : `gh-pages`
- Répertoire de déploiement : `/ (root)`

## Configuration de GitHub Pages

1. Allez dans **Settings** > **Pages**
2. Sélectionnez **Deploy from a branch**
3. Choisissez la branche **gh-pages**
4. Sélectionnez le répertoire **/(root)**
5. Cliquez sur **Save**

## Variables d'environnement

Pour une configuration sécurisée, utilisez les GitHub Secrets :

### Secrets requis
- `SUPABASE_URL` : URL de votre projet Supabase
- `SUPABASE_ANON_KEY` : Clé anonyme de votre projet Supabase

### Ajout des secrets
1. Allez dans **Settings** > **Secrets and variables** > **Actions**
2. Cliquez sur **New repository secret**
3. Ajoutez chaque secret avec son nom et sa valeur

## Déploiement manuel (optionnel)

Si vous souhaitez déployer manuellement :

```bash
# Cloner le repository
git clone git@github.com:KlawDevz/Dashboard.git
cd Dashboard

# Installer les dépendances
npm install -g http-server

# Construire le projet
mkdir -p dist
cp -r public/* dist/

# Servir localement
http-server dist
```

## Monitoring du déploiement

Le workflow de déploiement peut être surveillé dans l'onglet **Actions** du repository.

### États possibles
- 🟢 **Success** : Déploiement réussi
- 🔴 **Failure** : Erreur lors du déploiement
- 🟡 **Pending** : Déploiement en cours

## URLs de déploiement

- **Production** : `https://KlawDevz.github.io/Dashboard/`
- **Preview** : Disponible dans les PR (si configuré)