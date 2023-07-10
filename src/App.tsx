import { TwoUp } from './components/two-up'

function App () {
  return (
    <main className='max-w-2xl h-full m-auto relative pt-10'>
      <header className='fixed top-0 inset-x-0 max-w-2xl m-auto bg-zinc-900 border-b'>
        <h1 className='text-xl font-semibold'>Background Remover</h1>
      </header>
      <section className='h-full grid place-content-center'>
        <TwoUp
          firstChild={<img src='https://i.pinimg.com/564x/9d/87/4f/9d874f5d7fa7db611e61d993157cdfea.jpg' />}
          secondChild={<img src='https://o.remove.bg/downloads/9c06f09e-b8b6-4baf-9e7f-0840a9d5ca4e/9d874f5d7fa7db611e61d993157cdfea-removebg-preview.png' />}
        />
      </section>
    </main>
  )
}

export default App
