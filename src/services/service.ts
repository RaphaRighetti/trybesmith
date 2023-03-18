import Model from '../models/model';

class Service {
  model: Model;

  expectedKeys: string[];

  constructor(tableName: string, expectedKeys?: string[] | undefined) {
    this.model = new Model(tableName);
    this.expectedKeys = expectedKeys || ['name'];
  }

  getAll = async () => {
    try {
      return await this.model.getAll();
    } catch (err) {
      console.log(err);
    }
  };

  getById = async (id: number | string) => {
    try {
      return await this.model.getById(Number(id));
    } catch (err) {
      console.log(err);
    }
  };

  deleteById = async (id: number | string): Promise<void> => {
    try {
      await this.model.deleteById(Number(id));
    } catch (err) {
      console.log(err);
    }
  };

  static validateKeys(keys: string[], obj: Record<string, unknown>): void {
    const objKeys = Object.keys(obj);
    if (objKeys.length !== keys.length && keys.every((e) => objKeys.includes(e))) {
      throw new Error('passe todos os valores necessários');
    }
  }

  insertInto = async (newInstance: Record<string, unknown>) => {
    try {
      Service.validateKeys(this.expectedKeys, newInstance);
      const result = await this.model.insertInto(newInstance);
      return result;
    } catch (err) {
      console.log(err);
    }
  };
}

export default Service;