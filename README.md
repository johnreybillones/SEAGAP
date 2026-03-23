**Welcome to your Base44 project** 

**About**

View and Edit  your app on [Base44.com](http://Base44.com) 

This project contains everything you need to run your app locally.

**Edit the code in your local development environment**

Any change pushed to the repo will also be reflected in the Base44 Builder.

**Prerequisites:** 

1. Clone the repository using the project's Git URL 
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

Run the app: `npm run dev`

**Frontend-only demo mode (no backend/database needed)**

The project now supports a demo mode that bypasses backend auth/data gates and uses local mock data.

By default, demo mode is enabled. To force backend mode, set:

```
VITE_DEMO_MODE=false
```

If `VITE_DEMO_MODE` is not set (or set to any value other than `false`), the app runs in demo mode.

**Mobile prototype viewport mode**

The app supports an optional framed mobile prototype mode for desktop previews.

Recommended baseline for this project (iOS-first):

```
VITE_MOBILE_FRAME=true
VITE_MOBILE_FRAME_WIDTH=390
VITE_MOBILE_FRAME_HEIGHT=844
```

- `VITE_MOBILE_FRAME=true` (default behavior unless explicitly set to `false`) renders the app in a centered mobile frame on desktop.
- `VITE_MOBILE_FRAME_WIDTH` controls the prototype width in pixels (e.g. `375`, `390`, `428`).
- `VITE_MOBILE_FRAME_HEIGHT` controls the prototype height in pixels (e.g. `812`, `844`, `926`).
- On real mobile widths, the app still renders edge-to-edge.

**Publish your changes**

Open [Base44.com](http://Base44.com) and click on Publish.

**Docs & Support**

Documentation: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)

Support: [https://app.base44.com/support](https://app.base44.com/support)
