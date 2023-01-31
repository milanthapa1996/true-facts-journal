import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const StudioNavbar = (props: any) => {
  return (
    <div>
      <>
        <div className="flex items-center justify-between p-5">
          <Link className="text-[#8F00FF] flex items-center" href="/">
            <ArrowUturnLeftIcon className="h-3 w-6 text-[#8F00FF] mr-2" />
            Go To Website
          </Link>

           <span className="text-[#8F00FF]"> Built By Milan Thapa</span>
        </div>
        {props.renderDefault(props)}
      </>
    </div>
  );
};

export default StudioNavbar;