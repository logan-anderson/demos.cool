export const Header = ({ demos }: { demos: string[] }) => {
  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-24 w-auto" src="/logo.svg" alt="" />
          </a>
          <div className="flex gap-x-3 lg:gap-x-12">
            {demos.map((demo) => (
              <a
                key={demo}
                href={`/demos/${demo}`}
                className="text-sm font-semibold leading-6 text-gray-200"
              >
                {demo}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
