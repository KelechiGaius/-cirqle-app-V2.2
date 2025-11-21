# Cirqle - Real Life Connections

Eine React App um neue Freunde zu finden und Aktivitäten zu planen.

## 🚀 Vercel Deployment

### Schritt 1: Projekt zu GitHub pushen
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin DEINE_GITHUB_REPO_URL
git push -u origin main
```

### Schritt 2: Vercel Deployment
1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke auf "New Project"
3. Importiere dein GitHub Repository
4. **WICHTIG**: Setze die Environment Variables:
   - Gehe zu "Environment Variables"
   - Füge hinzu: `VITE_GEMINI_API_KEY` = dein Gemini API Key
   - (Optional) Supabase Keys wenn du Backend verwenden willst

### Schritt 3: Deploy
- Klicke auf "Deploy"
- Vercel baut automatisch deine App

## 🛠️ Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Dev Server starten
npm run dev

# Production Build testen
npm run build
npm run preview
```

## 📝 Environment Variables

Erstelle eine `.env.local` Datei:
```
VITE_GEMINI_API_KEY=dein_gemini_api_key
```

### Gemini API Key bekommen:
1. Gehe zu [aistudio.google.com](https://aistudio.google.com)
2. Erstelle einen API Key
3. Füge ihn in Vercel Environment Variables ein

## 🔧 Troubleshooting

### Weißer Bildschirm nach Deployment?
- Prüfe die Vercel Build Logs
- Stelle sicher, dass VITE_GEMINI_API_KEY gesetzt ist
- Prüfe Browser Console auf Fehler (F12)

### App läuft lokal aber nicht auf Vercel?
- Stelle sicher, dass alle Environment Variables mit `VITE_` beginnen
- Prüfe ob `vercel.json` vorhanden ist
- Rebuild das Projekt in Vercel

## 📦 Tech Stack

- React 19
- TypeScript
- Vite
- Framer Motion
- Tailwind CSS
- Google Gemini AI
- Lucide Icons
