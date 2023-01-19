const Banner = () => {
    return (
      <div
        className="flex flex-col justify-between font-bold px-10 py-5 mb-10
            lg:flex-row lg:space-x-5"
      >
        <div>
          <h1 className="text-5xl text-gray-800">AD Performance Blog</h1>
          <h2
            className="mt-5
                md:mt-8 text-gray-600"
          >
            Welcome to{" "}
            <span className="underline underline-offset-2 decoration-4 decoration-[#DC3933] text-gray-600">
              the athlete
            </span>
            {""} blog, from the field to the blog.
          </h2>
        </div>
        <p className=" max-w-xs md:mt-2 py-2 mt-6 font-extrabold text-gray-600">
          The{" "}
          <span className="underline underline-offset-2 decoration-4 decoration-[#DC3933]">
            {" "}
            ultimate resource
          </span>{" "}
          for athlete training, development and nutrition.
        </p>
      </div>
    );
  };
  
  export default Banner;