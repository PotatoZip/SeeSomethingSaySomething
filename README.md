# SeeSomethingSaySomething

## Opis projektu

SeeSomethingSaySomething to aplikacja webowa typu SPA (Single Page Application) zbudowana w React. Projekt zostal zrealizowany jako cwiczenie laboratoryjne, ktorego celem bylo stworzenie funkcjonalnej aplikacji frontendowej opartej na dostarczonym prototypie interfejsu. Aplikacja umozliwia uzytkownikowi przegladanie tresci, zglaszanie obserwacji oraz korzystanie z panelu administracyjnego dostepnego po zalogowaniu.

Projekt jest w pelni wdrozony na GitHub Pages i obsluguje analityke ruchu przez Google Analytics oraz Contentsquare (platforma z ekosystemu Hotjar), co pozwala monitorowac zachowania uzytkownikow w czasie rzeczywistym.

#### Strona glowna aplikacji

![Strona glowna aplikacji](docs/screens/app-home.png)

## Technologie i narzedzia

Aplikacja zostala zbudowana przy uzyciu nastepujacego stosu technologicznego:

- **React 18** — biblioteka do budowy interfejsu uzytkownika
- **Vite** — szybkie srodowisko deweloperskie i narzedzie do budowania
- **React Router DOM** — routing po stronie klienta
- **Tailwind CSS** — stylowanie przez klasy narzędziowe
- **Firebase Authentication** — logowanie uzytkownikow email/haslo
- **react-ga4** — integracja Google Analytics 4
- **Contentsquare / Hotjar** — analityka zachowan uzytkownikow
- **gh-pages** — automatyczny deploy na GitHub Pages

## Struktura projektu

Projekt zostal podzielony na warstwy wedlug odpowiedzialnosci:
```
src/
  pages/              # pelne widoki ekranow
    HomePage.jsx
    SendRequestPage.jsx
    GaleryPage.jsx
    LoginPage.jsx
    NotFoundPage.jsx
    dashboard/
      DashboardLayout.jsx
      OverviewPage.jsx
      SettingsPage.jsx
  components/
    layout/           # Navbar, Footer
    ui/               # Button, Input, Card
  context/
    AuthContext.jsx   # stan autoryzacji
  analytics.js        # konfiguracja GA4
  App.jsx             # routing i layout
  main.jsx            # punkt wejscia
```

## 1. Odwzorowanie prototypu

Interfejs aplikacji odwzorowuje prototyp dostarczony w ramach projektu. Zachowano uklad sekcji, kolejnosc elementow, typy komponentow (formularze, karty, menu, przyciski) oraz podstawowa responsywnosc. Kazdy ekran jest rozpoznawalny i zgodny z pierwotnym projektem wizualnym.

Na stronie glownej widoczna jest sekcja hero, informacje o projekcie i wezwanie do dzialania. Strona galerii prezentuje zbior zgloszonych obserwacji. Formularz zgloszen pozwala uzytkownikowi wpisac i wyslac dane. Panel administracyjny jest dostepny wylacznie po zalogowaniu.

#### Galeria zgloszonych obserwacji

![Widok galerii](docs/screens/app-gallery.png)

#### Formularz zglaszania obserwacji

![Widok formularza zglaszania](docs/screens/app-send-request.png)

#### Panel administracyjny

![Widok panelu](docs/screens/app-dashboard.png)

## 2. Routing wszystkich ekranow

Kazdy ekran aplikacji ma przypisana osobna trase w React Router. Nawigacja odbywa sie bez przeladowania strony, co jest cecha charakterystyczna SPA. Dla nieistniejacych adresow URL zaimplementowano dedykowany widok 404. Dashboard korzysta z routingu zagniezdzonego, dzieki czemu podstrony panelu sa dostepne przez `/dashboard/settings`.

Pelna lista tras:

| Sciezka | Komponent |
|---|---|
| `/` | HomePage |
| `/send-request` | SendRequestPage |
| `/galery` | GaleryPage |
| `/login` | LoginPage |
| `/dashboard` | OverviewPage (w DashboardLayout) |
| `/dashboard/settings` | SettingsPage (w DashboardLayout) |
| `*` | NotFoundPage |

#### Strona bledu 404 — nieistniejacy adres URL

![Widok strony 404](docs/screens/app-404.png)

## 3. Podzial na strony w folderze pages

Kazdy glowny widok aplikacji jest osobnym komponentem strony umieszczonym w folderze `src/pages`. Dzieki temu kazda strona ma wyraznie okreslona odpowiedzialnosc, jest podpieta pod swoja trase i mozna ja rozwijac niezaleznie od pozostalych. Folder `dashboard/` zawiera dodatkowo oddzielny layout panelu z wlasna nawigacja boczna.

#### Struktura folderu pages w edytorze kodu

![Struktura folderu pages w edytorze](docs/screens/checkpoint-3-pages-folder.png)

## 4. Komponenty reuzywalne

Powtarzajace sie elementy interfejsu zostaly wydzielone do komponentow wielokrotnego uzytku. Znajduja sie w folderze `src/components` i sa uzywane w wielu miejscach aplikacji:

- **Button** — przycisk z wariantami (primary, outline, danger), rozmiarami i propem `disabled`
- **Input** — pole formularza z etykieta i obsluga bledu przez prop `error`
- **Card** — karta z mozliwoscia przekazania dowolnej zawartosci przez `children`
- **Navbar** — gorny pasek nawigacji z linkami i przyciskiem CTA
- **Footer** — stopka wyswietlana na kazdej stronie

