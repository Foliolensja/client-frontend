import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Login",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(
          "https://foliolens-backend.herokuapp.com/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
            },
          }
        );

        let data = await res.json();
        let user = {};

        let userRes = "";
        if (data.access_token) {
          let acTk = data.access_token;
          let bearer = "Bearer " + data.access_token;
          userRes = await fetch(
            "https://foliolens-backend.herokuapp.com/users/me",
            {
              method: "GET",
              //   body: JSON.stringify(payload),
              headers: {
                Authorization: bearer,
                "Content-Type": "application/json",
                "Accept-Language": "en-US",
              },
            }
          );

          data = await userRes.json();
          let token = acTk;
          user = { ...data, token };
        }
        if (res.ok && user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
});
