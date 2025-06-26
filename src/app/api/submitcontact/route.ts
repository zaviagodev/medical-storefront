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
    const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID
    const contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN
    
    if (!contentfulSpaceId || !contentfulAccessToken) {
      console.error('CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN environment variables are not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }
    
    // Prepare data for Contentful
    const contactData = {
      fields: {
        firstName: {
          "en-US": firstName
        },
        lastName: {
          "en-US": lastName
        },
        workEmail: {
          "en-US": workEmail
        },
        subject: {
          "en-US": subject
        },
        message: {
          "en-US": message
        }
      }
    }
    
    // Send data to Contentful
    const contentfulUrl = `https://api.contentful.com/spaces/${contentfulSpaceId}/environments/master/entries`
    const contentfulResponse = await fetch(contentfulUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${contentfulAccessToken}`,
        "X-Contentful-Content-Type": "contact"
      },
      body: JSON.stringify(contactData)
    })

    console.log("Contentful Space ID:", contentfulSpaceId)

    console.log("Contentful Response:", contentfulResponse)

    if (!contentfulResponse.ok) {
      const errorData = await contentfulResponse.text()
      console.error('Contentful API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to save contact to database' },
        { status: 500 }
      )
    }
    
    const contentfulData = await contentfulResponse.json()
    console.log("Contentful Success:", contentfulData)
    
    // Return success response
    return NextResponse.json({
      message: 'Contact form submitted successfully',
      contactId: contentfulData.sys?.id || new Date().toISOString(),
      timestamp: contentfulData.sys?.createdAt || new Date().toISOString(),
      contentfulResponse: contentfulData
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