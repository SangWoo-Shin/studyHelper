import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (credentials === null) return null;
                console.log(credentials);

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
            
                console.log('Response status:', response.status);
                
                if (response.ok) {
                    const user = await response.json();
                    console.log('User data:', user);
                    return user;
                } else {
                    const errorText = await response.text();
                    console.error('Authorization failed:', errorText);
                    throw new Error("User not found.");
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
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url;
            return baseUrl; // Redirect to base URL for all other cases
        },
        async jwt({ token, user }) {
            if (user) {
              token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id;
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

export default (req, res) => NextAuth(req, res, authOptions);
