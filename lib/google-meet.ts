import { google } from 'googleapis'

// Retorna null silenciosamente se o Google Calendar não estiver configurado
function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!clientEmail || !privateKey) return null

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  return google.calendar({ version: 'v3', auth })
}

interface CreateMeetParams {
  patientName: string
  patientEmail: string
  date: string      // YYYY-MM-DD
  timeSlot: string  // HH:MM
  duration: number  // minutos
}

interface MeetResult {
  meetLink: string
  calEventId: string
}

export async function createMeetForSession(
  params: CreateMeetParams
): Promise<MeetResult | null> {
  const calendar = getCalendarClient()
  if (!calendar) {
    console.log('⚠️  Google Calendar não configurado — sem link Meet único')
    return null
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'

  // Monta datetime de início e fim
  const [hour, minute] = params.timeSlot.split(':').map(Number)
  const start = new Date(`${params.date}T00:00:00-03:00`)
  start.setHours(hour, minute, 0, 0)
  const end = new Date(start.getTime() + params.duration * 60 * 1000)

  const toISO = (d: Date) => d.toISOString().replace('Z', '-03:00')

  try {
    const event = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: 'none',
      requestBody: {
        summary: `Sessão — ${params.patientName}`,
        description: `Sessão de terapia integrativa com Martha Angelo.\nPaciente: ${params.patientName} (${params.patientEmail})`,
        start: { dateTime: toISO(start), timeZone: 'America/Sao_Paulo' },
        end:   { dateTime: toISO(end),   timeZone: 'America/Sao_Paulo' },
        attendees: [{ email: params.patientEmail }],
        conferenceData: {
          createRequest: {
            requestId: `${params.date}-${params.timeSlot}-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 15 },
          ],
        },
      },
    })

    const meetLink = event.data.conferenceData?.entryPoints?.find(
      e => e.entryPointType === 'video'
    )?.uri

    if (!meetLink || !event.data.id) return null

    return { meetLink, calEventId: event.data.id }
  } catch (err) {
    console.error('Erro ao criar evento Google Calendar:', err)
    return null
  }
}
