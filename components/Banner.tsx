import Image from "next/image";
import Link from "next/link";
import DarkModeButton from "./DarkModeButton";

const Banner = () => {
  return (
    <div
      className="flex flex-col justify-between font-bold px-10 py-5 mb-6
            lg:flex-row lg:space-x-5"
    >
      <div>
        <Link href={"/"}>
          <Image
            src="/images/tfj_logo.png"
            alt="TFJ Logo"
            width={150}
            height={0}
            className=""
          />
        </Link>

        <h2
          className="mt-5 text-gray-600"
        >
          Welcome to{" "}
          <Link href={"/"}>
            <span className="underline underline-offset-2 decoration-4 decoration-[#DC3933] text-gray-600 border p-2 cursor-pointer">
              TFJ
            </span>
          </Link>
          {""} <i>Uncovering the truth, one click away</i>
        </h2>
      </div>
      <DarkModeButton />
    </div>
  );
};

export default Banner;