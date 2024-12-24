import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { LogOutButton } from './components/LogOutButton'

export default async function Account() {
  const session = await getServerSession()

  return (
    <main className="min-h-96 flex justify-center items-center">
      <div className="flex flex-col gap-3 py-8 px-4 rounded-3xl border border-black/10">
        <div className="flex justify-center items-end gap-1">
          <h1 className="sm:text-2xl text-xl font-integral-cf text-center">
            SHOP.CO
          </h1>
          <h2 className="sm:text-xl text-lg font-satoshi font-medium italic">
            account
          </h2>
        </div>
        <div className="flex gap-3">
          <Image
            className="min-w-20 min-h-20 border-4 border-black rounded-full"
            src={session?.user?.image ?? ''}
            alt="profile picture"
            width={80}
            height={80}
          />
          <div>
            <h1 className="text-lg font-bold">Welcome</h1>
            <h2 className="text-2xl font-normal">{session?.user?.name}</h2>
          </div>
        </div>
        <LogOutButton />
      </div>
    </main>
  )
}
