# Evaluation dans le cadre du cours de Framework Client – Evaluation Shopping Cart

## 🔹 Fonctionnalités

- Liste dynamique des produits depuis **mockAPI**
- Ajout de produits dans le **panier**
- Liste dynamique des produits du **panier**
- Calcul dynamique du **total HTVA**
- Modification de la **quantité** des produits dans le panier
- **Suppression** des produits du panier
- **suppression** du panier complet, simulation d'achat terminée

## 🔹 Structure utilisée

- **Store `products`** avec un fichier `DB.js`
- **Store `shoppingCart`**

```
src/
├─ components/
│  ├─ ui/
├─ layout/
├─ modules/
│  ├─ cart/
│  │  ├─ ShoppingCart.vue
│  │  └─ components/
│  └─ catalogue/
│     ├─ Catalogue.vue
│     └─ components/
├─ services/
│  └─ DB.js
└─ stores/
   ├─ products.js
   └─ shoppingCart.js
```

## 🔹 Features optionnelles

- Calcul dynamique de la **TVA** et possibilité de modifier les **frais de port**
- Gestion du **shopping cart dans le localStorage** avec un **watcher**
- Les **boutons** en tant que **composants UI** (`./components/ui/MyButton.vue`)
