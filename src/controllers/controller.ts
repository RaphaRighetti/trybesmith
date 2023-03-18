import { Response, Request } from 'express';
import Service from '../services/service';

class Controller {
  service: Service;

  constructor(tableName: string) {
    this.service = new Service(tableName);
  }

  getAll = async (_req: Request, res: Response) => {
    try {
      const response = await this.service.getAll();
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  };
  
  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await this.service.getById(id);
    res.status(200).json(response);
  };

  deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.deleteById(id);
    res.status(204).json({ message: 'deleted successfully' });
  };

  insertInto = async (req: Request, res: Response) => {
    const newInstance = req.body;
    const result = await this.service.insertInto(newInstance);
    res.status(201).json(result);
  };
}

export default Controller;