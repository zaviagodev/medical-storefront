import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    
    // Log the received contact data (for debugging)
    console.log('Received contact submission:', body)
    
    // Validate required fields for contact form
    const { firstName, lastName, workEmail, subject, message } = body
    
    if (!firstName || !lastName || !workEmail || !subject || !message) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          required: ['firstName', 'lastName', 'workEmail', 'subject', 'message'],
          received: Object.keys(body)
        },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(workEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Check if environment variables are set
    const sanityToken = process.env.SANITY_API_TOKEN
    const sanityProjectId = process.env.SANITY_PROJECT_ID || '0zt5akmw'
    const sanityDataset = process.env.SANITY_DATASET || 'production'
    const sanityApiVersion = process.env.SANITY_API_VERSION || 'v2023-06-06'
    
    if (!sanityToken) {
      console.error('SANITY_API_TOKEN environment variable is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }
    
    // Prepare data for Sanity.io
    const contactData = {
      firstName,
      lastName,
      workEmail,
      subject,
      message,
      status: "new",
      createdAt: new Date().toISOString()
    }
    
    // Send data to Sanity.io
    const sanityUrl = `https://${sanityProjectId}.api.sanity.io/${sanityApiVersion}/data/mutate/${sanityDataset}`
    
    const sanityResponse = await fetch(sanityUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sanityToken}`
      },
      body: JSON.stringify({
        mutations: [{
          create: {
            _type: "contact",
            ...contactData
          }
        }]
      })
    })
    
    if (!sanityResponse.ok) {
      const errorData = await sanityResponse.text()
      console.error('Sanity.io API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to save contact to database' },
        { status: 500 }
      )
    }
    
    const sanityData = await sanityResponse.json()
    console.log("Sanity.io Success:", sanityData)
    
    // Return success response
    return NextResponse.json({
      message: 'Contact form submitted successfully',
      contactId: sanityData.results?.[0]?.id || contactData.createdAt,
      timestamp: contactData.createdAt,
      sanityResponse: sanityData
    }, { status: 200 })
    
  } catch (error) {
    console.error('Error processing contact submission:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests for contact submissions' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests for contact submissions' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests for contact submissions' },
    { status: 405 }
  )
} 