Dzieki tej strukturze interfejs jest spojny, a kod nie zawiera duplikacji.

#### Komponenty UI uzyte w aplikacji (Button, Input, Card)

![Komponenty UI w akcji](docs/screens/checkpoint-4-reusable-components.png)

## 5. Stylowanie i wyglad

Aplikacja jest ostylowana z uzyciem Tailwind CSS. Zadbano o spojna kolorystyke opartego na niebieskiej palecie, czytelna typografie (czcionki Manrope i Inter), odpowiednie odstepy, zaokraglone narozniki i cieniowanie kart. Elementy interaktywne posiadaja stany hover i focus. Interfejs jest estetyczny i czytelny zarowno na urzadzeniach mobilnych, jak i desktopowych.

#### Wyglad aplikacji — paleta kolorow, typografia, odstepy

![Wyglad aplikacji na stronie glownej](docs/screens/app-home.png)

## 6. Logowanie i autoryzacja (Firebase Authentication)

System logowania zostal zrealizowany z uzyciem Firebase Authentication (metoda Email/Password). Uzytkownik wprowadza adres e-mail i haslo w formularzu logowania, a po poprawnej weryfikacji uzyskuje dostep do panelu administracyjnego. Wylogowanie konczy sesje i przekierowuje do strefy publicznej.

Ochrona tras zostala zrealizowana przez komponent `ProtectedRoute`, ktory sprawdza stan autoryzacji z Firebase przed wyrenderowaniem chronionego widoku. Trasa `/login` jest z kolei chroniona przez `GuestRoute` — po zalogowaniu uzytkownik jest automatycznie przekierowywany do dashboardu.

Konfiguracja Firebase jest przechowywana w zmiennych srodowiskowych `.env`, a inicjalizacja odbywa sie w `src/firebase.js`.

#### Formularz logowania (email + haslo)

![Formularz logowania](docs/screens/app-login.png)

#### Panel administracyjny po poprawnym zalogowaniu

![Panel po zalogowaniu](docs/screens/app-dashboard.png)

#### Strona ustawien w panelu uzytkownika

![Strona ustawien w panelu](docs/screens/app-settings.png)

## 7. Integracja Hotjar / Contentsquare

Do projektu zostal dodany skrypt analityczny Contentsquare (platforma z ekosystemu Hotjar), osadzony globalnie w sekcji `<head>` pliku `index.html`. Narzedzie automatycznie rejestruje sesje, interakcje uzytkownikow (klikniecia, scroll, nawigacje) i pozwala ogladac nagrania sesji oraz mapy ciepla w panelu Contentsquare.

Integracja zostala zweryfikowana — requesty eventowe trafiaja poprawnie na serwery `c.ba.contentsquare.net/v2/events`.

#### Potwierdzenie poprawnej instalacji tagu Contentsquare

![Potwierdzenie instalacji tagu](docs/screens/cs-verify-installation.png)

#### Dashboard Contentsquare — przeglad sesji i aktywnosci

![Dashboard analityczny Contentsquare](docs/screens/placeholder.png)

#### Session Replay — nagranie sesji uzytkownika

![Widok Session Replay](docs/screens/placeholder.png)

## 8. Integracja Google Analytics

Google Analytics 4 zostal wdrozony przez biblioteke `react-ga4`. Inicjalizacja nastepuje przy starcie aplikacji w `src/main.jsx`, a zdarzenia `page_view` sa wysylane automatycznie przy kazdej zmianie trasy w `src/App.jsx`. Dzieki temu kazde przejscie miedzy podstronami jest rejestrowane, co daje wiarygodny obraz aktywnosci uzytkownikow w aplikacji SPA.

#### Google Analytics — widok Realtime z aktywna sesja

![Google Analytics Realtime](docs/screens/placeholder.png)

#### Google Analytics — raport stron i ekranow

![Raport stron Google Analytics](docs/screens/placeholder.png)


## 9. Deploy aplikacji

Aplikacja jest wdrozona publicznie na GitHub Pages. Proces publikacji przebiega nastepujaco:

1. Zmiany sa commitowane i wypychane na branch `main`.
2. Komenda `npm run deploy` buduje wersje produkcyjna i wysyla folder `dist` na branch `gh-pages`.
3. GitHub Pages serwuje aplikacje bezposrednio z brancha `gh-pages`.

```bash
npm run deploy
```

Aplikacja jest dostepna pod adresem:
`https://potatozip.github.io/SeeSomethingSaySomething/`

#### Opublikowana aplikacja dzialajaca na GitHub Pages

![Opublikowana aplikacja na GitHub Pages](docs/screens/checkpoint-9-deploy.png)

## Uruchomienie lokalne

Aby uruchomic projekt lokalnie:

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
```

## Podsumowanie

Projekt SeeSomethingSaySomething realizuje wszystkie wymagania laboratoryjne: odwzorowanie prototypu, routing wszystkich ekranow, podzial na strony i komponenty reuzywalne, spojne stylowanie, logowanie z Firebase Authentication, integracje Google Analytics i Hotjar/Contentsquare oraz deploy na GitHub Pages. Dokumentacja opisuje kazdy obszar krok po kroku i zawiera miejsca na material dowodowy w postaci screenshotow aplikacji i narzedzi analitycznych.
