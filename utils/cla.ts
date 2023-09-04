/** @fileoverview 面向对象学习 */
import { createConsole } from 'utils/log';

const logger = createConsole({
  prefix: '面向对象 studying',
  shuffix: '------- end ----------'
});

export enum SEX {
  male,
  female,
}

export interface IPersionData {
  name: string;
  birthDate: Date;
  sex: SEX;
}

export interface IPersionMethod {
  see(): void;
  listen(): void;
  study(): void;
}

/** 
 * 装饰器
 * @see https://wangdoc.com/typescript/decorator
 */
export const createPersion = (target: Function, runtime: ClassDecoratorContext) => {
  logger.info('target:', target);
  logger.info('runtime:', runtime);
};

// ----------- 类装饰器 start -----------
export const createPersionFactory = (enabled?: boolean) => {

  logger.info('是否激活打印: ---->', enabled ? 'true' : 'false');

  if (enabled) {
    return createPersion;
  }
  else {
    return () => void 0;
  }
}

export const createPersionFlagFactory = (flag?: boolean) => {
  return (target, context: ClassDecoratorContext) => {
    return class extends target {
      static flag: boolean = flag;
    }
  };
};

// ----------- 类装饰器 end -----------

// ----------- 类方法装饰器 start -----------

export const createPersionMethod = (value: Function, context: ClassMethodDecoratorContext) => {
  logger.info('当前装饰方法名:', context.name);
};

// ----------- 类方法装饰器 end -----------

export @createPersion @createPersionFactory(true) @createPersionFlagFactory(true)  class Persion implements IPersionData, IPersionMethod {
  name: string;
  birthDate: Date;
  sex: SEX;

  constructor(persionData: IPersionData) {
    this.name = persionData.name;
    this.birthDate = persionData.birthDate;
    this.sex = persionData.sex;
  }

  @createPersionMethod
  see(): void {

  }

  @createPersionMethod
  listen(): void {

  }

  @createPersionMethod
  study(): void {

  }
}

logger.info('类: -------> 比较前输出 ', Persion, );
logger.info('静态属性劫持测试', Persion['flag'] ? '有效' : '无效');

const persion = new Persion({
  name: 'fireMan-34',
  birthDate: new Date(2000),
  sex: SEX.male,
});

logger.info('查看实例名字:', persion.name);
logger.info('查看原型标记:', Object.getPrototypeOf(persion));
logger.info('查看构造标记:', Object.getPrototypeOf(persion).constructor);

persion.see();

