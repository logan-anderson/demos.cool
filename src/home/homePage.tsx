export const HomePage = () => {
  return (
    <main>
      <link rel="stylesheet" href="/src/home/homePage.css" />
      <div className="text-center">
        <h1 className="text-6xl my-3">
          <span className="wave">👋</span> Welcome to demos.cool
        </h1>
        <p className="text-2xl my-3">
          A collection of
          <strong className="text-brand-50 font-extrabold"> cool </strong>demos
          for web developers
        </p>
      </div>
    </main>
  );
};
