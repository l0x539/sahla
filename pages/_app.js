import '../scss/main.scss';
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
}

export default MyApp
