export function errorFormat(message: string, statusCode = 400) {
    return {
        error: true,
        message,
        statusCode,
    }
}
export function validationFormFormat(messages: object) {
    return {
        error: true,
        messages
    }
}