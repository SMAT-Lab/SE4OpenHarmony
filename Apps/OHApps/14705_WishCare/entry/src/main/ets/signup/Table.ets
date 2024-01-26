import { Account } from './Account';

export class Table {
  data: Account[] = [];

  select(id: number): Account {
    return this.data.find(d => d.id === id);
  }

  insert(account: Account): boolean {
    this.data.push(account);
    return true;
  }

  update(account: Account): boolean {
    let index = this.data.findIndex(d => d.id === account.id);
    if (index !== -1) {
      this.data[index] = account;
      return true;
    }
    return false;
  }

  delete(id: number): boolean {
    let index = this.data.findIndex(d => d.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }
}