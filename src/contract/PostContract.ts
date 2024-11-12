import { BaseContract } from './BaseContract';

interface PostContract extends BaseContract {
    getAll(): Promise<any>;
    getById(id: number): Promise<any>;
    createData(data: any): Promise<any>;
    editData(id: number, data: any): Promise<any>;
    deleteData(id: number): Promise<boolean>;
}

export default PostContract;