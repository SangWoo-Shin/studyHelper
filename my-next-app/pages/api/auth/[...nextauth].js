import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: processREMOVED_SECRETS.GOOGLE_ID,
            clientSecret: processREMOVED_SECRETS.GOOGLE_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            return session;
        },
        async signIn({ profile }) {
            console.log(profile);
            try {
                const userCheckResponse = await fetch(`${processREMOVED_SECRETS.NEXT_PUBLIC_BACKENDURL}/users/check`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': `Bearer ${processREMOVED_SECRETS.SECRET_KEY}`,
                    },
                    body: JSON.stringify({
                        email: profile.email,
                        name: profile.name,
                        picture: profile.picture
                    })
                });

                if (userCheckResponse.ok) {
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
};

export default (req, res) => NextAuth(req, res, authOptions);