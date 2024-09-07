import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react';
import style from '../../styles/loginPage.module.css'

export default function Login() { 
    const { data: session } = useSession();
    console.log(session);
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
      setIsRightPanelActive(true);
    };
  
    const handleSignInClick = () => {
      setIsRightPanelActive(false);
    };
  
    return (
    <>
    <div className={style.body}>
      <div className={`${style.container} ${isRightPanelActive ? style['right-panel-active'] : ''}`}>
        <div className={`${style['form-container']} ${style['sign-up-container']}`}>
          <form className={style.form}>
            <h1 className={style.h1}>Create Account</h1>
            <section className={style['social-container']}>
              <a href="#" className={style.social}>
                <img src="/apple-icon.png" width={18} height={18}></img>
              </a>
              <a href="#" className={style.social} onClick={() => signIn('google')}>
                <img src="/google-icon.png" width={18} height={18}></img>
              </a>
              <a href="#" className={style.social}>
                <img src="/kakao.png" width={18} height={18}></img>
              </a>
            </section>
            <span className={style.span}>or use your email for registration</span>
            <input className={style.input} type="text" placeholder="Name" />
            <input className={style.input} type="email" placeholder="Email" />
            <input className={style.input} type="password" placeholder="Password" />
            <button className={style.button}>Sign Up</button>
          </form>
        </div>
        
        <div className={`${style['form-container']} ${style['sign-in-container']}`}>
          <form className={style.form}>
            <h1 className={style.h1}>Sign in</h1>
            <section className={style['social-container']}>
              <a href="#" className={style.social}>
                <img src="/apple-icon.png" width={18} height={18}></img>
              </a>
              <a href="#" className={style.social} onClick={() => signIn('google')}>
                <img src="/google-icon.png" width={18} height={18}></img>
              </a>
              <a href="#" className={style.social}>
                <img src="/kakao.png" width={18} height={18}></img>
              </a>
            </section>
            <span className={style.span}>or use your account</span>
            <input className={style.input} type="email" placeholder="Email" />
            <input className={style.input} type="password" placeholder="Password" />
            <a className={style.a} href="#">Forgot your password?</a>
            <button className={style.button}>Sign In</button>
          </form>
        </div>
  
        <div className={style['overlay-container']}>
          <div className={style.overlay}>
            <div className={`${style['overlay-panel']} ${style['overlay-left']}`}>
              <h1 className={style.h1}>Welcome Back!</h1>
              <p className={style.p}>To keep connected with us please login with your personal info</p>
              <button className={`${style.button} ${style.ghost}`} onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className={`${style['overlay-panel']} ${style['overlay-right']}`}>
              <h1 className={style.h1}>Hello, Friend!</h1>
              <p className={style.p}>Enter your personal details and start your journey with us</p>
              <button className={`${style.button} ${style.ghost}`} onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
        </>
    )
}