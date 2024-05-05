module.exports = (functionToBeWrapped) => {
    return (req, res, next) => {
        functionToBeWrapped(req, res, next).catch(next);
    };
};
