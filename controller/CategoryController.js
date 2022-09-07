const { Category } = require("../model");

module.exports = {
  find: async (req, res, next) => {
    try {
      const {
        search = "",
        searchBy = "id",
        order = "desc",
        orderBy = "id"
      } = req.query;

      //Find, sort and paginate the Activity
      const theCategory = await Category.paginate(
        { [searchBy]: { $regex: `${search}` } },
        { sort: { [orderBy]: order }, limit: 1000 }
      );

      //Send the response
      res.send(theCategory.docs);
    } catch (err) {
      //Send the error
      next(err);
    }
  }
};
