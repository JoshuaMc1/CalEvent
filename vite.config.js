import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifest: {
                name: 'Calendario de eventos',
                short_name: 'CalEvent',
                description: '¡Bienvenido a CalEvent! Una aplicación de calendario de eventos creada con React, TailwindCSS y Flowbite. Organiza tu vida de manera efectiva con la posibilidad de crear eventos con diferentes prioridades y personalizar el color de las pestañas de los eventos a tu gusto.',
                theme_color: '#264653',
                icons: [
                    {
                        src: '/android-launchericon-144-144.png',
                        sizes: '144x144',
                        type: 'image/png'
                    },
                    {
                        src: '/android-launchericon-192-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/android-launchericon-512-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/android-launchericon-512-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: '/android-launchericon-512-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    },
                ],
                display: 'standalone',
                background_color: '#264653',
                start_url: '.',
                orientation: 'portrait',
            }
        })
    ],
})
