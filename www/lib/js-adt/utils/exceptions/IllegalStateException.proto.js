function IllegalStateException(sMessage) {
    this.message = sMessage;
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, IllegalStateException);
    else
        this.stack = (new Error()).stack;
}
IllegalStateException.prototype = Object.create(Error.prototype);
IllegalStateException.prototype.name = "IllegalStateException";
IllegalStateException.prototype.constructor = IllegalStateException;
