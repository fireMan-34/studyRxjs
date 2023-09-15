// 一些类有趣的写法
class Persion {

  constructor(public name: string) {

  }

  getName() {
    console.log(this.name);
  }

  print() {
    void this.getName();
  }
}

const p = new Persion('23456');

p.print();