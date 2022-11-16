## Preview

![Preview](https://user-images.githubusercontent.com/91349014/198830652-7008c1c2-0745-46e7-b7ee-6ed38dc30610.mp4)
[![Watch the video](https://user-images.githubusercontent.com/91349014/198830724-1585477c-524f-49d6-8af2-3cdb4307ec06.png)](https://user-images.githubusercontent.com/91349014/198830652-7008c1c2-0745-46e7-b7ee-6ed38dc30610.mp4)

# Create JD App

This project was created using [Create JD App](https://github.com/OrJDev/create-jd-app)

# Deploying

### Vercel Adapter (or any other adapter that solid-start supports)

#### Installing

```bash
npm install -D solid-start-vercel@latest
```

#### Adding to vite config

```ts
import solid from "solid-start/vite";
import { defineConfig } from "vite";
// @ts-ignore
import vercel from "solid-start-vercel";

export default defineConfig({
  plugins: [solid({ ssr: false, adapter: vercel({ edge: false }) })],
});
```

### Enviroment Variables

- `ENABLE_VC_BUILD` set to `1` .
- If you are using prisma: `DATABASE_URL` set to your `database url`.

### In Case You Are Using Prisma

i created a script that will copy prisma schema to the vercel output folder, if you are using different service please modify the `postbuild` script in `package.json` and make sure you copy the scheme to the output folder.

### You Are Done

Create a github repo and push your code to it, then deploy it to vercel (:
