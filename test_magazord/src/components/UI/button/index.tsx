import { ButtonProps } from "./types";
export default function Button({ ...props }: ButtonProps) {
  return (
    <button
      style={{ cursor: "pointer" }}
      className="bg-gradient-to-r from-[#0056A6] to-[#0587FF] text-white py-2 px-4 rounded-[42px] w-[145px]"
      onClick={props.onClick}
    >
      <div className="flex flex-row gap-4 align-center items-center">
        {props.icon}
        <p className="text-white">{props.label}</p>
      </div>
    </button>
  );
}
