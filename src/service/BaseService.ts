import { PrismaClient, Prisma } from "@prisma/client";
import { BaseContract } from "../contract/BaseContract";
import { inject, injectable } from "tsyringe";

@injectable()
class BaseService<T extends keyof PrismaClient> implements BaseContract {
    protected prisma: PrismaClient;
    protected model: T;

    constructor(@inject('PrismaClient') prisma: PrismaClient, model: T) {
        this.prisma = prisma;
        this.model = model;
    }

    async all(
        paginate = false,
        page = 1,
        dataPerPage = 10,
        relations: string[] = [],
        whereConditions: Record<string, any> = {},
        search: { columns: string[]; value: string } | null = null
    ) {
        try {
            const whereClause = {
                ...whereConditions,
                ...(search && search.value
                    ? {
                        OR: search.columns.map((column) => ({
                            [column]: { contains: search.value, mode: "insensitive" },
                        })),
                    }
                    : {}),
            };
    
            const paginationOptions = paginate
                ? { skip: (page - 1) * dataPerPage, take: dataPerPage }
                : {};
    
            const query = await this.prisma[this.model].findMany({
                where: whereClause,
                include: relations.length
                    ? relations.reduce(
                        (acc, relation) => ({ ...acc, [relation]: true }),
                        {}
                    )
                    : undefined,
                orderBy: { id: "desc" },
                ...paginationOptions,
            });
    
            if (paginate) {
                const total = await this.prisma[this.model].count({
                    where: whereClause,
                });
    
                return {
                    data: query,
                    prev_page: page > 1 ? page - 1 : null,
                    current_page: page,
                    next_page: total > page * dataPerPage ? page + 1 : null,
                    total_pages: Math.ceil(total / dataPerPage),
                };
            } else {
                return query;
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching data: ${error.message}`);
            } else {
                throw new Error("Error fetching data: unknown error");
            }
        }
    }
    

    async filter(
        column: string[],
        whereConditions: object = {},
        relations: string[] = [],
        relationCondition?: string,
        whereHasConditions?: object,
        paginate = false,
        page = 1,
        dataPerPage = 10
    ) {
        try {
            const queryOptions: any = {
                where: {
                    ...whereConditions,
                    [relationCondition || ""]: whereHasConditions,
                },
                include: relations.length
                    ? relations.reduce(
                        (acc, relation) => ({ ...acc, [relation]: true }),
                        {}
                    )
                    : undefined,
            };

            const query = this.prisma[this.model].findMany(queryOptions);

            if (paginate) {
                const total = await this.prisma[this.model].count(queryOptions);
                const data = await query
                    .skip((page - 1) * dataPerPage)
                    .take(dataPerPage);

                return {
                    data,
                    prev_page: page > 1 ? page - 1 : null,
                    current_page: page,
                    next_page: total > page * dataPerPage ? page + 1 : null,
                };
            } else {
                return query;
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting data: ${error.message}`);
            } else {
                throw new Error("Error deleting data: unknown error");
            }
        }
    }

    async findById(id: number | string, relations: string[] = []) {
        try {
            const data = await this.prisma[this.model].findUnique({
                where: {
                    id: id,
                },
                include: relations.length
                    ? relations.reduce(
                        (acc, relation) => ({ ...acc, [relation]: true }),
                        {}
                    )
                    : undefined,
            });

            if (!data) {
                throw new Error(`Data with id ${id} not available.`);
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching data: ${error.message}`);
            } else {
                throw new Error("Error fetching data: unknown error");
            }
        }
    }

    async create(params: object) {
        try {
            const model = await this.prisma[this.model].create({ data: params });
            return model;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting data: ${error.message}`);
            } else {
                throw new Error("Error deleting data: unknown error");
            }
        }
    }

    async update(id: number, params: object) {
        try {
            const data = await this.prisma[this.model].update({
                where: { id },
                data: params,
            });
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting data: ${error.message}`);
            } else {
                throw new Error("Error deleting data: unknown error");
            }
        }
    }

    async delete(id: number) {
        try {
            await this.prisma[this.model].delete({ where: { id } });
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting data: ${error.message}`);
            } else {
                throw new Error("Error deleting data: unknown error");
            }
        }
    }
}

export default BaseService;
