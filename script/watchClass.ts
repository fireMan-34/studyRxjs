import { argv, cwd } from "process";
import { execSync } from "child_process";

const [classString] = argv.slice(2);

if (!classString) {
  throw new Error("must use like npm run watch ${number}");
}

console.log(classString, "=======>");

execSync(
  `pnpm ts-node-dev -r tsconfig-paths/register --clear --respawn ${classString}.ts`,
  {
    encoding: "utf8",
    stdio: "inherit",
    cwd: cwd(),
  }
);
