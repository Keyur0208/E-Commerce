import {signIn} from 'next-auth/react'

export default function GoogleAutheciation() {
    return (
        <button className='google-login' onClick={()=>signIn('google') }  >
            <img src='google.png' />
            <span>Continue With Google</span>
        </button>
    )
}