export class Paging {
  readonly page: number;
  readonly page_size: number;
  readonly total_page: number;
  readonly total: number;

  constructor(page: number, page_size: number, total: number) {
    this.page = page;
    this.page_size = page_size;
    this.total= total;
    this.total_page = Math.ceil(total % page_size === 0 ? total/page_size + 1 : total/page_size)
  }
}

//Math.ceil(x) dùng để làm tròn số, nó sẽ luôn trả về số nguyên lớn hơn x.