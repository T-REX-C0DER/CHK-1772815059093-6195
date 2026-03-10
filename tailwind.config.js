/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // HelpSphere branding colors
        primary: "#D88A6F",
        "primary-light": "#F6E3DA",
        background: "#F8F6F4",
        card: "#FFFFFF",
        
        // Text colors
        "text-primary": "#1F2937",
        "text-secondary": "#6B7280",
        
        // Border color
        border: "#E5E7EB",
        
        // Status colors
        success: "#22C55E",
        "donation-progress": "#D88A6F",
        
        // Legacy support
        neutral: "#1F2937",
        accent: "#EFAF97",
      },
      spacing: {
        "8px": "8px",
        "16px": "16px",
        "24px": "24px",
        "32px": "32px",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
}
