import { Observable, interval, first, last , map, takeLast } from 'rxjs';
import { createConsole } from 'utils/log';

enum SType {
  normal,
  more,
  like,
  unhealth,
  evil,
}

enum SMType {
  write,
  picAndWrite,
  picture,
}

enum DataProtocol {
  text,
}

interface S {
  /** 传播信息心灵范畴类型 */
  sType: SType[],
  /** 媒体传播途径 */
  sMType: SMType[],
  /** 
   * 纯文本
   */
  data: string,
  /**
   * 数据处理协议
   */
  dataProtocol: DataProtocol,
};

const logger = createConsole({
  prefix: 'simple',
  shuffix: 'world.s.ex',
});

async function main() {
  const SLikeWrite$ = new Observable<S>(o => {
    o.next({
      sMType: [SMType.write],
      sType: [SType.like],
      data: '纯纯写作',
      dataProtocol: DataProtocol.text,
    });

    o.next({
      sMType: [SMType.write],
      sType: [SType.like],
      data: '口袋写作',
      dataProtocol: DataProtocol.text,
    });
  });

  /** 普通读者 */
  const read_1_context = {
    count: 0,
  };
  /** 读者发现了一本好书，并订阅了它 */
  const reader_1 = SLikeWrite$.subscribe({
    next(value) {
      logger.info('读者阅读了', value.data);

      read_1_context.count += 1;
    },
  });

  const s$ = interval(2000);

  s$.pipe(
    map((v) => v + 10),
    // first(),
    takeLast(1),
    ).subscribe({
    next: logger.info,
  })
};

main();

