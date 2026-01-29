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

### Fonts

- **Body** : [Manrope](https://fonts.google.com/specimen/Manrope) - Police arrondie moderne avec un style friendly et très lisible. Parfaite pour le contenu et les interfaces.
- **Headings** : [Sora](https://fonts.google.com/specimen/Sora) - Police géométrique tech avec du caractère. Idéale pour les titres qui se démarquent.

**Poids disponibles :**

- Manrope : 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- Sora : 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)

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

### Boutons - Vue d'Ensemble

**Hiérarchie :**

- **Primaire** : Actions principales (créer, ajouter, valider)
- **Secondaire** : Actions alternatives ou moins prioritaires (annuler, partager, réinitialiser)
- **Icône seul** : Actions contextuelles discrètes (supprimer un item)

**Tailles :**

- **Large** : `px-5 py-3 sm:px-8 sm:py-4` + `text-sm sm:text-base` (actions principales)
- **Medium** : `px-5 py-3` + `text-sm` (boutons de dialog)
- **Small** : `px-3 py-1.5` + `text-xs` (actions discrètes)
- **Icône** : `p-1.5` (boutons icône seuls)

### Bouton Primaire

```html
<!-- Large (par défaut) -->
<button
  (click)="action()"
  class="px-5 py-3 sm:px-8 sm:py-4 bg-amber-500 text-blue-950 text-sm sm:text-base font-medium rounded-xl hover:bg-amber-400 active:scale-95 whitespace-nowrap transition-all"
>
  Action
</button>

<!-- Medium (dialog) -->
<button
  (click)="action()"
  class="px-5 py-3 bg-amber-500 text-blue-950 text-sm font-medium rounded-xl hover:bg-amber-400 active:scale-95 transition-all"
>
  Action
</button>
```

**Usage :** Actions principales, conversions, validations.

### Bouton Secondaire

```html
<!-- Large avec icône -->
<button
  (click)="action()"
  class="px-5 py-3 bg-amber-400/10 text-amber-200 text-sm font-medium rounded-xl hover:bg-amber-400/20 active:scale-95 transition-all flex items-center gap-2 justify-center"
>
  <span class="material-symbols-outlined text-amber-400/60 text-base">icon_name</span>
  <span>Action</span>
</button>

<!-- Medium (dialog) -->
<button
  (click)="action()"
  class="px-5 py-3 bg-amber-400/10 text-amber-200 text-sm font-medium rounded-xl hover:bg-amber-400/20 active:scale-95 transition-all"
>
  Action
</button>

<!-- Small discret avec icône -->
<button
  (click)="action()"
  class="px-3 py-1.5 bg-amber-400/10 text-amber-200 text-xs font-medium rounded-xl hover:bg-amber-400/20 active:scale-95 whitespace-nowrap transition-all flex items-center gap-1.5"
  aria-label="Description"
>
  <span class="material-symbols-outlined text-amber-400 text-sm">icon_name</span>
  Texte
</button>
```

**Usage :** Actions secondaires (annuler, partager, réinitialiser).

- **Large** : Actions importantes mais secondaires
- **Medium** : Boutons de dialog (annuler)
- **Small** : Actions discrètes avec contexte minimal

### Bouton Icône Seul

```html
<button
  (click)="action()"
  class="p-1.5 rounded-lg hover:bg-amber-400/10 active:scale-95 transition-all flex items-center justify-center"
  aria-label="Description de l'action"
>
  <span class="material-symbols-outlined text-amber-400/60 text-base">icon_name</span>
</button>
```

**Usage :** Actions contextuelles dans des listes ou interfaces denses (supprimer, éditer).
**Note :** Seul type de bouton avec `rounded-lg` au lieu de `rounded-xl`.

### Récapitulatif des Boutons

| Type                  | Taille                      | Classes clés                                 | Usage                        |
| --------------------- | --------------------------- | -------------------------------------------- | ---------------------------- |
| **Primaire Large**    | `px-5 py-3 sm:px-8 sm:py-4` | `bg-amber-500 text-blue-950 font-medium`     | Créer, Ajouter (formulaires) |
| **Primaire Medium**   | `px-5 py-3`                 | `bg-amber-500 text-blue-950 font-medium`     | Valider (dialogs)            |
| **Secondaire Large**  | `px-5 py-3`                 | `bg-amber-400/10 text-amber-200 font-medium` | Réinitialiser (avec icône)   |
| **Secondaire Medium** | `px-5 py-3`                 | `bg-amber-400/10 text-amber-200 font-medium` | Annuler (dialogs)            |
| **Secondaire Small**  | `px-3 py-1.5`               | `bg-amber-400/10 text-amber-200 font-medium` | Partager (discret)           |
| **Icône seul**        | `p-1.5`                     | `rounded-lg` (exception)                     | Supprimer dans liste         |

**Conventions communes :**

- Toujours `rounded-xl` (sauf icône seul : `rounded-lg`)
- Toujours `hover:` + `active:scale-95` + `transition-all`
- Utiliser `shrink-0` pour les boutons dans des flex avec inputs
- Utiliser `flex-1` pour les boutons côte-à-côte dans les dialogs
- Toujours un `aria-label` pour les boutons icône seuls

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

### Élément Pliable (Details/Summary)

```html
<details class="p-4 rounded-xl bg-amber-400/5 border border-amber-400/10 text-left">
  <summary class="cursor-pointer space-y-2 list-none">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-amber-400 text-xl">person</span>
        <h3 class="text-amber-200 font-medium text-sm">Titre</h3>
      </div>
      <span class="material-symbols-outlined text-amber-400 text-xl">expand_more</span>
    </div>

    <!-- Stats (optional) -->
    <div class="flex gap-3 text-xs">
      <div class="flex items-center gap-1.5 text-amber-200/60 font-light">
        <span class="material-symbols-outlined text-amber-400/60 text-base">tag</span>
        <span class="text-amber-200 font-medium">12</span>
      </div>
    </div>
  </summary>

  <!-- Contenu pliable -->
  <div class="mt-4 pt-4 border-t border-amber-400/10 space-y-3">
    <!-- Items -->
  </div>
</details>
```

### Élément Pliable Distinctif (Collapse Accentué)

Pour mettre en évidence un élément pliable important (ex: équilibrage, récapitulatif), utiliser des opacités plus élevées :

```html
<details class="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-left">
  <summary class="cursor-pointer space-y-2 list-none">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-amber-400 text-xl">balance</span>
        <h3 class="text-amber-200 font-medium text-sm">Équilibrage</h3>
      </div>
      <span class="material-symbols-outlined text-amber-400 text-xl">expand_more</span>
    </div>

    <!-- Stats avec labels (optional) -->
    <div class="flex gap-3 text-xs">
      <div class="flex items-center gap-1.5 text-amber-200/60 font-light">
        <span class="material-symbols-outlined text-amber-400/60 text-base">functions</span>
        <span class="text-amber-200 font-medium">42€</span>
      </div>
      <div class="flex items-center gap-1.5 text-amber-200/60 font-light">
        <span class="material-symbols-outlined text-amber-400/60 text-base">savings</span>
        <span class="text-amber-200 font-medium">126€</span>
      </div>
    </div>
  </summary>

  <!-- Contenu pliable -->
  <div class="mt-4 pt-4 border-t border-amber-400/10 space-y-3">
    <!-- Items -->
  </div>
</details>
```

**Différences du Collapse Distinctif :**

- `bg-amber-400/10` au lieu de `/5` (plus visible)
- `border-amber-400/20` au lieu de `/10` (bordure plus marquée)

### Item de Liste

```html
<div class="flex items-center justify-between p-3 rounded-xl bg-amber-400/5">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-amber-400/60 text-base">receipt</span>
    <p class="text-amber-200 text-sm font-light">Description</p>
  </div>
  <p class="text-amber-400 text-sm font-medium">Valeur</p>
</div>
```

### Stat avec Icône

```html
<div class="flex items-center gap-1.5 text-amber-200/60 font-light">
  <span class="material-symbols-outlined text-amber-400/60 text-base">icon_name</span>
  <span class="text-amber-200 font-medium">42</span>
</div>
```

### Séparateur Décoratif

```html
<div class="h-0.5 w-20 bg-amber-400 opacity-50 mx-auto"></div>
```

### Message Empty (État Vide)

```html
<div class="p-4 rounded-xl bg-amber-400/5 border border-amber-400/10 text-center">
  <span class="material-symbols-outlined text-amber-400/40 text-3xl">icon_name</span>
  <p class="text-amber-200/60 text-xs font-light mt-2">Message d'état vide</p>
</div>
```

### Dialog Modal (Confirmation/Alerte)

```html
<!-- Bouton d'ouverture -->
<button (click)="dialog.showModal()">Ouvrir</button>

<!-- Dialog -->
<dialog
  #dialog
  class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 bg-blue-950 border border-amber-400/20 rounded-xl p-6 max-w-md w-[calc(100%-2rem)] space-y-6 backdrop:bg-blue-950/95"
>
  <!-- Header -->
  <div class="space-y-3 text-center">
    <div class="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center mx-auto">
      <span class="material-symbols-outlined text-amber-400 text-3xl">warning</span>
    </div>
    <p class="text-amber-200/60 text-sm font-light">Message de confirmation</p>
  </div>

  <!-- Error Message (optional) -->
  @if (viewModel.isError) {
  <div class="p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl">
    <p class="text-amber-200 text-sm font-light">Message d'erreur</p>
  </div>
  }

  <!-- Actions -->
  @if (viewModel.isLoading) {
  <!-- Loading Spinner -->
  <div class="flex justify-center py-2">
    <div
      class="animate-spin rounded-full h-8 w-8 border-2 border-amber-400/20 border-t-amber-400"
    ></div>
  </div>
  } @else {
  <div class="flex gap-3">
    <button
      (click)="dialog.close()"
      class="flex-1 px-5 py-3 bg-amber-400/10 text-amber-200 text-sm font-medium rounded-xl hover:bg-amber-400/20 active:scale-95 transition-all"
    >
      Annuler
    </button>
    <button
      (click)="confirmAction(dialog)"
      class="flex-1 px-5 py-3 bg-amber-500 text-blue-950 text-sm font-medium rounded-xl hover:bg-amber-400 active:scale-95 transition-all"
    >
      Confirmer
    </button>
  </div>
  }
</dialog>
```

**Notes Dialog:**

- Utiliser `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0` pour centrage parfait
- `dialog.showModal()` pour ouvrir, `dialog.close()` pour fermer
- `backdrop:bg-blue-950/95` pour l'overlay semi-transparent
- Border simple (non `border-2`)
- Icône d'avertissement dans un cercle de 16x16
- Bouton secondaire (Annuler) avec `bg-amber-400/10`
- Bouton primaire (Confirmer) avec `bg-amber-500`

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
- Exception: `rounded-lg` pour boutons d'icône seuls (sans texte)
- `border-2` pour les inputs
- `border` simple pour les cartes et dialogs

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

### Structure Racine avec États

```html
<div class="min-h-screen bg-blue-950 flex items-center justify-center px-6 py-12">
  <div class="max-w-xl w-full space-y-8 text-center">
    @if (viewModel.isLoading) {
    <!-- Loading state -->
    <div class="flex justify-center py-2">
      <div
        class="animate-spin rounded-full h-8 w-8 border-2 border-amber-400/20 border-t-amber-400"
      ></div>
    </div>
    } @else if (viewModel.isError) {
    <!-- Error state -->
    <div class="p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl">
      <p class="text-amber-200 text-sm font-light">Message d'erreur</p>
    </div>
    } @else {
    <!-- Content -->
    }
  </div>
</div>
```

### Structure avec États Locaux

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
