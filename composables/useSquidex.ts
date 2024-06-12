import { SquidexClient } from '@squidex/squidex'

export const useSquidex = () => {
  const config = useRuntimeConfig()
  const {
    appName,
    clientId,
    clientSecret,
    environment,
  } = config.public as unknown as never

  const client = new SquidexClient({
    appName,
    clientId,
    clientSecret,
    environment,
  })

  return { client }
}
