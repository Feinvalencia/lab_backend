const { Activity } = require("../model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { activity } = req.body;

      //Create new post
      const newActivity = await new Activity(activity).save();

      //Send the response
      res.send({
        data: {
          activity: newActivity,
        },
        status: {
          code: 200,
          message: "Actividad dada de alta con éxito",
          succeeded: true,
        },
      });
    } catch (err) {
      //Send the error
      next(err);
    }
  },

  find: async (req, res, next) => {
    try {

      const {
        search = "",
        searchBy = "description",
        order = "desc",
        orderBy = "createdAt",
      } = req.query;

      //Find, sort and paginate the Activity
      const theActivity = await Activity.paginate(
        { [searchBy]: { $regex: `${search}` } },
        { sort: { [orderBy]: order } }
      );

      //Send the response
      res.send({
        data: {
          activity: theActivity.docs,
          total: theActivity.total,
        },
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true,
        },
      });
    } catch (err) {
      //Send the error
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      //Find a activity by Id
      const theActivity = await Activity.findById(id);

      //Send the response
      res.send({
        data: {
          activity: theActivity,
        },
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true,
        },
      });
    } catch (err) {
      //Send the error
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { activity } = req.body;

      //Find a activity by Id and update
      const theActivity = await Activity.findByIdAndUpdate(id, { ...activity });

      //Send the response
      res.send({
        data: {
          activity: theActivity,
        },
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true,
        },
      });
    } catch (err) {
      //Send the error
      next(err);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { activity } = req.body;

      //Find a activity by id and remove it
      const theActivity = await Activity.findByIdAndRemove(id);

      //Send the response
      res.send({
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true,
        },
      });
    } catch (err) {
      //Send the error
      next(err);
    }
  },

  updateEventsActivity: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { events } = req.body;
      activity = {
        events,
      };
      console.log(activity);

      //Find a activity by Id and update
      const theActivity = await Activity.findByIdAndUpdate(id, { ...activity });

      //Send the response
      res.send({
        data: {
          activity: theActivity,
        },
        status: {
          code: 200,
          message: "Operation handle correctly",
          succeeded: true,
        },
      });
    } catch (err) {
      //Send the error
      next(err);
    }
  },
};
