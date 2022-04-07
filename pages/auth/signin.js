import { getProviders, signIn as SignInProvider} from "next-auth/react"
import Header from '../../components/Header'

function signIn({providers}) {
    return (
        <>
        <Header/>

        <div className="flex flex-col items-center justify-center min-h-screen 
        px-14 text-center">
        <img 
        className="w-80"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="" />
        <p className="font-xs italic">Just for educational trial</p>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button 
              className="p-3 bg-blue-500 rounded-lg text-white"
              onClick={() => SignInProvider(provider.id, { callbackUrl: '/'})}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
        </div>

      </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
      props: { providers },
    }
  }


export default signIn
