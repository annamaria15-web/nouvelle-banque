# Espace Client Bancaire (React + TypeScript + Vite + Tailwind CSS)

Application bancaire moderne avec interface interactive complète, contrôle d'accès sécurisé, gestion des comptes et virements.

---

## 💻 1. Ouverture dans Visual Studio Code

1. Décompressez l'archive ZIP sur votre ordinateur.
2. Lancez **Visual Studio Code**.
3. Allez dans le menu **Fichier** > **Ouvrir le dossier...** et sélectionnez le dossier décompressé.

---

## 🚀 2. Installation et démarrage local

Dans le terminal de VS Code (`Ctrl + `` ou `Cmd + ``) :

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur local
npm run dev
```

L'application s'exécute immédiatement sur **`http://localhost:3000`**.

---

## 🎨 3. Personnaliser votre logo

- **Option recommandée** : Déposez simplement votre fichier image nommé **`logo.png`** ou **`logo.svg`** dans le dossier **`public/`**. Il s'affichera automatiquement partout dans l'application !
- **Option directe** : Ouvrez **`src/components/Logo.tsx`** et insérez directement votre balise `<img>` ou votre SVG personnalisé.

---

## 📦 4. Déploiement vers GitHub

Dans le terminal de VS Code :

```bash
git init
git add .
git commit -m "Déploiement initial"
git branch -M main
git remote add origin https://github.com/annamaria15-web/new-banque.git
git push -u origin main --force
```

---

## 🌐 5. Hébergement en production (Vercel)

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub annamaria15-web.
2. Cliquez sur **Import** en face de votre projet `new-banque`.
3. Cliquez sur **Deploy**.
