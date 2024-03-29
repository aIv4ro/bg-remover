import { useState } from 'react'
import { DropImageInput } from './components/drop-image/drop-image-input'
import { TwoUp } from './components/two-up/two-up'
import removeBackground, { type Config } from '@imgly/background-removal'

const fileAsUrl = async (file: File | Blob): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

const progressTypes = {
  fetch: 'Downloading',
  compute: 'Processing'
}

const progressSubtypes = {
  inference: 'image'
}

function App () {
  const [filePath, setFilePath] = useState<string | null>(null)
  const [removedBgPath, setRemovedBgPath] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState<'small' | 'medium'>('small')
  const [progress, setProgress] = useState<string | null>(null)

  const removeBgConfig: Config = {
    model,
    progress: (key: string, current: number, total: number) => {
      const [type, subtype] = key.split(':')
      const formattedType = progressTypes[type as keyof typeof progressTypes] ?? type
      const formattedSubtype = progressSubtypes[subtype as keyof typeof progressSubtypes] ?? subtype
      setProgress(`${formattedType} ${formattedSubtype}: ${((current / total) * 100).toFixed(0)}%`)
    }
  }

  function handleFileChange (file: File): void {
    setLoading(true)
    removeBackground(file, removeBgConfig)
      .then(async res => {
        return await Promise.all([
          fileAsUrl(file),
          fileAsUrl(res)
        ])
      })
      .then(([fileUrl, removedBgUrl]) => {
        setFilePath(fileUrl)
        setRemovedBgPath(removedBgUrl)
      })
      .catch(err => console.log('error removing', err))
      .finally(() => {
        setLoading(false)
        setProgress(null)
      })
  }

  return (
    <main className='max-w-2xl h-full m-auto relative pt-10'>
      <header className='fixed top-0 inset-x-0 max-w-2xl m-auto bg-zinc-900 border-b flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Background Remover</h1>
        <div className='flex gap-3 items-center'>
          <label htmlFor='model' className='text-sm font-semibold'>
            Model:
          </label>
          <select id='model' onChange={evt => setModel(evt.target.value as 'small' | 'medium')} defaultValue='small' className='border text-sm rounded-lg block bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'>
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
          </select>
        </div>
      </header>
      <section className='h-full grid place-content-center'>
        <DropImageInput
          handleChange={handleFileChange}
          loading={loading}
          LoadingPlaceholder={
            <div className='flex flex-col items-center justify-center gap-2'>
              <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900' />
              <h4 className='text-xl'>Loading...</h4>
              {progress != null && <p className='text-sm text-gray-400 max-w-[50ch'>{progress}</p>}
            </div>
          }
          ImagePreview={
            <>
              <TwoUp
                firstChild={<img src={filePath ?? ''} />}
                secondChild={<img src={removedBgPath ?? ''} />}
              />
              <a
                href={removedBgPath!}
                download='removed-background.png'
                className='p-2 bg-gray-700 rounded hover:text-blue-400 transition-colors'
              >
                Download Image
              </a>
            </>
          }
        />
      </section>
    </main>
  )
}

export default App
