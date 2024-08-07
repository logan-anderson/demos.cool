/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./rootLayout.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
    "pages/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              fontWeight: "600",
              "&:hover": {
                color: theme("colors.brand.100"),
              },
            },
            strong: {
              fontWeight: "800",
            },
          },
        },
        brand: {
          css: {
            "--tw-prose-body": theme("colors.gray[300]"),
            "--tw-prose-headings": theme("colors.gray[100]"),
            "--tw-prose-bullets": theme("colors.brand[200]"),
            "--tw-prose-bold": theme("colors.brand[50]"),
            "--tw-prose-code": theme("colors.brand[200]"),
            "--tw-prose-pre-code": theme("colors.brand[100]"),
            // Not tested
            "--tw-prose-lead": theme("colors.brand[50]"),
            "--tw-prose-links": theme("colors.brand[200]"),
            "--tw-prose-counters": theme("colors.brand[600]"),
            "--tw-prose-hr": theme("colors.brand[300]"),
            "--tw-prose-quotes": theme("colors.brand[900]"),
            "--tw-prose-quote-borders": theme("colors.brand[300]"),
            "--tw-prose-captions": theme("colors.brand[700]"),
            "--tw-prose-pre-bg": theme("colors.brand[900]"),
            "--tw-prose-th-borders": theme("colors.brand[300]"),
            "--tw-prose-td-borders": theme("colors.brand[200]"),
            "--tw-prose-invert-body": theme("colors.brand[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.brand[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.brand[400]"),
            "--tw-prose-invert-bullets": theme("colors.brand[600]"),
            "--tw-prose-invert-hr": theme("colors.brand[700]"),
            "--tw-prose-invert-quotes": theme("colors.brand[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.brand[700]"),
            "--tw-prose-invert-captions": theme("colors.brand[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.brand[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.brand[600]"),
            "--tw-prose-invert-td-borders": theme("colors.brand[700]"),
          },
        },
      }),
      colors: {
        brand: {
          DEFAULT: "#5B2689",
          50: "#B688DE",
          100: "#AD79DA",
          200: "#9959D1",
          300: "#8539C8",
          400: "#702FA9",
          500: "#5B2689",
          600: "#3E1A5D",
          700: "#210E31",
          800: "#030105",
          900: "#000000",
          950: "#000000",
        },
        // brand: {
        //   50: "#f9f7fd",
        //   100: "#f0ecfb",
        //   200: "#e3dcf8",
        //   300: "#cdc0f2",
        //   400: "#af97e9",
        //   500: "#8f6ede",
        //   600: "#7850cd",
        //   700: "#633db3",
        //   800: "#5d3ba0",
        //   900: "#472d76",
        //   950: "#2c1655",
        // },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography")],
};
