import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';

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
export function createDir(path: string) {
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
}
export function removeFile(path: string) {
    try {
        unlinkSync(path);
    } catch(error) {
        throw new Error(error.message);
    }
}
export function cutAndPast(cutPath: string, pastePath: string): Boolean {
    copyFileSync(cutPath, pastePath);

    removeFile(cutPath);

    return true;
}