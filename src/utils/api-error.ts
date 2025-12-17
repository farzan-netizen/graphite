export function getApiErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error
  }
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message
  }
  return 'Something went wrong'
}

/**
 * Extracts field-specific errors from GraphQL errors
 * Maps backend field names to frontend field names
 */
export function getFieldErrors(
  error: unknown,
  fieldMapping: Record<string, string[]>,
): Record<string, string> {
  const fieldErrors: Record<string, string> = {}

  if (!error || typeof error !== 'object') {
    return fieldErrors
  }

  // Check for GraphQL errors structure
  const graphQLErrors =
    'graphQLErrors' in error &&
    Array.isArray((error as { graphQLErrors?: unknown[] }).graphQLErrors)
      ? (
          error as {
            graphQLErrors: Array<{
              message?: string
              path?: unknown[]
              extensions?: unknown
            }>
          }
        ).graphQLErrors
      : []

  // Check for network error with GraphQL errors
  const networkError =
    'networkError' in error &&
    (error as { networkError?: { result?: { errors?: unknown[] } } })
      .networkError?.result?.errors

  const allErrors = [
    ...graphQLErrors,
    ...(Array.isArray(networkError) ? networkError : []),
  ]

  for (const err of allErrors) {
    if (!err || typeof err !== 'object') continue

    const message =
      'message' in err && typeof err.message === 'string' ? err.message : ''
    const path = 'path' in err && Array.isArray(err.path) ? err.path : []

    // Find the field name in the path (e.g., ["input", "name"])
    const fieldName = path.find(
      (p): p is string => typeof p === 'string' && p !== 'input',
    )

    if (fieldName && message) {
      // Map backend field name to frontend field names
      const frontendFields = fieldMapping[fieldName] || []
      for (const frontendField of frontendFields) {
        fieldErrors[frontendField] = message
      }
    }
  }

  return fieldErrors
}
