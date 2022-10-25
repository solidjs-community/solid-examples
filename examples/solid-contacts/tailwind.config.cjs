const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                'coarse': { 'raw': '(pointer:coarse)' },
            },
            animation: {
                'appear': 'appear 0.3s',
                'appear-left': 'appear-left 0.3s',
            },
            keyframes: {
                appear: {
                    '0%': { transform: 'translateY(128px)', opacity: '0' },
                    '60%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'appear-left': {
                    '0%': { transform: 'translateX(-128px)', opacity: '0' },
                    '60%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(0)', opacity: '1' }
                }
            }
        },
    },
    plugins: [],
}
