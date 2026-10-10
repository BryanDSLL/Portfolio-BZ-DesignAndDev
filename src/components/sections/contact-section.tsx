"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Send,
  CheckCircle2,
  Phone,
  User,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  Loader2,
} from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { SectionDemarcator } from "@/components/ui/section-demarcator"
import { useLanguage } from "@/store/use-language"
import { useContactStore } from "@/store/use-contact"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

// Schema de validação com Zod
const contactSchema = z.object({
  name: z.string().min(2, "Por favor, informe seu nome completo"),
  email: z.string().email("Por favor, informe um endereço de e-mail válido"),
  phone: z.string().min(8, "Por favor, informe um telefone ou WhatsApp válido"),
  service: z.string().min(1, "Selecione o tipo de serviço desejado"),
  message: z.string().min(10, "A mensagem deve conter pelo menos 10 caracteres"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactSection() {
  const { language } = useLanguage()
  const t = translations[language].contact
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [selectedService, setSelectedService] = useState<string>(
    t.form.services[0]
  )

  const { isSubmitting, isSuccess, submitContact, resetStatus } =
    useContactStore()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: t.form.services[0],
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    const success = await submitContact(data)
    if (success) {
      reset()
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bryan.dev.contato@gmail.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2200)
  }

  return (
    <section
      id="contato"
      className="relative w-full min-h-screen py-20 lg:py-28 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Architectural Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[600px] w-[900px] rounded-full bg-sky-500/[0.035] dark:bg-sky-500/[0.045] blur-[180px]" />
      </div>

      {/* Blueprint Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0284c708_1px,transparent_1px),linear-gradient(to_bottom,#0284c708_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)]" />

      {/* Demarcador de Seção no Topo - alinhado estritamente à esquerda */}
      <div className="w-full px-4 sm:px-12 md:px-16 lg:px-24 mb-6 sm:mb-8">
        <SectionDemarcator label={t.badge} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho alinhado à esquerda */}
        <BlurFade delay={0.2} inView className="text-left mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-600 dark:text-sky-400 text-xs font-mono font-medium mb-3">
            <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Contato Direto & Propostas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            {t.title}
          </h2>

          <p className="mt-3.5 max-w-2xl text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
            {t.subtitle}
          </p>
        </BlurFade>

        {/* Layout em 2 Colunas: Cards Diretos à Esquerda + Formulário Glassmorphism à Direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Coluna Esquerda: Informações Diretas de Contato (4 colunas) */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            {/* Card de E-mail Direto com Cópia Rápida */}
            <div className="group relative p-5 sm:p-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#070e1a]/80 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-sky-500/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 dark:text-sky-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                      {t.directCards.directEmailTitle}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white break-all">
                      {t.directCards.directEmailValue}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 transition-colors cursor-pointer"
                  title="Copiar e-mail"
                >
                  {copiedEmail ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                  Envio automático para a caixa postal
                </span>
                <a
                  href={`mailto:${t.directCards.directEmailValue}?subject=Contato%20Portf%C3%B3lio%20Bryan.Dev`}
                  className="inline-flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  <span>Abrir cliente</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Card de WhatsApp Direto */}
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1%20Bryan!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 sm:p-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#070e1a]/80 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-emerald-500/40 cursor-pointer block"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                      {t.directCards.whatsappTitle}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <span>{t.directCards.whatsappValue}</span>
                      <ArrowUpRight className="h-4 w-4 text-emerald-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                  </div>
                </div>
              </div>
            </a>

            {/* Status Beacon & Garantias */}
            <div className="p-5 sm:p-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#070e1a]/50 backdrop-blur-md shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                  {t.directCards.availabilityValue}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <Clock className="h-3.5 w-3.5 text-sky-500" />
                <span>Tempo médio de resposta: ~24 horas</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-500" />
                <span>Dados preservados em sigilo profissional</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Contato com Validação Zod e Entrega (7 colunas) */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#070e1a]/90 backdrop-blur-2xl shadow-2xl dark:shadow-[0_20px_50px_rgba(2,12,28,0.8)]">
              {/* Glow decorativo sutil */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none -z-10" />

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* Tela de Sucesso após Envio */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-4"
                  >
                    <div className="h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/10">
                      <CheckCircle2 className="h-9 w-9 animate-bounce" style={{ animationIterationCount: 2 }} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                      {t.form.successTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md leading-relaxed">
                      {t.form.successMessage}
                    </p>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={resetStatus}
                        className="px-5 py-2.5 rounded-full text-xs font-mono font-medium border border-black/10 dark:border-white/15 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                      >
                        {t.form.sendAnother}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Formulário de Envio */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 text-left"
                  >
                    {/* Linha 1: Nome Completo e E-mail */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Campo Nome */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300"
                        >
                          <User className="h-3.5 w-3.5 text-sky-500" />
                          <span>{t.form.nameLabel}</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder={t.form.namePlaceholder}
                          {...register("name")}
                          className={cn(
                            "w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white/70 dark:bg-black/40 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all",
                            errors.name
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-black/10 dark:border-white/10 focus:border-sky-500"
                          )}
                        />
                        {errors.name && (
                          <span className="text-[11px] font-mono text-rose-500 block">
                            {errors.name.message}
                          </span>
                        )}
                      </div>

                      {/* Campo E-mail */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300"
                        >
                          <Mail className="h-3.5 w-3.5 text-sky-500" />
                          <span>{t.form.emailLabel}</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder={t.form.emailPlaceholder}
                          {...register("email")}
                          className={cn(
                            "w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white/70 dark:bg-black/40 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all",
                            errors.email
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-black/10 dark:border-white/10 focus:border-sky-500"
                          )}
                        />
                        {errors.email && (
                          <span className="text-[11px] font-mono text-rose-500 block">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Linha 2: Telefone / WhatsApp */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="phone"
                        className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        <Phone className="h-3.5 w-3.5 text-sky-500" />
                        <span>{t.form.phoneLabel}</span>
                      </label>
                      <input
                        id="phone"
                        type="text"
                        placeholder={t.form.phonePlaceholder}
                        {...register("phone")}
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white/70 dark:bg-black/40 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all",
                          errors.phone
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-black/10 dark:border-white/10 focus:border-sky-500"
                        )}
                      />
                      {errors.phone && (
                        <span className="text-[11px] font-mono text-rose-500 block">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>

                    {/* Linha 3: Seletor de Tipo de Serviço / Escopo */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                        <Sparkles className="h-3.5 w-3.5 text-sky-500" />
                        <span>{t.form.serviceLabel}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {t.form.services.map((service) => {
                          const isSelected = selectedService === service
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => {
                                setSelectedService(service)
                                setValue("service", service)
                              }}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-all duration-200 cursor-pointer border select-none",
                                isSelected
                                  ? "bg-zinc-900 text-white border-zinc-900 shadow-sm dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/40"
                                  : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                              )}
                            >
                              {service}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Linha 4: Mensagem / Detalhes */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-sky-500" />
                        <span>{t.form.messageLabel}</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder={t.form.messagePlaceholder}
                        {...register("message")}
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white/70 dark:bg-black/40 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all resize-none",
                          errors.message
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-black/10 dark:border-white/10 focus:border-sky-500"
                        )}
                      />
                      {errors.message && (
                        <span className="text-[11px] font-mono text-rose-500 block">
                          {errors.message.message}
                        </span>
                      )}
                    </div>

                    {/* Botão de Envio de Alto Impacto */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-mono text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-lg select-none",
                        isSubmitting
                          ? "bg-zinc-400 text-white cursor-not-allowed dark:bg-zinc-700"
                          : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-sky-500 dark:text-zinc-950 dark:hover:bg-sky-400 shadow-sky-500/20 hover:shadow-sky-500/30"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t.form.submitting}</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>{t.form.submitBtn}</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
