"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { HairStyle } from "@/lib/types"

interface HairStyleCardProps {
  hairStyle: HairStyle
}

export default function HairStyleCard({ hairStyle }: HairStyleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden group h-[400px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={hairStyle.image || "/placeholder.svg"}
        alt={hairStyle.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{hairStyle.name}</h3>
        <p className="text-gray-300 mb-4">{hairStyle.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-amber-400 font-bold text-xl">${hairStyle.price}</span>
          <motion.button
            className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-amber-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reservar
          </motion.button>
        </div>
      </div>

      {/* Price tag */}
      <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full font-bold">
        ${hairStyle.price}
      </div>
    </motion.div>
  )
}
