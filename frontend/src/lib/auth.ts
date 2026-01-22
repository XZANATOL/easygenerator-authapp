import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },


            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    // Login to backend
                    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials),
                    });

                    const data = await res.json();
                    if (!res.ok || !data.access_token) return null;

                    // Get User Details
                    const userRes = await fetch(`${process.env.BACKEND_URL}/auth/user`, {
                        headers: { Authorization: `Bearer ${data.access_token}` },
                    });

                    const userData = await userRes.json();
                    if (!userRes.ok) return null;

                    return {
                        id: userData._id || userData.email,
                        name: userData.displayName,
                        email: userData.email,
                        accessToken: data.access_token,
                    };
                } catch (e) {
                    console.error("Auth failed:", e);
                    return null;
                }
            },
        }),
    ],


    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).accessToken;
                return token;
            }

            try {
                const res = await fetch(`${process.env.BACKEND_URL}/auth/user`, {
                    headers: { Authorization: `Bearer ${token.accessToken}` },
                });

                if (!res.ok) {
                    console.error("Token validation failed");
                    return { ...token, error: "AccessTokenError" };
                }

                return token;
            } catch (error) {
                console.error("Token validation error:", error);
                return { ...token, error: "AccessTokenError" };
            }
        },


        async session({ session, token }) {
            if (token.error === "AccessTokenError") {
                return null as any; // Force sign out
            }
            if (token) {
                (session as any).accessToken = token.accessToken;
            }
            return session;
        },
    },

    
    pages: { signIn: "/auth/login" },
    session: { strategy: "jwt" },
};
