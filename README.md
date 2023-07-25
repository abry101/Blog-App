# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## JsonPlaceHolder API

- `https://jsonplaceholder.typicode.com/users`
- `https://jsonplaceholder.typicode.com/posts`

### Theme specific CSS

```
<... className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert" ...>

```

### Theme Colors

> - #1E2952 - Space cadet(dark blue)
> - #002366 - Royal blue
> - #00563B - Castleton green

### Linear Gradient CSS

```
/* A gradient tilted 45 degrees, starting blue and finishing red */
 -> linear-gradient(45deg, blue, red);

/* A gradient going from the bottom right to the top left corner, starting blue and finishing red */
 -> linear-gradient(to left top, blue, red);

/* Color stop: A gradient going from the bottom to top, starting blue, turning green at 40% of its length, and finishing red */
 -> linear-gradient(0deg, blue, green 40%, red);

/* Color hint: A gradient going from the left to right, starting red, getting to the midpoint color 10% of the way across the length of the gradient, taking the rest of the 90% of the length to change to blue */
 -> linear-gradient(.25turn, red, 10%, blue);

/* Multi-position color stop: A gradient tilted 45 degrees, with a red bottom-left half and a blue top-right half, with a hard line where the gradient changes from red to blue */
 -> linear-gradient(45deg, red 0 50%, blue 50% 100%);
```
