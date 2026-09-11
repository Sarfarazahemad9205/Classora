function Welcome() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-16 text-center">

      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-200 opacity-30"></div>

      <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-blue-100 opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Tagline */}
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
          Learn • Practice • Achieve
        </p>

        {/* Heading */}
        <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
          Welcome to{" "}
          <span className="text-blue-600">
            E-Learning
          </span>
        </h1>

        {/* Main description */}
        <p className="mt-8 text-xl font-medium leading-relaxed text-gray-700 md:text-2xl">
          Your complete Class 10 learning platform
        </p>

        {/* Subjects description */}
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-gray-500 md:text-lg">
          Learn Class 10{" "}
          <span className="font-bold text-blue-600">Science</span>,{" "}
          <span className="font-bold text-blue-600">Mathematics</span> and{" "}
          <span className="font-bold text-blue-600">English</span>{" "}
          in one place.
        </p>
 

        </div>

     
    </section>
  );
}

export default Welcome;