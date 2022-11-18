function saleIdValidate(req, res, next) {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: 'Sale not found',
    });
  }
  if (id.length < 5) {
    return res.status(404).json({
      message: 'Sale not found',
    });
  }
  return next();
}

module.exports = {
  saleIdValidate,
};
