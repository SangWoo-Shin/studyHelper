import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
    const { data: session } = useSession();
    console.log(session);
    
    return (
        <section>
            <h1>Home Page</h1>
            <h2>Sign in with google</h2>
            <button onClick={() => signIn('google')}>Sign in</button>
            <button onClick={() => signOut()}>Sign Out</button>
        </section>
    )
}