import { Component, ReactNode } from 'react'
import { Text } from 'react-native'

interface ErrorBoundaryState {
  hasError: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('Current error in ErrorBoundary', error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You could log the error to an error reporting service
    console.log('In ErrorBoundary: Component did catch', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Render any custom fallback UI
      return <Text>Something went wrong.</Text>
    }

    return this.props.children
  }
}

export default ErrorBoundary
