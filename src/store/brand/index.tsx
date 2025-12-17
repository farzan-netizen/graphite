import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '@/store'

import { ReducersName } from '../constants'
import { adjustColorBrightness, detectBrandFromUrl } from './utils'
import { getBrand } from '@/app/server-actions/brand'

export interface BrandState {
  name?: string
  domain?: string
  logos?: {
    theme?: string
    formats?: {
      src: string
      format?: string
      width?: number
      height?: number
    }[]
    type?: string
  }[]
  colors?: {
    hex: string
    type?: string
    brightness?: number
  }[]
  company?: {
    employees?: number
    industries?: {
      id: string
      name: string
      emoji?: string
      score?: number
      slug?: string
    }[]
  }
}

const initialState: BrandState = {}

const brandSlice = createSlice({
  name: ReducersName.Brand,
  initialState,
  reducers: {
    brandSetData: (state, action: PayloadAction<BrandState>) => {
      state = { ...action.payload }
      return state
    },
    brandAppendData: (state, action: PayloadAction<Partial<BrandState>>) => {
      state = { ...state, ...action.payload }
      return state
    },
    brandReset: () => {
      return initialState
    },
  },
})

export const { brandSetData, brandReset } = brandSlice.actions

export const brandFetchData =
  (identifier: string) => async (dispatch: AppDispatch) => {
    const result = await getBrand({ identifier })
    if (result.success) {
      dispatch(brandSetData(result.data))
      return result.data
    }
    // If API call failed, try to detect brand from URL as fallback
    const data = detectBrandFromUrl(identifier)
    if (!data) {
      throw new Error(result.error)
    }
    const primaryColor = data.primaryColor
    const newData: BrandState = {
      logos: [
        {
          formats: [
            {
              src: data.logo,
            },
          ],
        },
      ],
      name: data.name,
      colors: [
        {
          hex: primaryColor,
        },
        { hex: adjustColorBrightness(primaryColor, 20) },
        { hex: adjustColorBrightness(primaryColor, -20) },
      ],
    }
    dispatch(brandSetData(newData))
    return newData
  }
export const brandReducer = brandSlice.reducer

export const brandSelectState = (state: RootState) => state[ReducersName.Brand]
