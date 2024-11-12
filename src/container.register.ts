import 'reflect-metadata';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import AuthContract from './contract/AuthContract';
import AuthService from './service/AuthService';
import UserContract from './contract/UserContract';
import UserService from './service/UserService';
import PostContract from './contract/PostContract';
import PostService from './service/PostService';

const prisma = new PrismaClient();

container.registerInstance("PrismaClient", prisma);

container.register<UserContract>("UserContract", { useClass: UserService });
container.register<AuthContract>("AuthContract", { useClass: AuthService });
container.register<PostContract>("PostContract", { useClass: PostService });
