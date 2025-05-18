import { ViewStyle } from 'react-native';

/**
 * Application color palette.
 * Defines all colors used throughout the app for consistency.
 */
export const COLORS = {
  primary: '#007AFF',
  primaryLight: 'rgba(0, 122, 255, 0.1)',
  text: '#000',
  textLight: 'rgba(0, 0, 0, 0.4)',
  background: '#F9F9F9',
  white: '#fff',
  disabled: '#F0F0F0',
  iconLight: 'rgba(0, 0, 0, 0.2)',
  iconMedium: 'rgba(0, 0, 0, 0.3)',
} as const;

/**
 * Spacing constants for consistent layout throughout the app.
 */
export const SPACING = {
  horizontal: 16,
  vertical: {
    xs: 4,
    sm: 6,
    md: 12,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
} as const;

/**
 * Typography constants defining font sizes and weights.
 */
export const FONT = {
  title: {
    size: 34,
    weight: 'bold' as const,
  },
  section: {
    size: 20,
    weight: '600' as const,
  },
  task: {
    size: 16,
    weight: '500' as const,
  },
} as const;

/**
 * Checkbox dimensions for consistent sizing across the app.
 */
export const CHECKBOX_SIZE = {
  container: 20,
  box: 28,
  icon: 18,
} as const;

/**
 * Common shadow style for elevated components.
 * Used to maintain consistent elevation across the app.
 */
export const shadowStyle: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 2,
}; 