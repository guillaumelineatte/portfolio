"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionTitleProps {
  children: ReactNode
}

// Update the SectionTitle component to use blue colors
export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold inline-block relative">
        {children}
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full shadow-glow"></span>
      </h2>
    </motion.div>
  )
}

