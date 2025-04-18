"use client"

import { useEffect, useRef } from 'react'

export function WaveGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let gradient: CanvasGradient

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, 'rgba(76, 29, 149, 0.5)') // purple-900
      gradient.addColorStop(0.5, 'rgba(20, 20, 20, 0.5)') // near-black
      gradient.addColorStop(1, 'rgba(76, 29, 149, 0.5)') // purple-900
    }

    window.addEventListener('resize', resize)
    resize()

    const waves = [
      { y: 0.3, length: 0.5, amplitude: 20, speed: 0.004 },
      { y: 0.4, length: 0.7, amplitude: 15, speed: 0.002 },
      { y: 0.5, length: 0.9, amplitude: 25, speed: 0.001 },
    ]

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height * wave.y)

        for (let x = 0; x < canvas.width; x++) {
          const dx = x
          const dy =
            Math.sin(dx * wave.length * 0.01 + time * wave.speed) * wave.amplitude
          ctx.lineTo(x, canvas.height * wave.y + dy)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = gradient
        ctx.fill()
      })

      time += 1
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-80"
      style={{ filter: 'blur(30px)' }}
    />
  )
}

