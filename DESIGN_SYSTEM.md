# Design System - Split App

Ce document définit les standards de design HTML/CSS pour maintenir la cohérence visuelle à travers toute l'application.

## 🎨 Palette de Couleurs

### Couleurs Principales

- **Background principal** : `bg-blue-950`
- **Accent primaire** : `amber-400` / `amber-500`
- **Texte clair** : `amber-100` / `amber-200`
- **Texte secondaire** : `amber-200/60`

### Transparences Standards

- Ultra-léger : `/5` (backgrounds subtils)
- Léger : `/10` (borders, backgrounds)
- Moyen : `/20` (focus rings, borders secondaires)
- Semi-fort : `/30` (borders d'erreur)
- Fort : `/40` (borders actives)
- Très fort : `/95` (overlays)

## 📐 Espacements & Structure

### Layout

```html
<div class="min-h-screen bg-blue-950 flex items-center justify-center px-6 py-12">
  <div class="max-w-xl w-full space-y-8 text-center">
    <!-- Contenu centré verticalement et horizontalement -->
  </div>
</div>
```

### Espacements Standards

- Entre sections : `space-y-8`
- Entre éléments d'une section : `space-y-6` ou `space-y-4`
- Entre sous-éléments : `space-y-2` ou `space-y-3`
- Gap dans flex : `gap-2` (mobile) / `gap-3` (desktop)
- Gap dans grid : `gap-4`

### Largeurs Max

- Conteneur principal : `max-w-xl`
- Grilles étendues : `max-w-2xl`

## 🔤 Typographie

### Hiérarchie

```html
<!-- Titre principal -->
<h1 class="text-5xl md:text-6xl font-light text-amber-400">Titre</h1>

<!-- Sous-titre / Description -->
<p class="text-xl text-amber-100 font-light">Description</p>

<!-- Titre de carte -->
<h3 class="text-amber-200 font-medium text-sm">Titre</h3>

<!-- Texte de carte -->
<p class="text-amber-200/60 text-xs font-light">Texte</p>

<!-- Texte d'erreur/info -->
<p class="text-amber-200 text-sm font-light">Message</p>
```

### Règles

- **Font-weight par défaut** : `font-light` (élégance)
- **Font-weight emphase** : `font-medium`
- **Responsive text** : `text-sm sm:text-base` pour les inputs/boutons

## 🎯 Composants Réutilisables

### Carte de Fonctionnalité

```html
<div class="p-4 rounded-xl bg-amber-400/5 border border-amber-400/10 space-y-2">
  <div class="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center">
    <span class="material-symbols-outlined text-amber-400 text-2xl">icon_name</span>
  </div>
  <h3 class="text-amber-200 font-medium text-sm">Titre</h3>
  <p class="text-amber-200/60 text-xs font-light">Description</p>
</div>
```

### Input Standard

```html
<input
  #inputRef
  type="text"
  placeholder="Placeholder..."
  class="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-amber-50 border-2 border-amber-400/40 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-blue-950 placeholder-blue-950/40 text-sm sm:text-base outline-none transition-all"
/>
```

### Bouton Primaire

```html
<button
  (click)="action()"
  class="px-5 py-3 sm:px-8 sm:py-4 bg-amber-500 text-blue-950 text-sm sm:text-base font-medium rounded-xl hover:bg-amber-400 active:scale-95 whitespace-nowrap transition-all"
>
  Action
</button>
```

### Message d'Erreur

```html
@if (condition) {
<div class="p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl">
  <p class="text-amber-200 text-sm font-light">Message d'erreur</p>
</div>
}
```

### Loading Spinner

```html
<div class="flex justify-center py-2">
  <div
    class="animate-spin rounded-full h-8 w-8 border-2 border-amber-400/20 border-t-amber-400"
  ></div>
</div>
```

### Séparateur Décoratif

```html
<div class="h-0.5 w-20 bg-amber-400 opacity-50 mx-auto"></div>
```

## 📱 Responsive Design

### Breakpoints Standards

- Mobile first : classes sans préfixe
- Tablet/Desktop : préfixe `sm:` et `md:`

### Patterns Communs

```html
<!-- Text responsive -->
class="text-sm sm:text-base" class="text-5xl md:text-6xl"

<!-- Padding responsive -->
class="px-4 py-3 sm:px-6 sm:py-4"

<!-- Grid responsive -->
class="grid md:grid-cols-3 gap-4"
```

## Conventions de Style

### Bordures

- Toujours `rounded-xl` pour la cohérence
- `border-2` pour les inputs
- `border` simple pour les cartes

### Transitions

- Ajouter `transition-all` sur les éléments interactifs
- Utiliser `hover:` pour les états de survol
- Utiliser `active:scale-95` pour le feedback tactile
- Utiliser `focus:border-*` et `focus:ring-*` pour les inputs

### Grilles

```html
<!-- 3 colonnes responsive -->
<div class="grid md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
  @for (item of items; track item.id) {
  <!-- Contenu -->
  }
</div>
```

## 📋 Template Patterns

### Structure avec États

```html
<!-- Section avec loading et contenu -->
@if (viewModel.isLoading) {
<!-- Loading state -->
} @else {
<!-- Content -->
}

<!-- Message d'erreur séparé -->
@if (viewModel.isError) {
<!-- Error message -->
}
```

### Boucles

```html
<!-- Toujours utiliser @for avec track -->
@for (item of items; track item.id) {
<!-- Contenu -->
}
```

### Commentaires

- Ajouter des commentaires HTML pour structurer les sections
- Format : `<!-- Nom de Section -->`

## ✨ Principes de Design

1. **Simplicité** : Éviter les div inutiles
2. **Cohérence** : Utiliser les mêmes classes pour les mêmes éléments
3. **Responsive** : Mobile-first avec breakpoints sm/md
4. **Accessibilité** : Utiliser les balises sémantiques appropriées
5. **Élégance** : font-light comme base, espacements généreux
6. **Interactivité** : Transitions fluides avec transition-all

## 🚀 Checklist pour Nouveau Composant

- [ ] Structure centrée avec `min-h-screen` et `flex items-center justify-center`
- [ ] Container `max-w-xl` ou `max-w-2xl` selon le besoin
- [ ] Palette bleu-950 + amber respectée
- [ ] Espacements `space-y-*` cohérents
- [ ] `rounded-xl` sur tous les éléments
- [ ] `font-light` par défaut
- [ ] `transition-all` sur éléments interactifs
- [ ] Commentaires HTML pour structurer
- [ ] `@for` avec `track` pour les boucles
- [ ] Responsive avec `sm:` et `md:`
- [ ] Loading states avec spinner
- [ ] Messages d'erreur avec style cohérent

## 📝 Prompt pour Nouveau Composant

```
Crée le composant [nom] en suivant EXACTEMENT le design system de DESIGN_SYSTEM.md :
- Utilise la palette bleu-950 + amber
- Structure centrée avec min-h-screen
- Composants réutilisables du design system
- Même niveau de propreté et cohérence visuelle que home.component.html
```

---

**Note** : Ce design system est basé sur la page d'accueil (home.component). Toute nouvelle page doit suivre ces standards pour maintenir la cohérence visuelle et la qualité du code.
