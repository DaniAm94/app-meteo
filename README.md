# 🌤️ App Meteo

**App Meteo** è un'applicazione web che fornisce previsioni meteo in tempo reale e consente agli utenti di salvare le città preferite per un accesso rapido alle informazioni. Sfrutta l'API di Open Meteo per ottenere dati meteo aggiornati.

## 📋 Funzionalità Principali

- **Ricerca Città**: cerca una città per visualizzare le informazioni meteo.
- **Visualizzazione Meteo**: mostra le condizioni meteo attuali e una previsione grafica delle temperature per le prossime 24 ore.
- **Città Preferite**: aggiunge e rimuove città dall'elenco dei preferiti, salvando i dati in LocalStorage per una persistenza di stato.
- **Grafico Temperature**: un grafico rappresenta l'andamento delle temperature orarie, con una linea di riferimento che segna l'ora attuale.

## 🚀 Tecnologie Utilizzate

- **Frontend**: React, con Context API per gestire lo stato dei preferiti.
- **Grafici**: Recharts per il grafico delle temperature.
- **API Meteo**: Open Meteo API per il recupero dei dati meteo.
- **Gestione Stato**: Context API per condividere lo stato tra i componenti.

## 🛠️ Installazione

1. **Clona la Repository**
   ```bash
   git clone https://github.com/DaniAm94/app-meteo
   cd app-meteo
2. **Installa le Dipendenze**
   ```bash
   npm install
3. **Configura l'API Crea un file .env e aggiungi l'URL dell'API:**
   ```bash
   VITE_BASE_METEO_URL=https://api.open-meteo.com/v1/forecast
   VITE_BASE_GEOCODING_URL=https://geocoding-api.open-meteo.com/v1/search
4. **Avvia l'Applicazione**
   ```bash
   npm run dev
