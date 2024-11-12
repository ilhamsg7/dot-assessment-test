import { AuthRequest, AuthResponse, RegisterRequest, RegisterResponse } from '../../schema/auth';
import { BaseContract } from './BaseContract';

interface AuthContract extends BaseContract {
    login(request: AuthRequest): Promise<AuthResponse>;
    register(request: RegisterRequest): Promise<RegisterResponse>;
}

export default AuthContract;