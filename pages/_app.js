import Header from "@/components/Header";
import "@/styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app/",
  cache: new InMemoryCache(),
});
export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Header/>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}
