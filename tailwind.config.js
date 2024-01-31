/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                primary: '#264653',
                secondary: '#2A9D8F',
            },
            width: {
                200: '68rem',
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ]
}
