export const HomePage = () => {
  return (
    <main>
      <link rel="stylesheet" href="/src/home/homePage.css" />
      <div className="text-center">
        <h1 className="text-6xl my-3">
          <span className="wave">👋</span> Welcome to demos.cool
        </h1>
        <p className="text-2xl my-3">
          This is my personal collection of
          <strong className="text-brand-50 font-extrabold"> cool </strong>demos
          all built with my own homebrewed framework.
        </p>
        <div className="my-7">
          <a className="p-2 rounded-full bg-brand-50" href="/demos">
            <span className="bg-gradient-to-r hover:text-brand-400  from-blue-500  to-brand-400 text-transparent bg-clip-text font-bold py-2 px-4 rounded-full transition-colors">
              View Demos
            </span>
          </a>
        </div>
      </div>
    </main>
  );
};
