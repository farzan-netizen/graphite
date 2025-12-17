import type React from 'react'

type ReactComponent =
  | React.FC<Record<string, unknown>>
  | React.ComponentClass<unknown, unknown>

const isFunctionComponent = (
  component: unknown,
): component is React.FC<unknown> => {
  return typeof component === 'function'
}

const isClassComponent = (
  component: unknown,
): component is React.ComponentClass<unknown, unknown> => {
  return (
    typeof component === 'function' &&
    component.prototype &&
    (!!component.prototype.isReactComponent || !!component.prototype.render)
  )
}

const isForwardRefComponent = (
  component: unknown,
): component is React.ForwardRefExoticComponent<unknown> => {
  return (
    typeof component === 'object' &&
    component !== null &&
    typeof (component as { $$typeof?: unknown }).$$typeof === 'symbol' &&
    (component as { $$typeof: symbol }).$$typeof.description ===
      'react.forward_ref'
  )
}

/**
 * Checks if a given value is a valid React component.
 */
export const isReactComponent = (
  component: unknown,
): component is ReactComponent => {
  return (
    isFunctionComponent(component) ||
    isForwardRefComponent(component) ||
    isClassComponent(component)
  )
}
