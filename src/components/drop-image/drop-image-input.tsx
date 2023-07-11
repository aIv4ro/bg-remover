import { useRef, useState } from 'react'
import { DraggableArea } from './draggable-area'
import { HandleDivDragEvent } from '../../types/drag-event'

interface Props {
  handleChange: (file: File) => void
  title?: string
  inputLabel?: string
  description?: string
  loading?: boolean
  LoadingPlaceholder?: JSX.Element | undefined
  ImagePreview?: JSX.Element | undefined
}

function useDropImageInput () {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, _setFile] = useState<File | null>(null)

  const removeFile = () => {
    _setFile(null)
    if (inputRef.current != null) {
      inputRef.current.files = null
      inputRef.current.value = ''
    }
  }

  const setFile = (newFile: File) => {
    _setFile(newFile)
    if (inputRef.current != null) {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(newFile)
      inputRef.current.files = dataTransfer.files
      inputRef.current.value = newFile.webkitRelativePath
    }
  }

  return { inputRef, file, removeFile, setFile }
}

export function DropImageInput ({
  handleChange,
  title = 'Upload your image',
  description = 'File should be Jpeg, Png...',
  inputLabel = 'Choose a file',
  loading = false,
  LoadingPlaceholder,
  ImagePreview
}: Props) {
  const { inputRef, file, removeFile, setFile } = useDropImageInput()

  const handleDrop: HandleDivDragEvent = evt => {
    const [file] = evt.dataTransfer.files
    if (file != null) {
      setFile(file)
    }
  }

  const handleInputChange = () => {
    console.log(inputRef.current?.value)
    const [file] = inputRef.current?.files ?? []
    if (file != null) {
      setFile(file)
      handleChange(file)
    }
  }

  return (
    <div className='bg-zinc-800 font-semibold py-10 px-20 rounded-md flex flex-col items-center justify-center gap-3 relative'>
      {loading && LoadingPlaceholder}
      {file != null && ImagePreview != null && !loading && ImagePreview}
      {(file == null || ImagePreview == null) && !loading && (
        <>
          <h4 className='text-xl'>{title}</h4>
          <small className='mb-5 '>{description}</small>
          <div
            className='px-10 py-8 rounded-md overflow-hidden bg-zinc-900 class flex flex-col justify-center items-center gap-4 relative'
          >
            <DraggableArea onDrop={handleDrop} />
          </div>
          <span>Or</span>
          <label htmlFor='file-input' className='bg-zinc-700 rounded-lg px-5 py-2 cursor-pointer hover:bg-zinc-600 transition-colors'>
            {inputLabel}
          </label>
          <input ref={inputRef} id='file-input' type='file' className='hidden' accept='image/*' onChange={handleInputChange} />
        </>
      )}
      <button
        className='text-red-700 hover:text-red-400 transition-colors absolute -top-2 -right-2 bg-zinc-950 rounded-full p-1'
        onClick={removeFile}
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M18 6l-12 12' />
          <path d='M6 6l12 12' />
        </svg>
      </button>
    </div>
  )
}
