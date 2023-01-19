import Link from "next/link";
import Image from "next/image";
import DarkModeButton from "./DarkModeButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between space-x-2 font-bold px-10 py-5">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/59304271?s=400&u=b872c18cd43ab724edfb712b88420304350c473c&v=4"
            width={50}
            height={50}
            alt="logo"
          />
        </Link>
      </div>

      <div>
        <DarkModeButton />
      </div>
    </header>
  );
};

export default Header;