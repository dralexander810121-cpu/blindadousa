---
name: Financial Bible
colors:
  surface: '#f9faf6'
  surface-dim: '#dadad7'
  surface-bright: '#f9faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#414844'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f0f1ee'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#8e4e14'
  on-secondary: '#ffffff'
  secondary-container: '#ffab69'
  on-secondary-container: '#783d01'
  tertiary: '#342300'
  on-tertiary: '#ffffff'
  tertiary-container: '#503700'
  on-tertiary-container: '#d89b00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#ffb780'
  on-secondary-fixed: '#2f1400'
  on-secondary-fixed-variant: '#6f3800'
  tertiary-fixed: '#ffdea9'
  tertiary-fixed-dim: '#ffba27'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4100'
  background: '#f9faf6'
  on-background: '#1a1c1a'
  surface-variant: '#e2e3e0'
  primary-mid: '#2D6A4F'
  primary-light: '#40916C'
  pale-green: '#D8F3DC'
  accent-dark: '#E76F51'
  danger: '#D62828'
  warning: '#F77F00'
  success: '#52B788'
  dark: '#1A1A2E'
  gray: '#6B7280'
typography:
  display-lg:
    fontFamily: Bebas Neue
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  display-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  touch-target: 48px
  gutter: 1rem
  margin-mobile: 1.25rem
  margin-desktop: 2.5rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

This design system is engineered to be the "Financial Bible" for the Hispanic community in the United States. The brand personality is authoritative and serious, yet deeply empathetic and accessible. It balances the gravity of legal and financial services with the warmth of a community advocate.

The design style is **Corporate / Modern** with a strong emphasis on **High-Contrast** accessibility. It prioritizes clarity over decoration, utilizing a "5th Grade Level" simplicity philosophy to reduce cognitive load. The UI must feel robust and trustworthy, employing heavy-duty touch targets and a clear visual hierarchy that guides users through complex financial data without overwhelming them.

Key visual principles:
- **Mobile-First Utility:** Every component is optimized for thumb-driven interaction and small-screen legibility.
- **Immediate Utility:** Technical data is always paired with real-world explanations and linguistic simplicity.
- **Semantic Clarity:** Using a "Traffic Light" (Semáforo) system to provide instant, non-verbal feedback on financial health.

## Colors

The palette is anchored by "Trust Green," a deep, institutional emerald that evokes stability and growth. This is contrasted by a vibrant "Action Orange" for primary interactions and a "Premium Gold" for highlights and achievement.

- **Primary (#1B4332):** Used for core branding, navigation, and high-authority backgrounds.
- **Secondary (#F4A261):** The primary CTA color. It must stand out against the green to drive conversions.
- **Tertiary (#FFB703):** Reserved for "Premium" or "Featured" status and credit score highlights.
- **Status (The Semáforo):** A strict adherence to the traffic light system is required. Use `danger` (Red) for critical alerts or low scores, `warning` (Yellow) for caution, and `success` (Green) for positive outcomes.
- **Neutral:** Backgrounds should primarily use `white` or the ultra-light `pale-green` to maintain a clean, airy feel between dense data modules.

## Typography

Typography is split between high-impact display faces and highly legible functional faces.

- **Display:** **Bebas Neue** is used for "hero" headlines, large numeric scores, and impact statements. It should feel loud and commanding.
- **Body & Headings:** **Inter** is the workhorse for all instructional text. A minimum size of **16px** is enforced across all mobile views to ensure accessibility for all age groups.
- **Data:** **JetBrains Mono** is used specifically for financial figures, percentages, and credit scores to ensure numeric clarity and alignment.

**Rules:**
- All icons must be accompanied by a label using the `label-sm` style.
- Avoid all-caps for body text; reserve it for labels and display headers.
- Maintain high contrast ratios (minimum 4.5:1) for all text against backgrounds.

## Layout & Spacing

The layout philosophy is **Mobile-First Fluid**. Elements are designed to stack vertically on mobile, maximizing the horizontal real estate for touch targets and readability.

- **Grid:** A standard 12-column grid is used for desktop, but mobile layouts typically utilize a single-column stack with full-width (100%) buttons.
- **Touch Targets:** A strict minimum of **48px** height is required for all interactive elements (buttons, inputs, toggles).
- **Rhythm:** Use a consistent 8px/4px baseline grid. Vertical spacing between different "Problem" or "Solution" modules should be generous (`stack-lg`) to clearly separate distinct concepts.
- **Layout Model:** High-impact "Cards" are used to group related information, such as the 13-module "Solution" grid. These cards should reflow from a single column on mobile to a multi-column grid on tablet and desktop.

## Elevation & Depth

This system uses **Tonal Layering** supplemented by specific **Colored Shadows** to denote importance without cluttering the interface.

- **Primary Elevation:** Most cards are flat with a low-contrast 1px border.
- **The "Sombra Verde":** For high-priority items like the primary pricing tier or "Featured" results, apply a subtle, diffused shadow tinted with the primary green hue (`#1B4332` at 10-15% opacity).
- **Floating Elements:** The AI Assistant is the highest layer in the stack, positioned in the bottom-right corner with a standard ambient shadow to signify it sits above the page content.
- **State Feedback:** Use Loading Skeletons for all asynchronous content to maintain the structure of the page while data is being fetched.

## Shapes

The shape language is **Rounded**, conveying friendliness and approachability while maintaining professional structure.

- **Standard Radius:** 0.5rem (8px) is the default for buttons, input fields, and small cards.
- **Container Radius:** Larger containers and section backgrounds use 1rem (16px) to soften the "Financial Bible" aesthetic.
- **The Semáforo:** Status indicators and "ScoreGauges" use circular or semi-circular (180° arc) shapes to provide a soft, intuitive reading of data.
- **Borders:** Use **Gold (#FFB703)** 2px borders for Premium/Featured listings and **Secondary (#F4A261)** for active trials or promotional banners.

## Components

### Buttons
- **Primary CTA:** Large, 100% width on mobile, `#F4A261` background with bold `dark` text. Minimum height 48px.
- **Secondary:** Outlined with `#1B4332` or solid `pale-green` for less urgent actions.

### The Semáforo (Traffic Light)
- A specialized status component. Must include an icon, a color-coded label (Red/Yellow/Green), and a short descriptive sentence explaining the status in simple Spanish.

### Cards
- **The Problem Cards:** Simple, high-contrast containers that highlight pain points.
- **The Solution Grid:** A 13-module consistent card system where each module represents a specific financial or legal tool.

### ScoreGauge
- A 180° SVG arc visualization for credit scores. It uses the Semáforo color logic (Red to Green) across the arc, with a central needle or large numeric value using **JetBrains Mono**.

### Input Fields & Toggles
- High-contrast borders. Specialized toggles for **ITIN vs. SSN** selection are mandatory, featuring clear, large labels.

### Floating AI Assistant
- A persistent, circular component in the bottom-right corner. It should be visually distinct (using the primary-mid gradient) to remain accessible at all times.