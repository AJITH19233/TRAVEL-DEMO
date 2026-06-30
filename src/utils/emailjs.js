// EmailJS configuration helper
// Replace these with your actual EmailJS credentials from https://www.emailjs.com

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
}

/**
 * EmailJS template variables to configure:
 * {{from_name}}           - Traveler's full name
 * {{from_email}}          - Traveler's email
 * {{phone}}               - Phone number
 * {{destination_from}}    - Origin city
 * {{destination_to}}      - Destination
 * {{travel_date}}         - Planned travel date
 * {{number_of_days}}      - Duration
 * {{adults}}              - Number of adults
 * {{children}}            - Number of children
 * {{total_people}}        - Adults + children (auto-calculated)
 * {{budget}}              - Budget (optional)
 * {{special_requirements}} - Special notes
 */
