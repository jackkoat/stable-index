// =====================================================
// Shared Utility Components
// =====================================================
// Reusable utility components for common patterns
// Optimized for bundle size
// =====================================================

import React from 'react';
import ReactDOM from 'react-dom';

// Empty state component
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  className = "" 
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      {icon && (
        <div className="mx-auto h-12 w-12 text-text-muted mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-heading-sm font-semibold text-text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-body text-text-muted mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

// Error state component
interface ErrorStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  retry?: () => void;
  className?: string;
}

export function ErrorState({ 
  icon, 
  title, 
  description, 
  retry, 
  className = "" 
}: ErrorStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      {icon && (
        <div className="mx-auto h-12 w-12 text-red-500 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-heading-sm font-semibold text-text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-body text-text-muted mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {retry && (
        <button 
          onClick={retry}
          className="btn-secondary"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Badge component
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ 
  variant = 'default', 
  size = 'md', 
  children, 
  className = "" 
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-caption',
    lg: 'px-3 py-1 text-body'
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </span>
  );
}

// Tooltip component
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top',
  className = "" 
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-neutral-900',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-neutral-900',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-neutral-900',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-neutral-900'
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`
          absolute z-50 px-3 py-2 text-sm text-white bg-neutral-900 rounded-lg shadow-lg
          whitespace-nowrap
          ${positionClasses[position]}
        `}>
          {content}
          <div className={`
            absolute w-0 h-0 border-4
            ${arrowClasses[position]}
          `}></div>
        </div>
      )}
    </div>
  );
}

// Divider component
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children?: React.ReactNode;
}

export function Divider({ 
  orientation = 'horizontal', 
  className = "",
  children 
}: DividerProps) {
  if (children) {
    return (
      <div className={`
        flex items-center
        ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}
        ${className}
      `}>
        <div className={`
          border-neutral-200
          ${orientation === 'horizontal' ? 'flex-1 border-t' : 'flex-1 border-l h-auto'}
        `}></div>
        <div className={`
          px-3 text-caption text-text-muted
          ${orientation === 'horizontal' ? 'whitespace-nowrap' : 'whitespace-nowrap transform -rotate-90'}
        `}>
          {children}
        </div>
        <div className={`
          border-neutral-200
          ${orientation === 'horizontal' ? 'flex-1 border-t' : 'flex-1 border-l h-auto'}
        `}></div>
      </div>
    );
  }

  return (
    <div className={`
      border-neutral-200
      ${orientation === 'horizontal' ? 'border-t w-full' : 'border-l h-full'}
      ${className}
    `}></div>
  );
}

// Portal component for rendering children outside DOM hierarchy
interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

export function Portal({ children, container }: PortalProps) {
  const [portalElement, setPortalElement] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const element = container || document.body;
    setPortalElement(element);
  }, [container]);

  if (!portalElement) return null;

  return ReactDOM.createPortal(children, portalElement);
}

// Modal component (simplified)
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className = "" 
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-neutral-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className={`
          inline-block w-full overflow-hidden text-left align-bottom transition-all transform
          bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle
          ${sizeClasses[size]}
          ${className}
        `}>
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h3 className="text-heading-md font-semibold text-text-primary">
                {title}
              </h3>
              <button 
                onClick={onClose}
                className="text-text-muted hover:text-text-primary"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}