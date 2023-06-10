import { access_token, refresh_token } from 'features/auth/mocks'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const cookieStorage = cookies()
  if (cookieStorage.get('refresh_token')?.value === refresh_token) {
    cookieStorage.set('refresh_token', refresh_token, {
      httpOnly: true,
      path: '/mocks/auth/refresh',
      expires: new Date().setHours(new Date().getHours() + 1),
    })
    cookieStorage.set('access_token', access_token, {
      expires: new Date().setHours(new Date().getHours() + 2),
      httpOnly: true,
      path: '/',
    })
    return NextResponse.json({ status: 'authenticated' }, { status: 200 })
  }
  return NextResponse.json({ status: 'Invalid token' }, { status: 400 })
}
