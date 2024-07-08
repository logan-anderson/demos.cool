export const Header = ({ demos, url }: { demos: string[]; url: string }) => {
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
                aria-pressed={url === `demos/${demo}/` ? "true" : "false"}
                href={`/demos/${demo}/`}
                // className="text-sm font-semibold leading-6"
                className="text-sm font-semibold leading-6 p-2 shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] aria-pressed:shadow-[0_4px_0px_rgb(0,0,0)]  bg-brand-500 ease-out hover:translate-y-1  aria-pressed:translate-y-1  transition-all rounded"
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
