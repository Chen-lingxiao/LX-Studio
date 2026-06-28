/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JUHE_API_KEY_CALENDAR: string;
  readonly VITE_JUHE_API_KEY_HISTORY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
