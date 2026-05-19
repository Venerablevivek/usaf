/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
        container: {
                center: true,
                padding: '2rem',
                screens: { '2xl': '1400px' }
        },
        extend: {
                fontFamily: {
                  bebas: ['var(--font-bebas)', 'Bebas Neue', 'sans-serif'],
                  anton: ['var(--font-anton)', 'Anton', 'sans-serif'],
                  sora: ['var(--font-sora)', 'Sora', 'sans-serif'],
                  inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
                },
                colors: {
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
                        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
                        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
                        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
                        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
                        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
                        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
                        chart: { '1': 'hsl(var(--chart-1))', '2': 'hsl(var(--chart-2))', '3': 'hsl(var(--chart-3))', '4': 'hsl(var(--chart-4))', '5': 'hsl(var(--chart-5))' },
                        olympic: {
                          ivory: '#F6F1E8',
                          'ivory-soft': '#EDE6D6',
                          charcoal: '#1E1E1E',
                          'charcoal-soft': '#2A2A2A',
                          gold: '#D4A24C',
                          'gold-soft': '#E5C68A',
                          red: '#C62828',
                          green: '#3D7A57',
                          sky: '#8FAFC7',
                        }
                },
                borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
                keyframes: {
                        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                        'float-slow': { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
                        'shimmer': { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
                        'pulse-glow': { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '1' } },
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'float-slow': 'float-slow 8s ease-in-out infinite',
                        'shimmer': 'shimmer 3s linear infinite',
                        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                }
        }
    },
    plugins: [require("tailwindcss-animate")],
  }
