const handleSaveError = (err, data, next) => {
  err.status = 400;
  next();
};

const runValidationOnUpdate = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};

export default { handleSaveError, runValidationOnUpdate };
