import { useState } from 'react'
import { HandleDivDragEvent } from '../../types/drag-event'

interface Props {
  onDrop: HandleDivDragEvent
}

export function DraggableArea ({ onDrop }: Props) {
  const [dragging, setDragging] = useState(false)

  const stopEvent: HandleDivDragEvent = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  const stopDrag: HandleDivDragEvent = (evt) => {
    stopEvent(evt)
    setDragging(false)
  }

  const handleDrop: HandleDivDragEvent = (evt) => {
    stopDrag(evt)
    onDrop(evt)
  }

  const handleDragEnter: HandleDivDragEvent = (evt) => {
    stopEvent(evt)
    setDragging(true)
  }

  return (
    <div className='p-32 rounded-md overflow-hidden bg-zinc-900 class flex flex-col justify-center items-center gap-4 relative'>
      <div
        onDrop={handleDrop} onDragOver={stopEvent} onDragEnter={handleDragEnter} onDragLeave={stopDrag}
        className={`absolute inset-0 z-10 grid place-content-center transition-colors [&>*]:pointer-events-none ${dragging ? 'bg-gray-800' : ''}`}
      >
        {!dragging && <div>Drop your image here</div>}
        {dragging && (
          <svg xmlns='http://www.w3.org/2000/svg' className='transition-opacity animate-pulse' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M15 8h.01' />
            <path d='M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5' />
            <path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4' />
            <path d='M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54' />
            <path d='M16 19h6' />
            <path d='M19 16v6' />
          </svg>
        )}
      </div>
    </div>

  )
}
