import { readFileSync, writeFileSync } from "fs";

const from = JSON.parse(
  readFileSync(`./data/${process.env.FROM}.json`).toString()
);
const to = JSON.parse(readFileSync(`./data/${process.env.TO}.json`).toString());

const cond = (title) => /^tumblr\-/.test(title);

const candidate = from.pages.filter((page) => cond(page.title));
to.pages = [...to.pages, ...candidate];
from.pages = from.pages.filter((page) => !cond(page.title));

writeFileSync(`./result/${process.env.FROM}.json`, JSON.stringify(from));
writeFileSync(`./result/${process.env.TO}.json`, JSON.stringify(to));
