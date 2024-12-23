import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Account() {
  const session = await getServerSession()

  if (!session) redirect('/login')

  return <div>account page</div>
}
