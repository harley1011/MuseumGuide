function IllegalArgumentException(sMessage) {
    this.message = sMessage;
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, IllegalArgumentException);
    else
        this.stack = (new Error()).stack;
}
IllegalArgumentException.prototype = Object.create(Error.prototype);
IllegalArgumentException.prototype.name = "IllegalArgumentException";
IllegalArgumentException.prototype.constructor = IllegalArgumentException;
