

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            return next(new Error(err, { cause: 500 }))
        })
    }
}


export const globalErrorHandling = (err, req, res, next) => {
    if (err) {
        return res.status(err.cause || 500).json({ message: err.message, err, stack: err.stack })
    }
}