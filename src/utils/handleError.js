const handleError = (res, errors, tags) => {
    console.log(`Error occured in ${tags}: ${errors}.`)
    res.status(500).json({
        errors: errors
    });
}

module.exports = handleError;