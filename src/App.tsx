import { TwoUp } from './components/two-up'

function App () {
  return (
    <main className='max-w-2xl h-full m-auto relative pt-10'>
      <header className='fixed top-0 inset-x-0 max-w-2xl m-auto bg-zinc-900 border-b'>
        <h1 className='text-xl font-semibold'>Background Remover</h1>
      </header>
      <section className='h-full grid place-content-center'>
        <TwoUp
          firstChild={<img src='/dog.jpg' />}
          secondChild={<img src='/dog-removed.png' />}
        />
      </section>
    </main>
  )
}

export default App
