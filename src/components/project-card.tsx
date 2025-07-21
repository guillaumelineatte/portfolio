"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  github?: string
  demo?: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden bg-white/5 border-white/10 h-full flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
        <div className="relative aspect-video overflow-hidden">
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
              />
            </a>
          ) : (
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          )}
        </div>
        <CardContent className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-white/70 mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 shadow-sm">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-auto">
            {project.github && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white/10 hover:bg-white/10 shadow-md hover:shadow-lg transition-all"
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                asChild
                size="sm"
                className="shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

