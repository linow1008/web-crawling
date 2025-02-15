import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                text: {
                    "100": "var(--text-100)",
                    "200": "var(--text-200)",
                },
                bg: {
                    "100": "var(--bg-100)",
                    "200": "var(--bg-200)",
                    "300": "var(--bg-300)",
                },
                color: {
                    "100": "var(--color-1)",
                    "200": "var(--color-2)",
                    "300": "var(--color-3)",
                    "400": "var(--color-4)",
                    "500": "var(--color-5)",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
