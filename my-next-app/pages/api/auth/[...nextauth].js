import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { Next } from "react-bootstrap/esm/PageItem";

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const response = await fetch(process.env.NEXT_PUBLIC_BACKENDURL + '/verifyUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                });
                if (response.ok) {
                    const user = await response.json();
                    return user;
                } else {
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_ID,
            clientSecret: process.env.KAKAO_SECRET,
            authorization: {
                url: "https://kauth.kakao.com/oauth/authorize",
                params: {
                    prompt: "select_account"
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
              token.id = user._id;
              token.email = user.email;
              token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
        async signIn({ profile, account, user }) {
            console.log(profile);
            console.log(account);
            if (account.provider === 'kakao') {
                try {
                  const kakaoUserResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/users/check`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: profile.kakao_account.email,
                        name: profile.kakao_account.profile.nickname,
                        picture: profile.kakao_account.profile.thumbnail_image_url,
                    })
                  });
                  if (kakaoUserResponse.ok) {
                    return true;
                  } else {
                        return false;
                  }
                } catch (error) {
                  console.error('Error fetching Kakao user info:', error);
                  return false;
                }
                
            } else if (account.provider === 'google') {    
                try {
                const googleUserResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/users/check`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: profile.email,
                        name: profile.name,
                        picture: profile.picture
                    })
                });

                if (googleUserResponse.ok) {
                    return true;
                } else {
                    return false;
                }
                } catch (err) {
                    console.log(err);
                    return false;
                }
            } else if(account.provider == 'facebook') {
                try {
                    const facebookUserResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/users/check`, {
                        method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: profile.email,
                            name: profile.name,
                            picture: profile.picture
                        })
                    });
    
                    if (facebookUserResponse.ok) {
                        return true;
                    } else {
                        return false;
                    }
                    } catch (err) {
                        console.log(err);
                        return false;
                    }
            } else if(account.provider == 'credentials' && user) {
                return true;
            }
        }
    },
    pages: {
        signOut: '/user/login', 
    },
};
export default NextAuth(authOptions);
