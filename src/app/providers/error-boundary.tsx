'use client'
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex h-dvh items-center justify-center overflow-y-auto bg-red-50 dark:bg-red-900/10">
          <div className="max-w-md rounded-lg border border-red-200 bg-white p-6 shadow-lg dark:border-red-800 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-red-700 dark:text-red-400">
              Something went wrong
            </h2>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Error:</strong>
              </p>
              <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-700">
                {this.state.error?.toString()}
              </pre>
              {this.state.errorInfo && (
                <>
                  <p>
                    <strong>Component Stack:</strong>
                  </p>
                  <pre className="max-h-32 overflow-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-700">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </>
              )}
            </div>
            <button
              onClick={() =>
                this.setState({
                  hasError: false,
                  error: undefined,
                  errorInfo: undefined,
                })
              }
              className="mt-4 rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
