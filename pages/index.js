import PokemonCard from "@/components/PokemonCard";
import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home({ pokemons }) {
  const [currentPage, setCurrenPage] = useState(1);
  const recordsPerPage = 20;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const data = pokemons ? pokemons.slice(firstIndex, lastIndex) : [];
  const numbers = [1, 2, 3];

  const prevPage = () => {
    if (currentPage !== firstIndex && currentPage > 1) {
      setCurrenPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== lastIndex && currentPage < 3) {
      setCurrenPage((prev) => prev + 1);
    }
  };

  const changePage = (i) => {
    setCurrenPage(i);
  };

  return (
    <div>
      <PokemonCard data={data} />
      <div className="flex justify-center gap-8 items-center mt-12">
        <button onClick={prevPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="currentColor"
            class="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
        </button>
        {numbers.map((n, i) => {
          return (
            <div
              className={`${
                currentPage === n ? "bg-green-800 h-14 w-14 flex justify-center items-center rounded-full text-white" : ""
              } cursor-pointer `}
              key={i}
              onClick={() => changePage(n)}
            >
              {n}
            </div>
          );
        })}
        <button onClick={nextPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="currentColor"
            class="bi bi-arrow-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query pokemons($first: Int!) {
        pokemons(first: $first) {
          id
          number
          name
          weight {
            minimum
            maximum
          }
          height {
            minimum
            maximum
          }
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
        }
      }
    `,
    variables: { first: 60 },
  });
  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}
