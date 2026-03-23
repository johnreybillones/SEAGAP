/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			nunito: ['Nunito', 'sans-serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 4px)',
  			sm: 'calc(var(--radius) - 8px)',
        xl: '1.5rem',
        '2xl': '2rem',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
          dark: 'hsl(var(--primary-dark))',
          tint: 'hsl(var(--primary-tint))',
  			},
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          dark: 'hsl(var(--accent-dark))',
        },
        reward: {
          DEFAULT: 'hsl(var(--reward))',
          foreground: 'hsl(var(--reward-foreground))',
          dark: 'hsl(var(--reward-dark))',
          tint: 'hsl(var(--reward-tint))',
        },
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--error))',
  				foreground: 'hsl(var(--error-foreground))'
  			},
        success: {
          DEFAULT: 'hsl(var(--success))',
          dark: 'hsl(var(--success-dark))',
          tint: 'hsl(var(--success-tint))',
          foreground: 'hsl(var(--success-foreground))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          dark: 'hsl(var(--error-dark))',
          tint: 'hsl(var(--error-tint))',
          foreground: 'hsl(var(--error-foreground))',
        },
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  safelist: [
    'bg-success', 'bg-success-tint', 'border-success', 'text-success',
    'bg-error', 'bg-error-tint', 'border-error', 'text-error',
    'bg-primary', 'bg-primary-tint', 'border-primary', 'text-primary',
    'bg-reward', 'bg-reward-tint', 'border-reward', 'text-reward',
    'shadow-3d-primary', 'shadow-3d-success', 'shadow-3d-error', 'shadow-3d-gray', 'shadow-3d-reward',
    'animate-mascot-wave', 'animate-mascot-bounce', 'animate-mascot-shake',
    'animate-mascot-think', 'animate-mascot-pulse', 'animate-mascot-sleep', 'animate-mascot-urgent',
  ],
  plugins: [require("tailwindcss-animate")],
}