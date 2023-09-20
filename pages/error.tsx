import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log({ error, errorInfo });
    }

    handleTryAgainClick = () => {
        this.setState({ hasError: false });
    };

    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            console.error(`Error occured`)
            return (
                <div className="container w-screen h-screen">
                <h2>Oops, there is an error!</h2>
                <button type="button" onClick={this.handleTryAgainClick}>
                    Try again?
                </button>
                </div>
            );
        }

        // Return children components in case of no error
        return this.props.children;
    }
}

export default ErrorBoundary;