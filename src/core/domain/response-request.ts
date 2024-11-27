
export class ResponseRequest {
    constructor(
        readonly status: boolean=false,
        readonly statusCode: number=400,
        readonly message: string='',
        readonly data?: any
    ) {
    }

}