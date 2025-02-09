import axios from 'axios'

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

api.interceptors.request.use(async (config) => {
  const apiDelay = Number(process.env.NEXT_PUBLIC_API_DELAY)
  if (apiDelay) await new Promise((resolve) => setTimeout(resolve, apiDelay))
  return config
})

export default api
