/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    colors: {
    'crimson': {
      100: "#ffe9f2",
      200: "#fcc6dc",
      300: "#faaece",
      400: "#f782b3",
      500: "#f34b91",
      600: "#f01f76",
      700: "#e72274",
      800: "#dc2672",
      900: "#c82d6d",
      950: "#b8336a"
    },

    'indigo':{
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#1e1b4b"
    },

    'black_white':{
      100: "#ffffff",
      200: "#d9d9d9",
      300: "#b8b8b8",
      400: "#949494",
      500: "#7b7b7b",
      600: "#646464",
      700: "#454545",
      800: "#242424",
      900: "#000000",
    }
  },
    extend: {},
  },
  plugins: [],
}

