import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
    
  ],

//   theme: {
//       logo: "https://logos-world.net/wp-content/uploads/2020/04/Instagram-Emblem.png",
//       brandColor: "#F13287",
//       colorScheme: "auto",
//   },
  pages: {
      signIn: "/auth/signin",
  },

    callbacks: {
      async session({ session, token, user}){
        session.user.username = session.user.name.split(' ').join("").toLocaleLowerCase();

        session.user.uid = token.sub; // token.sub gives back the googles user id that comes back
        return session;
      }
    }


});