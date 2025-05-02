"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight, Menu, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import HairStyleCard from "@/components/hair-style-card"
import AppointmentForm from "@/components/appointment-form"
import HorizontalCarousel from "@/components/horizontal-carousel"
import { hairStyles } from "@/lib/data"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="elRody Logo" width={50} height={50} className="rounded-full" />
            <span className={`text-2xl font-bold ${scrolled ? "text-white" : "text-amber-400"}`}>elRody</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLinks scrolled={scrolled} />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 text-white border-l border-amber-500/20">
              <div className="flex flex-col gap-6 mt-12">
                <Link href="/" className="flex items-center gap-2 mb-8">
                  <Image src="/logo.png" alt="elRody Logo" width={60} height={60} className="rounded-full" />
                  <span className="text-3xl font-bold text-amber-400">elRody</span>
                </Link>
                <MobileNavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        id="top"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image src="/fondo-bg.webp" alt="Barbería elRody" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </div>

        <div className="container mx-auto relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Barbería con Estilo <span className="gradient-text">Cubano</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Donde cada corte cuenta una historia y cada estilo refleja tu personalidad
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#agendar"
              className="gradient-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 py-6 text-lg font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
            >
              Agendar Cita
            </a>

            <a
              href="https://goo.gl/maps/qQaVJKYN5ksRmybNA"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 py-6 text-lg font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
            >
              <MapPin className="h-5 w-5" />
              Nuestra Localización
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-10 w-10 text-white rotate-90" />
        </div>
      </motion.section>

      {/* Horizontal Carousel */}
      <section className="py-20 bg-black overflow-hidden">
        <HorizontalCarousel />
      </section>

      {/* Services/Haircuts Section */}
      <section id="estilos" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            Nuestros <span className="text-amber-400">Estilos</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hairStyles.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <HairStyleCard
                  hairStyle={{
                    ...style,
                    image: `/images/${style.id}.webp`, // Ensure images are in /public/images with filenames matching style.id
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="agendar" className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-4"
          >
            Agenda tu <span className="text-amber-400">Cita</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          >
            Reserva tu horario, recibe confirmación por WhatsApp y añade el evento a tu Google Calendar
          </motion.p>

          <div className="max-w-3xl mx-auto">
            <AppointmentForm />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 right-10 opacity-10">
          <Image src="/scissors.png" alt="Tijeras decorativas" width={200} height={200} />
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-black text-white py-12 border-t border-amber-500/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="elRody Logo" width={60} height={60} className="rounded-full" />
                <span className="text-2xl font-bold text-amber-400">elRody</span>
              </Link>
              <p className="text-gray-400">
                Barbería con auténtico estilo cubano, donde la tradición se encuentra con las tendencias modernas.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📱 +53 63202625</li>
                <li>📍 Camagüey, Cuba</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">Horario</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Lunes - Viernes: 9:00 - 20:00</li>
                <li>Sábado: 9:00 - 18:00</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} elRody Barbería. Todos los derechos reservados.</p>
            <p className="mt-2 text-sm">Created for Serggio with ❤️</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function NavLinks({ scrolled }: { scrolled: boolean }) {
  const linkClass = `font-medium transition-colors ${
    scrolled ? "text-white hover:text-amber-400" : "text-white hover:text-amber-300"
  }`

  return (
    <>
      <Link href="#top" className={linkClass}>
        Inicio
      </Link>
      <Link href="#estilos" className={linkClass}>
        Estilos
      </Link>
      <Link href="#agendar" className={linkClass}>
        Agendar
      </Link>
      <a href="https://goo.gl/maps/qQaVJKYN5ksRmybNA" target="_blank" rel="noopener noreferrer" className={linkClass}>
        Localización
      </a>
      <Link href="#footer" className={linkClass}>
        Contacto
      </Link>
    </>
  )
}

function MobileNavLinks() {
  const linkClass =
    "text-xl font-medium py-3 border-b border-gray-800 text-white hover:text-amber-400 transition-colors"

  return (
    <div className="flex flex-col">
      <Link href="#top" className={linkClass}>
        Inicio
      </Link>
      <Link href="#estilos" className={linkClass}>
        Estilos
      </Link>
      <Link href="#agendar" className={linkClass}>
        Agendar
      </Link>
      <a href="https://goo.gl/maps/qQaVJKYN5ksRmybNA" target="_blank" rel="noopener noreferrer" className={linkClass}>
        Localización
      </a>
      <Link href="#footer" className={linkClass}>
        Contacto
      </Link>
    </div>
  )
}
