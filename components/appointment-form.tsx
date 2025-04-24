"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { hairStyles } from "@/lib/data"

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  phone: z.string().min(8, {
    message: "El número de teléfono debe tener al menos 8 dígitos.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  date: z.date({
    required_error: "Por favor selecciona una fecha.",
  }),
  time: z.string({
    required_error: "Por favor selecciona una hora.",
  }),
  service: z.string({
    required_error: "Por favor selecciona un servicio.",
  }),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Format data for WhatsApp message
      const formattedDate = format(data.date, "PPP", { locale: es })
      const message = `Hola, soy ${data.name}. Quiero agendar una cita para un ${data.service} el ${formattedDate} a las ${data.time}.`
      const whatsappUrl = `https://wa.me/+5312345678?text=${encodeURIComponent(message)}`

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank")

      // Show success message
      toast({
        title: "¡Cita agendada con éxito!",
        description: "Te hemos enviado un mensaje de WhatsApp para confirmar tu cita.",
      })

      // Reset form
      form.reset()
    } catch (error) {
      toast({
        title: "Error al agendar la cita",
        description: "Por favor intenta nuevamente más tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 rounded-xl p-6 md:p-8 border border-amber-500/20"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tu nombre completo"
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Teléfono (WhatsApp)</FormLabel>
                  <FormControl>
                    <Input placeholder="+53 12345678" {...field} className="bg-gray-800 border-gray-700 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tucorreo@ejemplo.com"
                    {...field}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Fecha</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal bg-gray-800 border-gray-700 text-white",
                            !field.value && "text-gray-400",
                          )}
                        >
                          {field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        locale={es}
                        className="bg-gray-800 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Hora</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Selecciona una hora">
                          {field.value ? (
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {field.value}
                            </div>
                          ) : (
                            "Selecciona una hora"
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time} className="hover:bg-gray-700">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Servicio</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {hairStyles.map((style) => (
                      <SelectItem key={style.id} value={style.name} className="hover:bg-gray-700">
                        {style.name} - ${style.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Notas adicionales</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cualquier detalle adicional que quieras mencionar..."
                    className="resize-none bg-gray-800 border-gray-700 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white py-6 text-lg"
          >
            {isSubmitting ? "Agendando..." : "Agendar Cita"}
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}
