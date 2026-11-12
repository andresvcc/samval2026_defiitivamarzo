
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_INSTAGRAM_TOKEN?: string
    readonly VITE_GA_MEASUREMENT_ID?: string
    readonly VITE_SAMVAL_API_BASE_URL?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
