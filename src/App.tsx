import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Form } from '@/components/form.tsx'


function App() {

  const tanstackQC = new QueryClient()



  return (
    <>
      <QueryClientProvider client={tanstackQC}>
        <div className="app">
          <Form />
        </div>
      </QueryClientProvider>
    </>
  )
}

export default App
