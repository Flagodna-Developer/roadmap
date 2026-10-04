# Changelogs FlagoDNA

## 2026-10-04

### HadisKu.id & HadisKu Dashboard

#### Added

- Purchased and configured the new **HadisKu.id** domain.
- Started development of the new **HadisKu.id** website.
- Continued design and development of the **HadisKu Dashboard** for internal and production use.
- Added dashboard functionality for managing and processing incoming **user suggestions and feedback**.

### FlagoDNA Telemetry

#### Added

- Developed and deployed **FlagoDNA Telemetry** for internal application statistics.
- Telemetry is limited to **anonymous app install counts, DAU, and MAU**.

### FlagoDNA Telemetry Client

#### Added

- Developed and deployed **FlagoDNA Telemetry Client** for:

  - **Kotlin / Android**
  - **Web applications**

### DebugPrint

#### Added

- Released **DebugPrint** as a public Kotlin library on Maven Central.
- Added a lightweight, zero-config core debug logger for Android.
- Added Flutter-inspired logging API with lazy evaluation.
- Added automatic silencing in release builds.

Repository: https://github.com/cas8398/debugprint

Usage:

```kotlin
implementation("com.flagodna:debugprint:X.X.X")
```

### HadisKu v4.0.0-beta.3

#### Added

- Added personal **Notes** with create, edit, delete, pin, and share support.
- Added inline hadith references in notes using `@bukhari:6018`.
- Added a top bar action for inserting hadith references.
- Added multi-select for bulk pin and delete actions.
- Added a featured-content hero card to the home screen.
- Added internal telemetry SDK for anonymous install and daily-activity pings.
- Added **DebugPrint** for structured and tagged logging.

#### Changed

- Rewritten the notes editor using native **EditText** for more stable keyboard behavior and cursor-follow scrolling.
- Notes editor now preserves scroll position when returning from hadith detail.
- Shared notes now resolve hadith references into readable labels with a numbered reference list.

#### Fixed

- Fixed keyboard dismissal when moving focus between the note title and body.
- Fixed cursor jumping while editing long notes.

---

## 2026-09-23

### Brosur MTA v4.0.1

#### Removed

- Removed **OneSignal SDK** for push notifications.

#### Added

- Added direct integration with **Firebase Cloud Messaging (FCM)** for notifications.
- Added **Tiketea Saran** form for questions, suggestions, and user feedback.

#### Fixed

- Improved **PDF Reader** error handling by replacing raw system errors with more user-friendly messages.

## 2026-09-22

### KasirCepat v26.9.22

#### Added

- Added **"Coba KasirCepat PRO Gratis"** button to help users access the PRO trial.
- Added **Tiketea feedback button** for questions, suggestions, and user feedback.

---

### FlagoDNA Email System

#### Added

- Added email delivery system for **OTP verification** and **FlagoDNA newsletters**.
- Added `@flagodna.com` email infrastructure for product and community communication.

---

## 2026-09-19

### KasirCepat v26.9.19

#### Added

- Added **Kasir Session** system.
- Added **daily automatic backup** for PRO users.
- Added **discount system**.
- Added background processing for automatic discount cleanup based on validity periods.
- Improved onboarding flow with information about bulk product updates.

#### Changed

- Renamed **"Nama Perangkat"** to **"Nama Sesi Kasir"** for clearer usage context.
