import React, { Suspense, Component, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useLazyLoading } from '@/hooks/useLazyLoading';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
          <div className="text-red-600 text-lg font-semibold mb-4">
            Something went wrong
          </div>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

interface LazyPageProps {
  children: ReactNode;
  loadingText?: string;
  componentName?: string;
}

const LazyPage: React.FC<LazyPageProps> = ({ 
  children, 
  loadingText = 'Loading page...',
  componentName = 'Unknown Component'
}) => {
  // Monitor lazy loading performance
  useLazyLoading(componentName);

  return (
    <ErrorBoundary componentName={componentName}>
      <Suspense fallback={<LoadingSpinner size="lg" text={loadingText} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyPage; 