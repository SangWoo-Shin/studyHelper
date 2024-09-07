import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OtpVerify from '../../components/otpVerify';
import style from '../../styles/loginPage.module.css';
import { emailAtom, passwordAtom, nameAtom } from './atom';
import { useAtom } from 'jotai';

const doCredentailLogin = async (email, password) => {
    try {
        const response = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        });
        return response;
    } catch(err) {
        throw new Error(err);
    }
}

export default function Login() {
  const { data: session, status } = useSession(); 
  const router = useRouter();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useAtom(passwordAtom)
  const [email, setEmail] = useAtom(emailAtom);
  const [name, setName] = useAtom(nameAtom);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };


   const handleLoginVerify = async (e) => {
    e.preventDefault();
    try {
        const response = await doCredentailLogin(email, password);
        if (!!response.error) {
            console.error(response.error);
        } else {
            console.log('Login successful:', user);
            router.push('/');
        }
    } catch(err) {
        console.error(err);
    }
  }

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
    } else if(!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and include at least one letter, one number, and one special character.");
    } else {
        try {
            const response = await fetch(processREMOVED_SECRETS.NEXT_PUBLIC_BACKENDURL+'/generate/otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            setShowModal(true);
        } catch (err) {
            console.error('An error occurred', err);
        }
    }
  }

  // Only redirect when session is successfully loaded and user is authenticated
  useEffect(() => {
    const redirectToHome = async () => {
      if (status === 'authenticated') {
        await router.push('/');
        console.log("Redirected to the home page.");
      }
    };
    redirectToHome();
  }, [status, router]);

  return (
    <>
      <div className={style.body}>
        <div className={`${style.container} ${isRightPanelActive ? style['right-panel-active'] : ''}`}>
          <div className={`${style['form-container']} ${style['sign-up-container']}`}>
            <form className={style.form} onSubmit={handleOTPVerify}>
              <h1 className={style.h1}>Create Account</h1>
              <section className={style['social-container']}>
                <a href="#" className={style.social} onClick={() => signIn('facebook')}>
                  <img src="/facebook-icon.png" width={18} height={18}></img>
                </a>
                <a href="#" className={style.social} onClick={() => signIn('google')}>
                  <img src="/google-icon.png" width={18} height={18}></img>
                </a>
                <a href="#" className={style.social} onClick={() => signIn('kakao')}>
                  <img src="/kakao.png" width={18} height={18}></img>
                </a>
              </section>
              <span className={style.span}>or use your email for registration</span>
              <input className={style.input} value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Name" />
              <input className={style.input} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
              <input className={style.input} value={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="Password" />
              <button className={style.button}>Sign Up</button>
            </form>
          </div>

          <div className={`${style['form-container']} ${style['sign-in-container']}`}>
            <form className={style.form} onSubmit={handleLoginVerify}>
              <h1 className={style.h1}>Sign in</h1>
              <section className={style['social-container']}>
                <a href="#" className={style.social} onClick={() => signIn('facebook')}>
                  <img src="/facebook-icon.png" width={18} height={18}></img>
                </a>
                <a href="#" className={style.social} onClick={() => signIn('google')}>
                  <img src="/google-icon.png" width={18} height={18}></img>
                </a>
                <a href="#" className={style.social} onClick={() => signIn('kakao')}>
                  <img src="/kakao.png" width={18} height={18}></img>
                </a>
              </section>
              <span className={style.span}>or use your account</span>
              <input className={style.input} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
              <input className={style.input} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
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

      <OtpVerify
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}