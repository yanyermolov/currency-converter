export const errorHandler = (err) => {
    const message = err?.response?.data?.message

    return new Error(message || err.toJSON())
}