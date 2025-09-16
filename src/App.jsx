import { Navigate, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PokemonsList from './components/PokemonsList'
import PokemonDetail from './components/PokemonDetail'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<PokemonsList />} />
        <Route path='/pokemon/:id' element={<PokemonDetail />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
