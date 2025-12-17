'use client'
import { makePersistor, makeStore } from '@/store'
import { onboardingAppendForm, onboardingReset } from '@/store/onboarding'
import { brandReset } from '@/store/brand'
import { useEffect, useMemo } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from '@/app/providers/store/toast'
import { appSetTheme, appSetWindowSize } from '@/store/app'
import { DARK_MODE_CLASS } from '@/constants/theme'

export const StoreProvider = ({
  children,
  email,
}: {
  children: React.ReactNode
  email?: string | null
}) => {
  const { store, persistor } = useMemo(() => {
    const store = makeStore()
    const persistor = makePersistor(store)
    return { store, persistor }
  }, [])

  useEffect(() => {
    if (email) {
      store.dispatch(onboardingAppendForm({ email }))
    } else {
      // TODO: move to a central reset action
      store.dispatch(onboardingReset())
      store.dispatch(brandReset())
    }
  }, [email, store])

  useEffect(() => {
    if (!store) return
    const handleResize = () => {
      store.dispatch(
        appSetWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        }),
      )
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const checkDarkMode = () => {
      store.dispatch(
        appSetTheme(
          document.documentElement.classList.contains(DARK_MODE_CLASS)
            ? 'dark'
            : 'light',
        ),
      )
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [store])

  return (
    <Provider store={store}>
      {/* TODO: add loading state */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <ToastContainer />
      </PersistGate>
    </Provider>
  )
}
