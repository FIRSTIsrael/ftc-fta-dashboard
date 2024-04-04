FROM oven/bun:latest

ADD package.json ./
ADD bun.lockb ./

RUN bun install

ADD . ./

RUN bun run build

CMD ["bun", "run", "start"]