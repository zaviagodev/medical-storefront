import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    
    // Log the received data (for debugging)
    console.log('Received POST request:', body)
    
    // Process the data here
    // You can add your business logic here
    
    // Example: Validate the request body
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      )
    }
    
    // Example: Process the data
    const processedData = {
      message: 'Data received successfully',
      timestamp: new Date().toISOString(),
      receivedData: body
    }
    
    // Return success response
    return NextResponse.json(processedData, { status: 200 })
    
  } catch (error) {
    console.error('Error processing POST request:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  )
} 