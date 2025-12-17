import { EnvVariables } from '@/constants/env-variables'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export const useGetRecaptchaToken = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const getRecaptchaToken = async () => {
    if (!executeRecaptcha || !EnvVariables.ENABLE_RECAPTCHA) return
    try {
      const token = await executeRecaptcha('login')
      return token
    } catch {
      throw new Error('Error during Recaptcha. Please try again.')
    }
  }
  return { getRecaptchaToken }
}
