/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_API_URL: string;
  // добавьте другие переменные по мере необходимости
}

type ImportMeta = {
  readonly env: ImportMetaEnv;
}