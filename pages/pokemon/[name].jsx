import { useRouter } from "next/router";
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Modal from "react-modal";
import EvolutionCardModal from "@/components/EvolutionCard";

const GET_SINGLE_POKEMON = gql`
  query pokemon($name: String) {
    pokemon(name: $name) {
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
`;
export default function PokemonDetails() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { name } = router.query;

  const { data } = useQuery(GET_SINGLE_POKEMON, {
    variables: { name },
  });

  const converHeight = (num) => {
    const meters = 0.79;
    const feet = Math.floor(meters * 3.28084);
    const inches = Math.round((meters * 3.28084 - feet) * 12);
    return `${feet}'${inches}"`;
  };
  function covertKgToLbs(num) {
    const kg = parseFloat(num);
    const lbs = kg * 2.20462;
    return `${lbs.toFixed(2)}`;
  }
  const renderTypes = (value) => {
    return (
      <div className="flex flex-col md:flex-row gap-1 ">
        <div className="h-6 w-24 text-center rounded-lg bg-green-400">
          {value}
        </div>
      </div>
    );
  };
  const renderWeekness = (value) => {
    return (
      <div className="flex flex-col md:flex-row gap-1 ">
        <div className="h-6 w-24 text-center rounded-lg bg-green-400">
          {value}
        </div>
      </div>
    );
  };
  const renderResistant = (value) => {
    return (
      <div className="flex flex-col md:flex-row gap-1 ">
        <div className="h-6 w-24 text-center rounded-lg bg-green-400">
          {value}
        </div>
      </div>
    );
  };

  return (
    <div className=" container mx-auto h-full">
      <div className="flex justify-center gap-4 items-center my-16">
        <div className="text-black  font-bold text-4xl">
          {data?.pokemon?.name}
        </div>
        <div className="text-black/[0.5] text-4xl font-bold">
          #{data?.pokemon?.number}
        </div>
      </div>
      <div className="p-2 flex flex-col items-center gap-24 md:flex-row">
        <div className="min-h-[600px] w-[400px] xl:w-[500px]  bg-[#F2F2F2] rounded-lg flex justify-center items-center">
          <Image
            src={data?.pokemon?.image}
            alt="image"
            className="object-cover"
            height={300}
            width={300}
          />
        </div>
        <div className="min-h-[600px] w-[400px] xl:w-[500px] bg-[#30A7D7] p-12  rounded-lg">
          <div>
            <h1 className="text-white text-3xl">Category</h1>
            <h1 className="text-2xl mt-4">{data?.pokemon?.classification}</h1>
          </div>
          <h1 className="text-white text-3xl mt-2">Height</h1>
          <h1 className="tracking-[4px] text-2xl">
            {converHeight(data?.pokemon?.height?.maximum)}
          </h1>
          <h1 className="text-white text-3xl mt-2">Weight</h1>
          <h1 className=" text-2xl">
            {covertKgToLbs(data?.pokemon?.weight?.maximum)} Lbs
          </h1>
          <h1 className="text-white text-3xl mt-2">Type</h1>
          <div className="mt-2 flex gap-2">
            {data?.pokemon?.types.map((x) => renderTypes(x))}
          </div>
          <h1 className="text-white text-3xl mt-2">Weekness</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {data?.pokemon?.weaknesses?.map((x) => renderWeekness(x))}
          </div>
          <h1 className="text-white text-3xl mt-2">Resistance</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {data?.pokemon?.resistant?.map((x) => renderResistant(x))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="bg-green-400 h-12 w-[200px] mt-4 rounded-lg"
        >
          Open Evolution
        </button>
      </div>
      <EvolutionCardModal
        open={open}
        setOpen={setOpen}
        id={data?.pokemon?.id}
        name={data?.pokemon?.name}
        image={data?.pokemon?.image}
        types={data?.pokemon?.types}
        number={data?.pokemon?.number}
      />
    </div>
  );
}
