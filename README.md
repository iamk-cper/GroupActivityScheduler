# Group Activity Scheduler

Aplikacja webowa do wspólnego planowania aktywności w grupach. Projekt zrealizowany w architekturze full-stack z użyciem Node.js, Express, MongoDB, React oraz Bootstrap.

## Opis projektu

Group Activity Scheduler to aplikacja umożliwiająca użytkownikom:
- rejestrację i logowanie,
- tworzenie grup i zapraszanie innych użytkowników,
- wspólne planowanie aktywności w ramach grupy,
- głosowanie na aktywności (lajki/dislajki),
- planowanie aktywności w kalendarzu tygodniowym,
- dołączanie i opuszczanie zaplanowanych aktywności.

Projekt prezentuje dobre praktyki programistyczne i wzorce projektowe (MVVM, Repository, DTO).

## Funkcjonalności

- Rejestracja i logowanie użytkownika (autoryzacja JWT)
- Tworzenie grup i zapraszanie użytkowników po nicku
- Akceptacja/odrzucenie zaproszenia do grupy

### Panel aktywności:
- Dodawanie aktywności z opisem i czasem trwania
- Lajkowanie/dislajkowanie aktywności (jeden głos na użytkownika)
- Podgląd liczby głosów

### Panel kalendarza:
- Widok tygodniowy (dni tygodnia)
- Przypisywanie aktywności do wybranego dnia
- Dołączanie/opuszczanie slotu przez użytkownika
- Lista członków slotu (nicki)

### Zarządzanie grupą:
- Lista członków grupy
- Zarządzanie zaproszeniami

## Technologie

- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React, JavaScript (ES6+), Bootstrap, HTML5, CSS
- Baza danych: MongoDB (baza nierelacyjna)
- Autoryzacja: JWT (JSON Web Token)
- Komunikacja: REST API, DTO (Data Transfer Object)

## Wzorce projektowe

### MVVM (Model-View-ViewModel):
- Komponenty React jako View
- Custom hooki (np. useActivityViewModel) jako ViewModel
- DTO jako Model

### Repository Pattern (Backend):
- Oddzielenie logiki dostępu do bazy od kontrolerów (np. ActivityRepository.js)

### DTO (Data Transfer Object):
- Każda odpowiedź API jest mapowana przez DTO (np. ActivityDTO.js)

## Struktura projektu

```
backend/
  controllers/      # logika obsługi żądań HTTP
  dtos/             # obiekty DTO do komunikacji z frontendem
  models/           # schematy Mongoose
  repositories/     # logika bazy danych
  routes/           # trasy API

frontend/
  src/
    components/     # komponenty React
    viewmodels/     # hooki MVVM
    services/       # komunikacja z backendem
    models/         # DTO na froncie
```

## Instrukcja uruchomienia

### 1. Backend

- Przejdź do katalogu `backend`
- Zainstaluj zależności:
  ```
  npm install
  ```
- Upewnij się, że MongoDB jest uruchomione lokalnie (domyślnie: `mongodb://localhost:27017/group-activity`)
- Uruchom serwer:
  ```
  node server.js
  ```
- Backend będzie dostępny na porcie `5000`

### 2. Frontend

- Przejdź do katalogu `frontend`
- Zainstaluj zależności:
  ```
  npm install
  ```
- Uruchom aplikację:
  ```
  npm start
  ```
- Frontend będzie dostępny na porcie `3000` i proxy'uje żądania do backendu

## Przykładowy scenariusz użycia

1. Zarejestruj nowe konto i zaloguj się.
2. Utwórz nową grupę i zaproś innych użytkowników po ich nicku.
3. Zaakceptuj zaproszenie do grupy (jako inny użytkownik).
4. Dodaj aktywność w panelu aktywności, zagłosuj na nią.
5. Przejdź do panelu kalendarza, przypisz aktywność do dnia.
6. Dołącz do aktywności lub ją opuść.
7. Obserwuj aktualizującą się listę członków slotu.

---

**Autor:**  
Kacper Myćka  
Projekt stworzony w celach edukacyjnych.
