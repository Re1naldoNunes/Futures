async function tryCatchWrapper(fn, successMessage, errorMessage, req) {
    try {
        await fn();
        req.flash('success', successMessage);
    } catch (error) {
        req.flash('error', errorMessage);
    }
}

module.exports = tryCatchWrapper;
