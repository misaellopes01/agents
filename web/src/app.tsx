import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CreateRoom } from './pages/create-room'
import { Room } from './pages/room'

export function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index />
          <Route element={<Room />} path="/room/:id" />
          {/* Add other routes here as needed */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
