here the upload is occuring twice. akbar akta upload er alada kore component royeche ar akbar prescription er under e sudhu akta upload er section ache. why?

link to note about everything left.
https://www.notion.so/RxMind-Mobile-App-Page-Development-Sequence-2a81b5070b58451884954e1af30f9a9f?source=copy_link


4️⃣ AUTH SCREENS (STACK ONLY)
From Next.js
app/login/page.tsx
app/signup/page.tsx

Mobile equivalents
app/(auth)/login.tsx
app/(auth)/signup.tsx


🔑 Reason:

Not part of tabs

Share Inputs, Buttons, validation UI

👉 Paste login page next, not signup

5️⃣ CORE FEATURE TABS (ONE BY ONE)

These map 1:1 with navbar items.

From Next.js
app/medications/page.tsx
app/reminders/page.tsx
app/alarms/page.tsx
app/profile/page.tsx

Mobile equivalents
app/(tabs)/medications.tsx
app/(tabs)/reminders.tsx
app/(tabs)/alarms.tsx
app/(tabs)/profile.tsx


🔑 Rule:

ONE tab at a time
Finish UI fully → move to next

6️⃣ COMPLEX FEATURE MODULES (SECOND PHASE)

These are feature-heavy but UI-first.

From Next.js
components/prescriptions/*
components/pharmacy/*
components/notifications/*

Mobile equivalents
components/prescriptions/*
components/pharmacy/*
components/notifications/*


🔑 Reason:

Reused inside multiple screens

Better to port after base screens exist

7️⃣ FORMS & INPUT LOGIC (VERY IMPORTANT)
From Next.js
components/forms/*
components/ui/input.tsx
components/ui/select.tsx

Mobile equivalents
components/forms/*
components/ui/Input.tsx
components/ui/Picker.tsx


📌 Native forms behave VERY differently → needs careful mapping

8️⃣ WEB-ONLY FILES (DO NOT PORT ❌)

Do NOT waste time on these:

app/layout.tsx
app/providers.tsx
globals.css
tailwind.config.js
postcss.config.js
next.config.js
middleware.ts


These do not exist in RN.

9️⃣ ASSETS (COPY, DON’T REWRITE)
From Next.js
public/

To Mobile
assets/


Only images/icons/fonts matter.

🧭 ORDER YOU SHOULD FOLLOW (STRICT)

1️⃣ navbar.tsx
2️⃣ components/ui/button.tsx
3️⃣ components/ui/input.tsx
4️⃣ login/page.tsx
5️⃣ medications/page.tsx
6️⃣ reminders/page.tsx
7️⃣ profile/page.tsx
8️⃣ Complex components













# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
