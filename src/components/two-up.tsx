import { clamp } from '../utils/math'
import './two-up.css'
import { useEffect, useRef } from 'react'

interface Props {
  firstChild: JSX.Element
  secondChild: JSX.Element
}

export function TwoUp ({ firstChild, secondChild }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { current: handleCurrent } = handleRef
    const { current: containerCurrent } = containerRef
    if (containerCurrent == null || handleCurrent == null) return
    const initialBounding = containerCurrent.getBoundingClientRect()
    const initialX = initialBounding.width / 2
    containerCurrent.style.setProperty('--split-point', `${initialX}px`)

    const handleOnMove = (e: MouseEvent) => {
      const { left, width } = containerCurrent.getBoundingClientRect()
      const handleWidth = handleCurrent.getBoundingClientRect().width / 2
      const max = width - handleWidth
      const x = e.pageX - left
      const position = clamp(handleWidth, max, x)
      containerCurrent.style.setProperty('--split-point', `${position}px`)
    }
    containerCurrent.addEventListener('mousemove', handleOnMove)
    return () => {
      containerCurrent.removeEventListener('mousemove', handleOnMove)
    }
  }, [containerRef, handleRef])

  return (
    <div ref={containerRef} className='relative grid two-up-container'>
      <div className='two-up-child'>{firstChild}</div>
      <div className='two-up-child'>{secondChild}</div>
      <div ref={handleRef} className='two-up-handle'>
        <div className='scrubber'>
          <svg viewBox='0 0 27 20' fill='currentColor'>
            <path d='M17 19.2l9.5-9.6L16.9 0zM9.6 0L0 9.6l9.6 9.6z' />
          </svg>
        </div>
      </div>
    </div>
  )
}
