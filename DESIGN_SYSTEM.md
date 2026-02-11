# Design System - Split App

## 🎨 Palette

### Couleurs

- Background : `bg-blue-950`
- Accent : `amber-400` / `amber-500`
- Texte principal : `amber-200`
- Texte secondaire : `amber-200/60`

### Transparences

- `/5` : backgrounds subtils
- `/10` : borders, backgrounds légers
- `/20` : focus rings, borders secondaires
- `/30` : borders d'erreur
- `/40` : borders actives
- `/95` : overlays

## 📐 Layout

```html
<div class="min-h-screen bg-blue-950 flex items-center justify-center px-6 py-12">
  <div class="max-w-xl w-full space-y-8 text-center">
    <!-- Contenu -->
  </div>
</div>
```

**Espacements** : `space-y-8` (sections) • `space-y-4` (éléments) • `space-y-2|3` (sous-éléments) • `gap-2|3` (flex)

## 🔤 Typographie

```html
<!-- Titre principal -->
<h1 class="text-5xl md:text-6xl font-light text-amber-400">Titre</h1>

<!-- Sous-titre -->
<p class="text-xl text-amber-100 font-light">Description</p>

<!-- Titre section -->
<h3 class="text-amber-200 font-medium text-sm">Titre</h3>

<!-- Titre dialog -->
<h2 class="text-amber-200 font-medium text-lg">Titre</h2>

<!-- Texte secondaire -->
<p class="text-amber-200/60 text-xs font-light">Texte</p>
```

## 🎯 Composants

### Input

```html
<!-- Input dans flex (avec bouton) -->
<input
  type="text"
  placeholder="Placeholder..."
  class="min-w-0 flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-amber-50 border-2 border-amber-400/40 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-blue-950 placeholder-blue-950/40 text-sm sm:text-base outline-none transition-all"
/>

<!-- Input seul (pleine largeur) -->
<input
  type="text"
  placeholder="Placeholder..."
  class="w-full px-4 py-3 sm:px-6 sm:py-4 bg-amber-50 border-2 border-amber-400/40 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-blue-950 placeholder-blue-950/40 text-sm sm:text-base outline-none transition-all"
/>
```

**Règle** : `min-w-0 flex-1` dans flex, `w-full` sinon.

### Boutons

```html
<!-- Primaire (actions principales) -->
<button
  class="px-5 py-3 sm:px-8 sm:py-4 bg-amber-500 text-blue-950 text-sm sm:text-base font-medium rounded-xl hover:bg-amber-400 active:scale-95 whitespace-nowrap transition-all"
>
  Action
</button>

<!-- Secondaire (annuler, réinitialiser) -->
<button
  class="px-5 py-3 bg-amber-400/10 text-amber-200 text-sm font-medium rounded-xl hover:bg-amber-400/20 active:scale-95 whitespace-nowrap transition-all"
>
  Annuler
</button>

<!-- Icône seul (actions contextuelles) -->
<button
  class="p-1.5 rounded-lg hover:bg-amber-400/10 active:scale-95 transition-all flex items-center justify-center"
  aria-label="Description"
>
  <span class="material-symbols-outlined text-amber-400/60 text-base">icon</span>
</button>
```

**Règles** : `whitespace-nowrap` obligatoire (sauf icône) • `rounded-lg` pour icône, `rounded-xl` sinon • Variant sizing : `shrink-0` (formulaire), `flex-1` (dialog), `w-full` (fermeture)

### Messages

```html
<!-- Erreur -->
<div class="p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl">
  <p class="text-amber-200 text-sm font-light">Message d'erreur</p>
</div>

<!-- État vide -->
<div class="p-4 rounded-xl bg-amber-400/5 border border-amber-400/10 text-center">
  <span class="material-symbols-outlined text-amber-400/40 text-3xl">icon</span>
  <p class="text-amber-200/60 text-xs font-light mt-2">Message</p>
</div>

<!-- Loading -->
<div class="flex justify-center py-2">
  <div
    class="animate-spin rounded-full h-8 w-8 border-2 border-amber-400/20 border-t-amber-400"
  ></div>
</div>
```

### Cartes

