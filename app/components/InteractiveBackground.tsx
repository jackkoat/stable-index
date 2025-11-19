// =====================================================
// Interactive Background Component
// =====================================================
// Clean, interactive background with subtle animations
// Aligned with the app's color palette and design approach
// =====================================================

// =====================================================
// Interactive Background Component
// =====================================================
// Clean, interactive background with subtle animations
// Aligned with the app's color palette and design approach
// =====================================================

export function InteractiveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-secondary via-white to-surface-tertiary" />

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-navy/5 rounded-full blur-xl" />
    </div>
  );
}