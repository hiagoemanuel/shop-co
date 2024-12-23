import { Button } from '@/components/ui/button'

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
          <Button className="bg-black">
            <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M6 0C2.675 0 0 2.74156 0 6.14929C0 8.86522 1.725 11.1712 4.1 11.9911C4.4 12.0424 4.5 11.863 4.5 11.6836C4.5 11.5299 4.5 11.1456 4.5 10.6331C2.825 11.0175 2.475 9.81324 2.475 9.81324C2.2 9.09582 1.8 8.91647 1.8 8.91647C1.25 8.53214 1.85 8.53214 1.85 8.53214C2.45 8.58338 2.775 9.17269 2.775 9.17269C3.3 10.1207 4.175 9.83886 4.525 9.68513C4.575 9.27518 4.725 9.01896 4.9 8.86523C3.575 8.71149 2.175 8.17343 2.175 5.8162C2.175 5.15003 2.4 4.58634 2.8 4.17639C2.75 4.02266 2.525 3.40773 2.85 2.53658C2.85 2.53658 3.35 2.38285 4.5 3.17713C4.975 3.04902 5.5 2.97216 6 2.97216C6.5 2.97216 7.025 3.04902 7.5 3.17713C8.65 2.38285 9.15 2.53658 9.15 2.53658C9.475 3.38211 9.275 3.99704 9.2 4.17639C9.575 4.61197 9.825 5.15003 9.825 5.8162C9.825 8.17343 8.425 8.68587 7.075 8.8396C7.3 9.01896 7.475 9.40329 7.475 9.96697C7.475 10.7869 7.475 11.4531 7.475 11.658C7.475 11.8118 7.575 12.0167 7.9 11.9655C10.275 11.1712 12 8.86522 12 6.14929C12 2.74156 9.325 0 6 0Z"
              />
            </svg>
            <p>Login with Github</p>
          </Button>
          <Button className="bg-black">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            <p>Login with Google</p>
          </Button>
        </div>
      </div>
    </main>
  )
}
