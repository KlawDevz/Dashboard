# Sécurité du Dashboard

## Gestion des secrets

### Problème
La clé Supabase est actuellement exposée dans le code frontend. Même s'il s'agit d'une clé anonyme, elle peut être utilisée pour accéder aux données publiques.

### Solutions recommandées

1. **API intermédiaire** (Recommandée)
   - Créer une API backend qui gère les communications avec Supabase
   - La clé reste côté serveur dans les variables d'environnement
   - Le frontend communique uniquement avec cette API

2. **Restriction des permissions**
   - Configurer la clé pour n'avoir accès qu'aux opérations nécessaires
   - Mettre en place des RLS (Row Level Security) stricts
   - Utiliser des vues matérialisées pour limiter l'accès

3. **GitHub Secrets**
   - Utiliser les secrets GitHub pour injecter la clé lors du déploiement
   - Modifier le workflow pour remplacer les placeholders par les vraies valeurs

## Bonnes pratiques de sécurité

### RLS (Row Level Security)
- Activer RLS sur toutes les tables
- Créer des politiques pour limiter l'accès aux données
- Utiliser `auth.uid()` pour les données utilisateur

### Permissions
- Ne donner que les permissions nécessaires
- Utiliser des rôles spécifiques pour l'application
- Auditer régulièrement les permissions

### Monitoring
- Activer les logs de requêtes
- Surveiller les accès anormaux
- Configurer des alertes pour les erreurs répétées

## Configuration recommandée

### Supabase
```sql
-- Activer RLS sur la table agent_logs
alter table agent_logs enable row level security;

-- Créer une politique pour limiter l'accès
create policy "Les utilisateurs peuvent lire les logs"
  on agent_logs for select
  using (true);

-- Limiter les insertions
create policy "Les utilisateurs peuvent insérer des logs"
  on agent_logs for insert
  with check (true);
```

### GitHub Actions
```yaml
# Dans le workflow de déploiement
env:
  SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
```