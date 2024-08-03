/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        bgHtml: "#e9e9e9",
        bgBody: "#f2f2f2",
    },
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#073397", 
          secondary: "#00f",
          accent: "#000",
          neutral: "#fff",
          "base-content": "#000", /* Color de la letra */
          "base-100": "#fafafa",
          "base-200": "#ddd",
          "base-300": "#ccc",
          "error":"#ef4444",
      },
    },
    {
      myDark: {
        primary: "#000",
        secondary: "#00f",
        accent: "#444",
        neutral: "#fff",
        "base-content": "#fff", /* Color de la letra */
        "base-100": "#131313",
        "base-200": "#333",
        "base-300": "#444",
        error:"#d00"
      },
    }
    ]
  }
}
