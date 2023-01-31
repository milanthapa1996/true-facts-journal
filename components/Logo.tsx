import Image from "next/image";

const Logo = (props: any) => {
  const { renderDefault } = props;

  return (
    <div className="flex items-center space-x-2">
      <Image
        className="rounded-full object-cover"
        width={50}
        height={50}
        src="https://avatars.githubusercontent.com/u/59304271?s=400&u=b872c18cd43ab724edfb712b88420304350c473c&v=4"
        alt="logo"
      />
      <>{renderDefault(props)}</>
    </div>
  );
};

export default Logo;