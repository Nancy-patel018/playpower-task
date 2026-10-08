import { useEffect } from 'react';

interface KeyboardNavOptions {
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEscape?: () => void;
  enabled?: boolean;
}

/**
 * Custom hook for keyboard navigation (Arrows & Escape key listeners).
 */
export function useKeyboardNav({
  onArrowLeft,
  onArrowRight,
  onEscape,
  enabled = true,
}: KeyboardNavOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (onArrowLeft) {
            event.preventDefault();
            onArrowLeft();
          }
          break;
        case 'ArrowRight':
          if (onArrowRight) {
            event.preventDefault();
            onArrowRight();
          }
          break;
        case 'Escape':
          if (onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onArrowLeft, onArrowRight, onEscape, enabled]);
}
