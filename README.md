# 🏋️ Fitness Planner App

Fitness Planner je mobilna / web aplikacija za planiranje treninga, praćenje ishrane i dnevnih fitness ciljeva.

Aplikacija omogućava korisnicima da:
- organizuju treninge po danima
- biraju vežbe po kategorijama
- prate ishranu i dnevne ciljeve
- upravljaju svojim fitness planom na jednom mestu

---

## 🚀 Funkcionalnosti

### ✅ Autentifikacija
- Login / Logout korisnika
- Podrška za više korisnika
- Autentifikacija implementirana korišćenjem Firebase Realtime Database (REST API)

### 🍽️ Praćenje ishrane
- Dodavanje obroka
- Praćenje kalorija i proteina
- Dnevni zbir nutritivnih vrednosti

### 🎯 Daily Goals
- Podešavanje dnevnih ciljeva:
  - kalorije
  - proteini
  - voda
- Prikaz procenta ispunjenosti ciljeva

### 🏋️ Workout Schedule
- Kreiranje treninga po danima u nedelji
- Dodavanje više vežbi u jedan trening
- Grupisanje vežbi po kategorijama (Chest, Back, Legs, Core…)
- Edit i Delete treninga
- Pregled treninga po danima

### 📅 Organizacija
- Filtriranje treninga po danima
- Čuvanje podataka u Firebase Realtime Database

---

## 🛠️ Tehnologije

- Frontend: Ionic + Angular
- Jezik: TypeScript, HTML, SCSS
- Backend / Database: Firebase Realtime Database
- Autentifikacija: Custom auth (Firebase Realtime Database – REST API)
- UI: Ionic Components
- Version control: Git

---

## ⚙️ Instalacija i pokretanje

### 1️⃣ Kloniranje projekta
```bash
git clone https://github.com/Filip79-code/fitness-planner-ionic.git
cd fitness-planner
```

### 2️⃣ Instalacija zavisnosti
```bash
npm install
```

### 3️⃣ Pokretanje aplikacije
```bash
ionic serve
```

---

## 🔥 Firebase Setup

Aplikacija koristi **Firebase Realtime Database** putem REST API-ja.

Za pokretanje projekta potrebno je:

1. Napraviti Firebase projekat na:
   https://console.firebase.google.com

2. Omogućiti:
   - Realtime Database (Read / Write)

3. Kopirati URL baze (Realtime Database URL)

4. Zameniti `baseUrl` u fajlu
