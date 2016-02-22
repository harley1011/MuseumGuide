function IllegalParameterListException(sMessage) {
    this.message = sMessage;
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, IllegalParameterListException);
    else
        this.stack = (new Error()).stack;
}
IllegalParameterListException.prototype = Object.create(Error.prototype);
IllegalParameterListException.prototype.name = "IllegalParameterListException";
IllegalParameterListException.prototype.constructor = IllegalParameterListException;
