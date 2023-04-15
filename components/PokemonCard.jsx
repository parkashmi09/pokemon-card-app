import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PokemonCard({ data }) {
  const router = useRouter();
  const renderTypes = (value) => {
    return (
      <div className="flex flex-col md:flex-row gap-1 ">
        <div className="h-6 w-24 text-center rounded-lg bg-green-400">
          {value}
        </div>
      </div>
    );
  };
  return (
    <div className="container mx-auto p-4">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center">
        {data?.map((items) => {
          return (
            <Link
              href={`/pokemon/${items.name}`}
              key={items?.id}
              className="cursor-pointer"
            >
              <div className="h-[300px] w-[300px] bg-[#F2F2F2] flex justify-center items-center">
                <Image
                  src={items?.image}
                  alt="image"
                  className="object-cover"
                  height={200}
                  width={200}
                />
              </div>
              <div className="p-2 my-4">
                <div className=" text-black/[0.5] text-xl font-bold">
                  #{items?.number}
                </div>
                <div className="text-2xl font-bold">{items?.name}</div>
                <div className="mt-2 flex gap-2">
                  {items?.types.map((x) => renderTypes(x))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
