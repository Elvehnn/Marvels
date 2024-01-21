import React, { ErrorInfo, ReactNode } from 'react';
import { ErrorPage } from './ErrorPage';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Nullable<Error>;
  errorInfo: Nullable<ErrorInfo>;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: info,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage title={''} description={''} />;
    }

    return this.props.children;
  }
}
