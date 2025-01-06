import { GithubButton } from './components/GithubButton'
import { GoogleButton } from './components/GoogelButton'

export default function Login() {
  return (
    <main className="min-h-96 flex justify-center items-center">
      <div className="flex flex-col py-8 px-4 rounded-3xl border border-black/10">
        <div className="flex justify-center items-end gap-1">
          <h1 className="sm:text-2xl text-xl font-integral-cf text-center">
            SHOP.CO
          </h1>
          <h2 className="sm:text-xl text-lg font-satoshi font-medium italic">
            account
          </h2>
        </div>
        <p className="sm:text-base mb-3 text-sm text-black/60">
          Login with your Github or Google account
        </p>
        <div className="flex flex-col gap-1">
          <GithubButton />
          <GoogleButton />
        </div>
      </div>
    </main>
  )
}
