const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbysf20V0zy94ux0QTL83ny3O6-MJ2nIBqLdBbGOW73nA6_bVUJ_W1sjxNzaREEyQFld/exec'

type Enquiry = {
  fullName: string
  phone: string
  email: string
  message: string
}

function isEnquiry(value: unknown): value is Enquiry {
  if (!value || typeof value !== 'object') return false
  const enquiry = value as Record<string, unknown>
  return (
    typeof enquiry.fullName === 'string' &&
    enquiry.fullName.trim().length > 0 &&
    enquiry.fullName.length <= 200 &&
    typeof enquiry.phone === 'string' &&
    enquiry.phone.trim().length > 0 &&
    enquiry.phone.length <= 50 &&
    typeof enquiry.email === 'string' &&
    enquiry.email.trim().length > 0 &&
    enquiry.email.length <= 320 &&
    typeof enquiry.message === 'string' &&
    enquiry.message.length <= 2000
  )
}

export async function POST(request: Request) {
  let enquiry: unknown

  try {
    enquiry = await request.json()
  } catch {
    return Response.json({ error: 'Please submit valid enquiry details.' }, { status: 400 })
  }

  if (!isEnquiry(enquiry)) {
    return Response.json({ error: 'Please complete the required enquiry fields.' }, { status: 400 })
  }

  try {
    const sheetResponse = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: enquiry.fullName.trim(),
        phone: enquiry.phone.trim(),
        email: enquiry.email.trim(),
        message: enquiry.message.trim(),
      }),
      cache: 'no-store',
      redirect: 'follow',
    })
    const responseText = await sheetResponse.text()

    if (!sheetResponse.ok || !responseText.trim() || responseText.trimStart().startsWith('<')) {
      throw new Error('Google Sheets rejected the enquiry.')
    }

    const result: unknown = JSON.parse(responseText)
    if (!result || typeof result !== 'object' || !('success' in result) || result.success !== true) {
      throw new Error('Google Sheets rejected the enquiry.')
    }

    return Response.json({ success: true })
  } catch {
    console.error('Google Sheets enquiry submission failed.')
    return Response.json(
      { error: 'We could not submit your enquiry right now. Please try again or call us.' },
      { status: 502 },
    )
  }
}
