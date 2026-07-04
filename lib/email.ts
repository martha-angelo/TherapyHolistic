import { Resend } from 'resend'

interface BookingEmailData {
  name: string
  email: string
  date: string
  timeSlot: string
  duration: number
  price: number
  meetLink?: string  // link único gerado por sessão (Google Meet) ou fallback do env
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log('⚠️  RESEND_API_KEY não configurada — email não enviado')
    return
  }

  // Lazy init — só cria o cliente quando a key existe (evita erro no build do Vercel)
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Link do Meet: prioriza o link único gerado, fallback para o env fixo
  const meetLink = data.meetLink || process.env.SESSION_MEET_LINK || ''

  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(data.date + 'T12:00:00'))

  await resend.emails.send({
    from: process.env.RESEND_FROM || 'Martha Angelo <noreply@marthaangelo.com.br>',
    to: data.email,
    subject: `✅ Sessão confirmada — ${dateFormatted}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #FAF6EF;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #2E5D4B; font-size: 28px; margin: 0;">Martha Angelo</h1>
          <p style="color: #7AB57A; margin: 4px 0 0;">Terapia Integrativa</p>
        </div>

        <div style="background: white; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h2 style="color: #1F4034; font-size: 22px; margin: 0 0 16px;">Olá, ${data.name}! 🌿</h2>
          <p style="color: #444; line-height: 1.7; margin: 0 0 24px;">
            Sua sessão foi confirmada com sucesso. Fico feliz em te acompanhar nessa jornada!
          </p>

          <div style="background: #EEF5EE; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <h3 style="color: #2E5D4B; font-size: 16px; margin: 0 0 12px;">📅 Detalhes da sessão</h3>
            <p style="margin: 4px 0; color: #1F4034;"><strong>Data:</strong> ${dateFormatted}</p>
            <p style="margin: 4px 0; color: #1F4034;"><strong>Horário:</strong> ${data.timeSlot}</p>
            <p style="margin: 4px 0; color: #1F4034;"><strong>Duração:</strong> ${data.duration} minutos</p>
            <p style="margin: 4px 0; color: #1F4034;"><strong>Valor:</strong> R$ ${data.price.toFixed(2)}</p>
          </div>

          ${meetLink ? `
          <div style="background: #1D9E75; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; text-align: center;">
            <p style="color: #fff; font-size: 14px; margin: 0 0 10px;">🎥 Link da sua sessão online</p>
            <a href="${meetLink}" style="color: #fff; font-weight: bold; font-size: 15px; word-break: break-all;">${meetLink}</a>
          </div>
          ` : `
          <p style="color: #444; line-height: 1.7; margin: 0 0 16px;">
            Você receberá o link da sessão online por WhatsApp até 30 minutos antes do horário marcado.
          </p>
          `}

          <p style="color: #444; line-height: 1.7; margin: 0;">
            Qualquer dúvida, me chame no Instagram <a href="https://instagram.com/marthaangeloo" style="color: #2E5D4B;">@marthaangeloo</a>.
          </p>
        </div>

        <p style="text-align: center; color: #7AB57A; font-size: 14px;">
          Com carinho,<br><strong style="color: #2E5D4B;">Martha Angelo</strong>
        </p>
      </div>
    `,
  })
}
