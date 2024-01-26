export default class ImapError extends Error {
    type = '';
    source = '';
    textCode = '';

    constructor(message) {
        super(message)
    }
}