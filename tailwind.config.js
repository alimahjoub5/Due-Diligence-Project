/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0B1120', // Very dark navy (Prime Check style)
                    light: '#1e293b',
                },
                accent: {
                    DEFAULT: '#C5A059', // Gold/Bronze
                    hover: '#b08d4b',
                    light: '#e6c886',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
