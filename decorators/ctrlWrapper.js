const ctrlWrapper = (controller) => {
  const wrapper = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
  return wrapper;
};

export default ctrlWrapper;
