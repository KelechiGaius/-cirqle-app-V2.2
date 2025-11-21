# 🚀 Deployment Guide für Cirqle auf Vercel

## Problem: Weißer Bildschirm nach Deployment

Das Problem war, dass die App mit `importmap` und CDN-Links erstellt wurde, was für lokale Entwicklung funktioniert, aber nicht für Production Builds auf Vercel.

## ✅ Was wurde gefixt:

1. **Projekt-Struktur**: Alle Source-Dateien nach `src/` verschoben
2. **Environment Variables**: `process.env` → `import.meta.env.VITE_*`
3. **index.html**: Importmap entfernt, normaler Vite-Import verwendet
4. **TypeScript**: Fehlende Types (@types/react, @types/react-dom) hinzugefügt
5. **Vite Config**: Vereinfacht für Production Builds
6. **vercel.json**: Hinzugefügt für korrektes Routing

## 📋 Deployment Schritt-für-Schritt

### 1. GitHub Repository erstellen

```bash
# Im Projekt-Ordner:
git init
git add .
git commit -m "Fixed: Vercel deployment ready"
git branch -M main

# GitHub Repo erstellen auf github.com, dann:
git remote add origin https://github.com/DEIN_USERNAME/cirqle-app.git
git push -u origin main
```

### 2. Vercel Projekt erstellen

1. Gehe zu [vercel.com](https://vercel.com) und melde dich an
2. Klicke auf **"Add New..." → "Project"**
3. Wähle dein GitHub Repository aus
4. Vercel erkennt automatisch, dass es ein Vite-Projekt ist

### 3. Environment Variables setzen

**WICHTIG**: Bevor du auf "Deploy" klickst:

1. Scrolle zu **"Environment Variables"**
2. Füge folgende Variable hinzu:
   ```
   Name: VITE_GEMINI_API_KEY
   Value: [Dein Gemini API Key]
   ```
3. Wähle alle Environments (Production, Preview, Development)

#### Gemini API Key bekommen:
- Gehe zu [aistudio.google.com](https://aistudio.google.com)
- Klicke auf "Get API Key"
- Kopiere den Key

### 4. Deploy

1. Klicke auf **"Deploy"**
2. Warte ca. 1-2 Minuten
3. Klicke auf den Link zu deiner App

### 5. Verifizierung

Nach dem Deployment:
- ✅ Die App sollte laden (kein weißer Bildschirm)
- ✅ Du solltest den Login-Screen sehen
- ✅ Browser Console (F12) sollte keine Fehler zeigen

## 🔧 Troubleshooting

### Immer noch weißer Bildschirm?

1. **Prüfe Vercel Build Logs**:
   - Gehe zu deinem Projekt in Vercel
   - Klicke auf "Deployments"
   - Klicke auf das letzte Deployment
   - Schaue dir die Build Logs an

2. **Prüfe Browser Console**:
   - Öffne deine deployed App
   - Drücke F12
   - Schaue in "Console" nach Fehlern
   - Häufige Fehler:
     - "Failed to fetch" → API Key Problem
     - "Cannot find module" → Build Problem

3. **Environment Variables prüfen**:
   - Vercel Dashboard → Dein Projekt → Settings → Environment Variables
   - Stelle sicher, dass `VITE_GEMINI_API_KEY` gesetzt ist
   - Variable muss mit `VITE_` beginnen!

4. **Redeploy erzwingen**:
   - Gehe zu Deployments
   - Klicke auf "..." beim letzten Deployment
   - Klicke "Redeploy"

### Build schlägt fehl?

Fehlermeldung checken:
- `npm install failed` → Prüfe package.json
- `TypeScript error` → Schaue welche Datei Fehler hat
- `Vite build failed` → Schaue nach Import-Fehlern

### App lädt aber funktioniert nicht richtig?

1. **API Key nicht gesetzt**:
   - Du siehst nur Fallback-Daten
   - Lösung: Environment Variable in Vercel setzen

2. **CORS Errors**:
   - Sollte nicht passieren mit Gemini API
   - Falls doch: API-Aufrufe im Backend machen

## 🔄 Weitere Deployments

Nach dem ersten erfolgreichen Deployment:

```bash
# Änderungen machen
git add .
git commit -m "Deine Änderung"
git push

# Vercel deployed automatisch!
```

## 📱 Custom Domain (Optional)

1. Vercel Dashboard → Dein Projekt → Settings → Domains
2. Füge deine Domain hinzu
3. Folge den DNS-Anweisungen

## 🔐 Supabase Integration (Nächster Schritt)

Wenn du Supabase Backend integrieren willst:

1. Erstelle Supabase Projekt auf [supabase.com](https://supabase.com)
2. Füge in Vercel Environment Variables hinzu:
   ```
   VITE_SUPABASE_URL=https://deinprojekt.supabase.co
   VITE_SUPABASE_ANON_KEY=dein_anon_key
   ```
3. Installiere Supabase Client:
   ```bash
   npm install @supabase/supabase-js
   ```

## ✅ Checkliste vor Deployment

- [ ] `.env.local` existiert lokal (aber ist in .gitignore)
- [ ] `vercel.json` ist vorhanden
- [ ] Alle Dateien sind in `src/` Ordner
- [ ] `package.json` hat alle Dependencies
- [ ] Code verwendet `import.meta.env.VITE_*` statt `process.env`
- [ ] Lokaler Build funktioniert: `npm run build && npm run preview`
- [ ] GitHub Repo ist gepushed
- [ ] Environment Variables sind in Vercel gesetzt

## 🆘 Hilfe bekommen

- Vercel Status: [vercel-status.com](https://www.vercel-status.com)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vite Docs: [vitejs.dev](https://vitejs.dev)
