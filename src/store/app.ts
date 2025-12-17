import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { ReducersName } from './constants'
import type { RootState } from '.'
import { isClient } from '@/utils/ssr'
import { DARK_MODE_CLASS } from '@/constants/theme'

const GLOBAL_ERROR_ID = 'global-error'

interface ToastMessage {
  message: string
  type: 'error' | 'warning' | 'info'
  id: string
}

interface AppState {
  toastMessages: ToastMessage[]
  windowSize: { width: number; height: number }
  theme: 'light' | 'dark'
}
const initialState: AppState = {
  toastMessages: [],
  windowSize: {
    width: isClient() ? window.innerWidth : 0,
    height: isClient() ? window.innerHeight : 0,
  },

  theme: isClient()
    ? document.documentElement.classList.contains(DARK_MODE_CLASS)
      ? 'dark'
      : 'light'
    : 'light',
}

const appSlice = createSlice({
  name: ReducersName.App,
  initialState,
  reducers: {
    appAddToastMessage: (
      state,
      action: PayloadAction<Omit<ToastMessage, 'id'>>,
    ) => {
      state.toastMessages.push({
        ...action.payload,
        id: crypto.randomUUID(),
      })
    },
    appRemoveToastMessage: (state, action: PayloadAction<string>) => {
      state.toastMessages = state.toastMessages.filter(
        message => message.id !== action.payload,
      )
    },
    appAddToastGlobalError: state => {
      state.toastMessages.push({
        message: 'Something went wrong. Please try again later.',
        type: 'error',
        id: GLOBAL_ERROR_ID,
      })
    },
    appRemoveToastGlobalError: state => {
      state.toastMessages = state.toastMessages.filter(
        message => message.id !== GLOBAL_ERROR_ID,
      )
    },
    appSetWindowSize: (
      state,
      action: PayloadAction<AppState['windowSize']>,
    ) => {
      state.windowSize = action.payload
    },
    appSetTheme: (state, action: PayloadAction<AppState['theme']>) => {
      state.theme = action.payload
    },
  },
})

export const {
  appAddToastMessage,
  appRemoveToastMessage,

  appSetWindowSize,
  appSetTheme,
} = appSlice.actions
export const appReducer = appSlice.reducer

const appSelectState = (state: RootState) => state[ReducersName.App]

export const appSelectToastMessages = createSelector(
  [appSelectState],
  state => state.toastMessages,
)

export const appSelectIsDesktop = createSelector(
  [appSelectState],
  state => state.windowSize?.width >= 1024,
)

export const appSelectIsMobile = createSelector(
  [appSelectState],
  state => state.windowSize?.width < 1024,
)

export const appSelectIsDarkMode = createSelector(
  [appSelectState],
  state => state.theme === 'dark',
)
