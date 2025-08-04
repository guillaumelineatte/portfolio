"use client"

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import SectionTitle from "@/components/section-title"
import emailjs from '@emailjs/browser'

interface NavSection {
  id: string;
  label: string;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const sectionRefs = useRef<HTMLDivElement[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const navSections: NavSection[] = [
    { id: "home", label: "accueil" },
    { id: "about", label: "à propos" },
    { id: "skills", label: "compétences" },
    { id: "projects", label: "projets" },
    { id: "experience", label: "expérience" },
    { id: "contact", label: "contact" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      sectionRefs.current.forEach((section) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const addToSectionRefs = (el: HTMLDivElement) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Utilise les variables d'environnement
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    emailjs.sendForm(serviceId, templateId, e.target as HTMLFormElement, publicKey)
      .then((result) => {
        setNotification({ message: 'Message envoyé avec succès !', type: 'success' });
        // Reset le formulaire
        (e.target as HTMLFormElement).reset();
      })
      .catch((error) => {
        setNotification({ message: 'Erreur lors de l\'envoi du message', type: 'error' });
        console.error('EmailJS error:', error);
      });
  };

  const projects = [
    {
      id: 1,
      title: "Swizzer Prod",
      description: "Site web pour un monteur vidéo professionnel, présentant ses services de montage et ses projets",
      technologies: ["React", "Nodejs"],
      image: "assets/Projets/swizzer.jpg",
      demo: "https://swizzerprod.netlify.app/",
    },
    {
      id: 2,
      title: "L'Ordre Du Nautilus",
      description: "Site pour l'association l'Ordre Du Nautilus",
      technologies: ["React", "Node.js"],
      image: "assets/Projets/ordredunautilus.jpg",
      demo: "https://guillaumelineatte.github.io/lordre-du-nautilus/",
    },
    {
      id: 3,
      title: "Budget-Manager",
      description: "Application web de gestion de budget",
      technologies: ["React", "Node.js"],
      image: "assets/Projets/budget-manager.jpg",
      demo: "https://guillaumelineatte.github.io/budget-manager/",
    }
  ]

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "Python",
    "PHP",
    "Symfony",
    "SQL",
    "Git",
    "Docker",
    "CI/CD",
    "Méthode Agile",
    "Versioning",
    "Veille technologique",

  ]

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
            onAnimationComplete={() => {
              setTimeout(() => setNotification(null), 3000);
            }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/18">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold flex items-center gap-3"
          >
            <img src="/assets/G.png" alt="Logo" className="w-10 h-10 rounded-full object-cover" />
          </motion.div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navSections.map((section: NavSection) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "text-sm uppercase tracking-wider transition-colors hover:text-primary",
                      activeSection === section.id ? "text-primary font-medium" : "text-white/70"
                    )}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:hidden">
            {/* Menu responsive */}
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center md:hidden">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>
          <ul className="flex flex-col space-y-8 text-2xl">
            {navSections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => {
                    scrollToSection(section.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={cn(
                    "uppercase tracking-wider transition-colors hover:text-primary",
                    activeSection === section.id ? "text-primary font-medium" : "text-white/70"
                  )}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main className="pt-24">
        {/* Section accueil */}
        <section
          id="home"
          ref={addToSectionRefs}
          className="min-h-[calc(100vh-6rem)] flex flex-col justify-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
                Guillaume Linéatte
              </h1>
              <h2 className="text-2xl md:text-4xl font-medium mb-8 text-white/90">Développeur informatique</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Passionné par le développement de solutions logicielles qui répondent à des problèmes complexes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-blue-500/20"
                >
                  Mes projets
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 shadow-lg"
                >
                  Me contacter
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px]"></div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <ArrowDown className="animate-bounce" />
          </motion.div>
        </section>

        {/* Section à propos */}
        <section id="about" ref={addToSectionRefs} className="py-20 relative">
          <div className="container mx-auto px-4">
            <SectionTitle>A propos de moi</SectionTitle>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 max-w-[320px] mx-auto md:mx-0">
                  <img
                    src="/assets/profil.png"
                    alt="Guillaume Linéatte"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-[50px] -z-10"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-4 text-white/70">
                  <p>
                  Je m'appelle Guillaume Linéatte, j'ai 26 ans et j'ai été apprenti développeur chez Picardie Informatique à Amiens durant mon BTS.
                  Je crée des sites et applications web sur mesure pour répondre aux besoins de chacun.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section compétences */}
        <section id="skills" ref={addToSectionRefs} className="py-20 bg-white/5">
          <div className="container mx-auto px-4">
            <SectionTitle>Compétences techniques</SectionTitle>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 max-w-2xl mx-auto"
            >
              <p className="text-white/70">
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {skills.map((skill, index) => (
                <SkillBadge key={index} skill={skill} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section projets */}
        <section id="projects" ref={addToSectionRefs} className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle>Projets</SectionTitle>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 max-w-2xl mx-auto"
            >
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Section expérience */}
        <section id="experience" ref={addToSectionRefs} className="py-20 bg-white/5">
          <div className="container mx-auto px-4">
            <SectionTitle>Expérience</SectionTitle>
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative pl-8 border-l border-white/20 pb-12"
              >
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-0"></div>
                <div className="mb-2 text-sm text-white/50">2022 - 2024</div>
                <h3 className="text-xl font-semibold mb-2">Développeur informatique en alternance</h3>
                <p className="text-white/70 mb-4">
                  Picardie Informatique
                </p>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <ul className="list-disc list-inside space-y-2 text-white/70">
                      <li>Développement d'un ERP médical "Oncobase" qui répond aux besoins de médecins spécialisés en oncologie</li>
                      <li>Frontend : HTML, SCSS, TypeScript, Angular</li>
                      <li>Backend : Node.js, Express</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Section diplômes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative pl-8 border-l border-white/20"
              >
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-0"></div>
                <div className="mb-2 text-sm text-white/50">2022 - 2024</div>
                <h3 className="text-xl font-semibold mb-2">BTS Services informatiques aux organisations</h3>
                <p className="text-white/70 mb-4">INTERFOR</p>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                  <ul className="list-disc list-inside space-y-2 text-white/70">
                    <li>Développement d'un site web dynamique MMA World (PHP/Symfony, JavaScript)</li>
                    <li>Acquisition des langages de programmation : C, Python, JavaScript, PHP</li>
                    <li>Maîtrise de Symfony et Doctrine ORM pour le développement backend</li>
                    <li>Conception d'interfaces utilisateur responsive et interactives</li>
                    <li>Gestion de bases de données relationnelles et modélisation SQL</li>
                    <li>Mise en œuvre de bonnes pratiques de développement (MVC, POO, DRY)</li>
                    <li>Expérience en déploiement et maintenance d'applications web</li>
                </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section contact */}
        <section id="contact" ref={addToSectionRefs} className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle>Me contacter</SectionTitle>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 max-w-2xl mx-auto"
            >
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm"
              >
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Votre email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Votre message"
                      required
                    ></textarea>
                  </div>
                    <Button
                    type="submit"
                    className="w-full shadow-lg shadow-blue-500/20 transition-all hover:translate-y-[-2px]"
                    >
                    Envoyer
                    </Button>
                </form>
              </motion.div>

              {/* Contact */}
              <div className="grid gap-6">

                <motion.a
                  href="https://github.com/guillaumelineatte"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:translate-y-[-2px] shadow-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Github className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">GitHub</h3>
                    <p className="text-white/70 text-sm">github.com/guillaumelineatte</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/guillaume-lineatte/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:translate-y-[-2px] shadow-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Linkedin className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">LinkedIn</h3>
                    <p className="text-white/70 text-sm">linkedin.com/in/guillaume-lineatte/</p>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Section footer */}
      <footer className="py-8 border-t border-white/10 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} Guillaume Linéatte. Tous droits réservés.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/guillaumelineatte  "
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-primary transition-colors"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/guillaume-lineatte/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:lineatteg@example.com" className="text-white/50 hover:text-primary transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}



