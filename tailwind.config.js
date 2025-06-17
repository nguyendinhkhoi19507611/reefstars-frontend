/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          ocean: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            950: '#042f2e',
          },
          coral: {
            50: '#fef7ee',
            100: '#fdedd7',
            200: '#fad7ae',
            300: '#f6ba7a',
            400: '#f19544',
            500: '#ed7420',
            600: '#de5a16',
            700: '#b84515',
            800: '#933719',
            900: '#762f18',
            950: '#40160a',
          },
          reef: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
            950: '#022c22',
          }
        },
        backgroundImage: {
          'ocean-gradient': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #059669 100%)',
          'coral-gradient': 'linear-gradient(135deg, #f97316 0%, #ed7420 50%, #ea580c 100%)',
          'reef-gradient': 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
          'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.6s ease-out',
          'slide-down': 'slideDown 0.6s ease-out',
          'slide-left': 'slideLeft 0.6s ease-out',
          'slide-right': 'slideRight 0.6s ease-out',
          'scale-in': 'scaleIn 0.5s ease-out',
          'bounce-subtle': 'bounceSubtle 2s infinite',
          'float': 'float 3s ease-in-out infinite',
          'wave': 'wave 2s ease-in-out infinite',
          'pulse-slow': 'pulse 3s infinite',
          'spin-slow': 'spin 3s linear infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(30px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-30px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideLeft: {
            '0%': { transform: 'translateX(30px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          slideRight: {
            '0%': { transform: 'translateX(-30px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0.9)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          bounceSubtle: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          wave: {
            '0%, 100%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(5deg)' },
            '75%': { transform: 'rotate(-5deg)' },
          }
        },
        boxShadow: {
          'glow': '0 0 20px rgba(20, 184, 166, 0.4)',
          'glow-coral': '0 0 20px rgba(239, 116, 32, 0.4)',
          'glow-reef': '0 0 20px rgba(16, 185, 129, 0.4)',
          'ocean': '0 10px 40px rgba(14, 148, 136, 0.15)',
          'coral': '0 10px 40px rgba(239, 116, 32, 0.15)',
          'reef': '0 10px 40px rgba(16, 185, 129, 0.15)',
        },
        backdropBlur: {
          xs: '2px',
        },
        fontFamily: {
          'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
          'display': ['Inter', 'system-ui', 'sans-serif'],
          'body': ['Inter', 'system-ui', 'sans-serif'],
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
          '128': '32rem',
        },
        maxWidth: {
          '8xl': '88rem',
          '9xl': '96rem',
        },
        borderRadius: {
          '4xl': '2rem',
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
    future: {
      hoverOnlyWhenSupported: true,
    },
  }