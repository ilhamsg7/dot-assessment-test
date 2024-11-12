import { RegisterRequest, RegisterResponse, UpdateUserRequest } from '../../schema/auth';
import { BaseContract } from './BaseContract';

interface UserContract extends BaseContract {
    getAll(): Promise<any>;
    getById(id: number): Promise<any>;
    createData(data: RegisterRequest): Promise<RegisterResponse>;
    editData(id: number, data: UpdateUserRequest): Promise<RegisterResponse>;
    deleteData(id: number): Promise<boolean>;
}

export default UserContract;