import { createClient } from 'contentful'

export const useContentful = () => {
  const config = useRuntimeConfig()
  const {
    space,
    environment,
    accessToken,
  } = config.public

  return createClient({
    space,
    environment,
    accessToken,
  })
}
