const handleSaveError = (err, data, next) => {
  err.status =
    err.name === "MongoServerError" && err.code === 11000 ? 409 : 400;
  next();
};

const runValidationOnUpdate = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};

export default { handleSaveError, runValidationOnUpdate };
