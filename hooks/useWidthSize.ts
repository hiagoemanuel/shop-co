import { useState, useEffect } from 'react'

export function useWidthSize(): number {
  const [widthSize, setWindowSize] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return widthSize
}