```html
<!-- Non-interactive (features, informations) -->
<div class="p-3 space-y-1.5">
  <div class="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center mx-auto">
    <span class="material-symbols-outlined text-amber-400 text-xl">icon</span>
  </div>
  <h3 class="text-amber-200 font-medium text-sm">Titre</h3>
  <p class="text-amber-200/60 text-xs font-light">Description</p>
</div>

<!-- Interactive (liste cliquable) -->
<div
  (click)="action()"
  class="flex items-center justify-between p-3 rounded-xl bg-amber-400/5 border border-amber-400/10 cursor-pointer hover:bg-amber-400/10 hover:border-amber-400/20 transition-all"
>
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-amber-400/60 text-base">icon</span>
    <p class="text-amber-200 text-sm font-light">Nom</p>
  </div>
  <span class="material-symbols-outlined text-amber-400/60 text-base">arrow_forward</span>
</div>

<!-- Item de liste -->
<div class="flex items-center justify-between p-3 rounded-xl bg-amber-400/5">
  <div class="flex items-center gap-2">
    <span class="material-symbols-outlined text-amber-400/60 text-base">icon</span>
    <p class="text-amber-200 text-sm font-light">Description</p>
  </div>
  <p class="text-amber-400 text-sm font-medium">Valeur</p>
</div>
```

### Details

```html
<!-- Standard (informations) -->
<details class="p-4 rounded-xl bg-amber-400/5 border border-amber-400/10 text-left">
  <summary class="cursor-pointer space-y-2 list-none">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-amber-400 text-xl">icon</span>
        <h3 class="text-amber-200 font-medium text-sm">Titre</h3>
      </div>
      <span class="material-symbols-outlined text-amber-400 text-xl">expand_more</span>
    </div>
  </summary>
  <div class="mt-4 pt-4 border-t border-amber-400/10 space-y-3">
    <!-- Contenu -->
  </div>
</details>

<!-- Variante distinctive (sections importantes) -->
<details class="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-left">
  <!-- même structure -->
</details>

<!-- Formulaire imbriqué -->
<details class="p-4 rounded-xl bg-amber-400/5 border border-amber-400/10">
  <summary class="cursor-pointer space-y-2 list-none">
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-amber-400/60 text-base">add_circle</span>
      <p class="text-amber-200/60 text-xs font-light">Ajouter</p>
    </div>
  </summary>
  <div class="mt-3 pt-3 border-t border-amber-400/10 space-y-3">
    <!-- Formulaire -->
  </div>
</details>
```

**Règle** : Chevron `expand_more` pour informations consultables, pas de chevron pour formulaires d'action.

### Dialog

```html
<dialog
  #dialog
  class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 bg-blue-950 border border-amber-400/20 rounded-xl p-6 max-w-md w-[calc(100%-2rem)] space-y-6 backdrop:bg-blue-950/95"
>
  <!-- Header -->
  <div class="space-y-3 text-center">
    <div class="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center mx-auto">
      <span class="material-symbols-outlined text-amber-400 text-3xl">icon</span>
    </div>
    <h2 class="text-amber-200 font-medium text-lg">Titre</h2>
    <p class="text-amber-200/60 text-sm font-light">Message</p>
  </div>

  <!-- Erreur (optionnel) -->
  @if (viewModel.isError) {
  <div class="p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl">
    <p class="text-amber-200 text-sm font-light">{{ viewModel.error }}</p>
  </div>
  }

  <!-- Actions -->
  @if (viewModel.isLoading) {
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

## 📱 Responsive

**Mobile first** : sans préfixe • Desktop : `sm:` (640px+), `md:` (768px+)

```html
<!-- Texte -->
class="text-sm sm:text-base" class="text-5xl md:text-6xl"

<!-- Spacing -->
class="px-4 py-3 sm:px-6 sm:py-4"

<!-- Grid -->
class="grid md:grid-cols-3 gap-3"

<!-- Visibilité -->
class="md:hidden"
<!-- mobile uniquement -->
class="hidden md:block"
<!-- desktop uniquement -->
```

## 📋 Patterns

```html
<!-- États -->
@if (viewModel.isLoading) {
<!-- Loading -->
} @else if (viewModel.isError) {
<!-- Error -->
} @else {
<!-- Content -->
}

<!-- Boucles -->
@for (item of items; track item.id) {
<!-- Item -->
}
```

## ✨ Principes

- **Simplicité** : Pas de div inutiles
- **Cohérence** : Mêmes classes pour mêmes éléments
- **Mobile-first** : Design responsive par défaut
- **Élégance** : `font-light` par défaut
- **Interactivité** : `transition-all` sur tous les éléments interactifs
- **Bordures** : `rounded-xl` (sauf boutons icône : `rounded-lg`)
