---
name: Zahrat Al Falah Design System
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#121212'
  on-primary-container: '#7e7d7d'
  inverse-primary: '#5f5e5e'
  secondary: '#e9c176'
  on-secondary: '#412d00'
  secondary-container: '#604403'
  on-secondary-container: '#dab36a'
  tertiary: '#cac6c3'
  on-tertiary: '#32302f'
  tertiary-container: '#131211'
  on-tertiary-container: '#807d7b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
  background-dark: '#121212'
  background-surface: '#1E1E1E'
  accent-gold: '#C5A059'
  accent-bronze: '#8E6F3E'
  text-primary: '#FFFFFF'
  text-muted: '#A0A0A0'
  text-on-light: '#121212'
typography:
  display-lg:
    fontFamily: Work Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  title-sm:
    fontFamily: Work Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 16px
  margin-edge: 24px
  section-gap: 80px
---

Design System & Styling | نظام التصميم1. Color Palette | لوحة الألوانBased on the provided company profile, the brand relies on a premium, high-contrast palette:Primary Background: Dark Charcoal/Soft Black (Used extensively for headers, footers, and logo background).Accent Color: Gold / Bronze / Mustard Yellow (Used for borders around images, highlight text, and dividers).Text Colors: * White (on dark backgrounds)Dark Grey/Black (on light backgrounds for readability)2. Typography | الخطوطTo maintain a cohesive look across both language settings, you'll need web fonts that support both English and Arabic gracefully.Arabic Font Suggestion: Cairo or Tajawal (Clean, modern geometric sans-serifs that look professional for contracting).English Font Suggestion: Montserrat or Roboto (Pairs well with geometric Arabic fonts).Direction: Ensure global CSS handles dir="rtl" for Arabic and dir="ltr" for English to mirror the layout properly.3. UI/UX Elements | عناصر واجهة المستخدمImage Grids: The portfolio sections (Sinks, Floors, Walls) use a tight, uniform masonry or CSS Grid layout. Images have thin Gold/Bronze borders.Hero Banner: The top of the page should likely feature the stylized "ZF" logo  prominently against the dark charcoal background.Image Assets Structure | هيكل الصورTo keep your project folder organized for both languages, you should map the images into a central assets folder. Here is how you can document the image references in your markdown:Logo![Zahrat Al Falah Logo](/assets/images/brand/zf-logo-dark.png)Portfolio: Sinks & Bathrooms / المغاسل والحمامات![Modern Sink Design 1](/assets/images/portfolio/sinks/sink-01.jpg)![Modern Sink Design 2](/assets/images/portfolio/sinks/sink-02.jpg)(Grid layout continues for all 12 images in this section)Portfolio: Floors & Stairs / الأرضيات والسلالم![Marble Staircase](/assets/images/portfolio/floors/stairs-01.jpg)![Geometric Floor Pattern](/assets/images/portfolio/floors/floor-pattern-01.jpg)(Grid layout continues for all 12 images in this section)Portfolio: Walls & Facades / الجدران والواجهات![Exterior Building Facade](/assets/images/portfolio/walls/facade-01.jpg)![Illuminated Wall Design](/assets/images/portfolio/walls/wall-light-01.jpg)(Grid layout continues for all 12 images in this section)Clients / عملاؤنا![King Faisal Hospital Logo](/assets/images/clients/king-faisal.png)![Damac Logo](/assets/images/clients/damac.png)![Four Seasons Logo](/assets/images/clients/four-seasons.png)