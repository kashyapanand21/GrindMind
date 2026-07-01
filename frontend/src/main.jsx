import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthGuard } from 'lemma-sdk/react'
import { lemmaClient } from './lemma-client'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthGuard
        client={lemmaClient}
        loadingFallback={<div>Loading access...</div>}
      >
        <App />
      </AuthGuard>
    </QueryClientProvider>
  </StrictMode>,
)
