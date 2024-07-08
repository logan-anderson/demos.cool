# The Demos.Cool Framework

I created my own mini framework to help me build demos faster. All of the code for the framework can be found in the [framework folder](https://github.com/logan-anderson/demos.cool/tree/main/framework). The framework uses vite, and can theoretically support any frontend framework, but I have only tested React so far.

The framework currently only supports static server side rendering (SSR but only at build time) but could easily be extended to support dynamic SSR.

## Features

### Rendering

- Static html via a page.html
- Static markdown (like this page) via a page.md
- Static components via an entry-server.tsx
- Optionally hydrate the static components with client side rendering via an entry-client.tsx

### Routing

- File system based routing in the [pages folder](https://github.com/logan-anderson/demos.cool/tree/main/pages) (e.g. /pages/about/page.md -> /about)
- Client side routing between pages (currently uses [flamethrower](https://github.com/fireship-io/flamethrower/))

### Layouts

At any level you can add a layout that will be wrapped around the page for all children pages. For example, if you want a layout for all pages in the about folder you can add an [about/layout.tsx]() file.

### Data fetching

You can fetch data in the `entry-server.tsx` file and pass it to the page as props. This is useful for fetching data that is needed for the page to render.

### Tailwind

Tailwind is including by default but theoretically any styling system could be used.

## Why build my own framework?

Because it was fun! I have used so many frameworks I wanted to kick the tires and see how hard it would be to build my own.

## Framework Goals

### Be explicit

A lot of frameworks do a lot of "magic" behind the scenes. This is great for getting started quickly but can be a pain to understand the entire picture of what is **really** happening. In this framework everything is going to be explicit as possible. The user will provide the entry to the server and the client.

### Be simple

This framework will _try_ to not take on too much. While the framework will provide necessary abstractions, **if it can be done it user land it should be**.

When you inspect the html code that is generated / served you should understand all of it. No magic. No hidden code. No extra cruft that you didn't add yourself.
