export interface BaseContract {
    all(
        paginate?: boolean,
        page?: number,
        dataPerPage?: number,
        relations?: string[],
        whereConditions?: Record<string, any>,
        search?: { columns: string[]; value: string } | null
    ): Promise<any>;

    filter(
        column: string[],
        whereConditions?: object,
        relations?: string[],
        relationCondition?: string,
        whereHasConditions?: object,
        paginate?: boolean,
        page?: number,
        dataPerPage?: number
    ): Promise<any>;

    findById(id: number | string, relations?: string[]): Promise<any>;

    create(params: object): Promise<any>;

    update(id: number, params: object): Promise<any>;

    delete(id: number): Promise<boolean>;
}
