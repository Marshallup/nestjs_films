export class HttpSuccess {
    private success: boolean = true;
    private message: string;

    constructor(messageStr: string) {
        this.message = messageStr;
    }
}