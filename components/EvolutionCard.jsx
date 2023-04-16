import { gql, useQuery } from "@apollo/client";
import React from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineWarning, AiOutlineCloseCircle } from "react-icons/ai";

const GET_SINGLE_QUERY_EVOLUTION = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      evolutions {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        evolutions {
          id
        }
        maxHP
        image
      }
    }
  }
`;

export default function EvolutionCardModal({
  open,
  setOpen,
  id,
  name,
  image,
  types,
  number,
}) {
  const { data } = useQuery(GET_SINGLE_QUERY_EVOLUTION, {
    variables: { name, id },
  });
  const renderTypes = (value) => {
    return (
      <div className="flex flex-col md:flex-row gap-1 ">
        <div className="h-6 w-16 text-center rounded-lg bg-green-400">
          {value}
        </div>
      </div>
    );
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div className="">
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={() => setOpen(false)}>
          <AiOutlineCloseCircle className="h-12 w-12" />
        </button>
        <div className="w-full">
          <div className="container mx-auto p-6">
            {!data?.pokemon?.evolutions ? (
              <div className="w-[300px] md:w-[400px]  lg:w-[800px] flex flex-col justify-center items-center">
                <h1 className="text-2xl text-center font-bold mb-2">
                  No Evolutions Data Available
                </h1>
                <AiOutlineWarning size={60} />
              </div>
            ) : (
              <div className="px-2 xl:px-0 flex flex-col lg:flex-row gap-8 w-[300px] md:w-[400px]  lg:w-[800px] justify-center items-center">
                <div className="">
                  <Image
                    src={image}
                    width={200}
                    height={200}
                    className="min-h-[100px] max-w-[100px] rounded-full border border-slate-400 object-fit overflow-hidden"
                    alt=""
                  />
                  <div className="p-2 my-4 flex gap-2">
                    <div className=" text-black/[0.5] text-lg font-bold">
                      #{number}
                    </div>
                    <div className="text-lg font-bold">{name}</div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {types.map((x) => renderTypes(x))}
                  </div>
                </div>
                {data?.pokemon?.evolutions?.map((d) => {
                  return (
                    <div key={d?.id}>
                      <div className="">
                        <Image
                          src={d?.image}
                          width={200}
                          height={200}
                          className="h-[100px] w-[100px] rounded-full border border-slate-400 object-fit overflow-hidden"
                          alt=""
                        />
                        <div className="p-2 my-4 flex gap-2">
                          <div className=" text-black/[0.5] text-lg font-bold">
                            #{d?.number}
                          </div>
                          <div className="text-lg font-bold">{d?.name}</div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          {d?.types.map((x) => renderTypes(x))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
