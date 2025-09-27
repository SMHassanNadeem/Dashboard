import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
import { GlobalProvider } from './global-context.jsx'
createRoot(document.getElementById('root')).render(
  <GlobalProvider><BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider >
  </BrowserRouter>
  </GlobalProvider>
)