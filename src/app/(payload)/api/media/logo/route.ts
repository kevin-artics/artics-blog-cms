import { NextResponse } from 'next/server'
import { getMediaByFilename } from '@/utilities/getDocument'

export async function GET() {
  try {
    const logoMedia = await getMediaByFilename('logo.png')

    if (!logoMedia) {
      return NextResponse.json({ error: 'Logo not found' }, { status: 404 })
    }

    return NextResponse.json(logoMedia)
  } catch (error) {
    console.error('Error fetching logo:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
