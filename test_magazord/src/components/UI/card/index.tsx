import { CardProps } from "./types";
import { FaStar } from "react-icons/fa";
import ForkIcon from "@/components/UI/icons/forkIcon";

export default function CardHorizontal({...props}: CardProps) {
  return (
    <div className="w-full bg-[#ededed] mb-5 md:w-1/2" >
      <div className="flex flex-col h-25 gap-4 py-4">
        <button>
          {" "}
          <h4 className="font-light text-start">
            {props.full_name}
          </h4>
        </button>
        <p className="text-[#989898]">
          {props.description}
        </p>

        <div className="flex flex-row gap-5 ">
          <button  className="flex gap-2">
            <FaStar /> {props.stargazers_count}
          </button>
          <button className="flex gap-2">
            <ForkIcon /> {props.forks_count}
          </button>
          <button>
            {props.language}
          </button>
        </div>
      </div>
    </div>
  );
}
