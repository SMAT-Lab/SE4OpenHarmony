import { Table } from './Table';
import { Account } from './Account';

export class Database {
  tables: Map<string, Table> = new Map();
  constructor() {
    this.tables.set("Account", new Table());
  }
}
export let db = new Database();