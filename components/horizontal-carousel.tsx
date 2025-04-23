"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { Scissors } from "lucide-react"

export default function HorizontalCarousel() {
  const controls = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animateCarousel = async () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.scrollWidth
      const viewportWidth = containerRef.current.offsetWidth

      // Only animate if content is wider than viewport
      if (containerWidth > viewportWidth) {
        await controls.start({
          x: [0, -containerWidth / 2],
          transition: {
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
        })
      }
    }

    animateCarousel()
  }, [controls])

  return (
    <div className="relative overflow-hidden py-10">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />

      <motion.div ref={containerRef} animate={controls} className="flex whitespace-nowrap">
        {Array(2)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex items-center">
              {Array(6)
                .fill(0)
                .map((_, itemIndex) => (
                  <div key={`${index}-${itemIndex}`} className="flex items-center mx-8">
                    <span className="text-6xl md:text-8xl font-bold text-white">CORTE</span>
                    <Scissors className="h-12 w-12 md:h-16 md:w-16 mx-4 text-amber-400" />
                    <span className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-red-500">
                      CON
                    </span>
                    <span className="text-6xl md:text-8xl font-bold text-white mx-4">ESTILO</span>
                    <span className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-400">
                      CUBA
                    </span>
                  </div>
                ))}
            </div>
          ))}
      </motion.div>
    </div>
  )
}
