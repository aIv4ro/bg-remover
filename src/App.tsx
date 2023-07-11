import { useState } from 'react'
import { DropImageInput } from './components/drop-image/drop-image-input'
import { TwoUp } from './components/two-up/two-up'

function App () {
  const [filePath, setFilePath] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange (file: File): void {
    const fr = new FileReader()
    fr.onload = () => {
      setFilePath(fr.result as string)
      setLoading(false)
    }
    setLoading(true)
    setTimeout(() => fr.readAsDataURL(file), 2000)
  }

  return (
    <main className='max-w-2xl h-full m-auto relative pt-10'>
      <header className='fixed top-0 inset-x-0 max-w-2xl m-auto bg-zinc-900 border-b'>
        <h1 className='text-xl font-semibold'>Background Remover</h1>
      </header>
      <section className='h-full grid place-content-center'>
        <DropImageInput
          handleChange={handleChange}
          loading={loading}
          LoadingPlaceholder={
            <div className='flex flex-col items-center justify-center gap-2'>
              <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900' />
              <h4 className='text-xl'>Loading...</h4>
            </div>
          }
          ImagePreview={
            <TwoUp
              firstChild={<img src={filePath ?? ''} />}
              secondChild={<img src={filePath ?? ''} />}
            />
          }
        />
      </section>
    </main>
  )
}

export default App
