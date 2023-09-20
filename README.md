This is an Ad Board created using Next.js and boostrapped using create-next-app.

## Getting Started

1. Install the dependencies by running: `npm install`
2. Configure the `.env` file.
3. Run `npx prisma generate` to load the schema and initialize Prisma Client
4. Run `npm run dev` to start the development server.
5. (Optional) You can seed the db by running `npx prisma seed`


## Parsing CSV Files


Ad details can be uploaded through `.csv` files with column sequence: `title, description, url\n`.

```
e.g.

title,description,url
L. Perrigo Company,et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis,https://google.com
```
