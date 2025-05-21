import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Form } from '@/components/form.tsx'


function App() {

  const tanstackQC = new QueryClient()



  return (
    <>
      <QueryClientProvider client={tanstackQC}>
        <Form />
      </QueryClientProvider>
    </>
  )
}

export default App
