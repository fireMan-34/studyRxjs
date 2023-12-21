import { cwd, argv } from 'process';
import { writeFile, readFile } from 'fs/promises';
import packageJson from '../package.json';
import { createConsole } from 'utils/log';
import { join } from 'path';



const logger = createConsole({
    prefix: 'creatClass',
    shuffix: '--------------------------------',
});

const [ nodePath, scriptPath, className ] = argv;

async function genCmd () {
    const cmdName = `watch:${className}`;
    if (packageJson.scripts[cmdName]) {
        logger.warn(`当前命令已存在，跳过执行 ${cmdName}`);
    }
    packageJson.scripts[cmdName] = `ts-node-dev -r tsconfig-paths/register --clear --respawn ${className}.ts`;
    const nextPackageJsonContent = JSON.stringify(packageJson, null, 2);
    await writeFile(join(cwd(), 'package.json'), nextPackageJsonContent, { encoding: 'utf8' });
};

async function updateCode() {
    const codePath = join(cwd() , `${className}.ts`);
    let code = await readFile(codePath, { encoding: 'utf8' });

    code = code.replace(/shuffix: '',/gm, `shuffix: '${className}',`);

    await writeFile(codePath, code, { encoding: 'utf-8' });
};

async function main() {
    try {
        if (Number.isNaN(Number(className))) {
            throw new TypeError(`${className} must be a number`);
        }
        logger.log(`当前执行路径: ${cwd()}`)
        // 采用脚本变量形式降低 package Json 代码
        // await genCmd();
        await updateCode();
    } catch(err) {
        logger.error(err);
    }
}

main();