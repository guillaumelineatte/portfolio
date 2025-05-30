"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  skill: string
  index: number
}

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.2,
        delay: index * 0.02
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.1 }
      }}
      className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/18 hover:border-blue-400/50 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/18 backdrop-blur-sm m-1"
    >
      {skill}
    </motion.div>
  )
}

