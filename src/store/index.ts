import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { onboardingReducer } from './onboarding'
import { ReducersName } from './constants'
import { brandReducer } from '@/store/brand'
import { appReducer } from './app'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({
  [ReducersName.Onboarding]: onboardingReducer,
  [ReducersName.Brand]: brandReducer,
  [ReducersName.App]: appReducer,
})

const ROOT_PERSIST_KEY = 'nexus-signup-root'
const persistedReducer = persistReducer(
  {
    key: ROOT_PERSIST_KEY,
    storage,
    blacklist: [ReducersName.App],
  },
  rootReducer,
)

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'persist/PERSIST',
            'persist/REHYDRATE',
            'persist/FLUSH',
            'persist/PAUSE',
            'persist/PURGE',
            'persist/REGISTER',
          ],
        },
      }),
  })
}

export const makePersistor = (store: AppStore) => persistStore(store)

type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
