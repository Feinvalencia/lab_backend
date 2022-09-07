const { Event } = require("../model");

module.exports = {
  create: async (req, res, next) => {
    try {

      const { event } = req.body;

      //Create new post
      const newEvent = await new Event(event).save();

      //Send the response
      res.send({
        data: {
          event: newEvent
        },
        status: {
          code: 200,
          message: "Alta con éxito",
          succeeded: true
        }
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
        searchBy = "title",
        order = "desc",
        orderBy = "createdAt"
      } = req.query;

      //Find, sort and paginate the Event
      const theEvents = await Event.paginate(
        { [searchBy]: { $regex: `${search}` } },
        { sort: { [orderBy]: order }, limit: 1000 }
      );

      //Send the response
      //res.send(theEvent.docs);
      res.send({
        data: {
          events: theEvents.docs,
          total: theEvents.total,
        },
        status: {
          code: 200,
          message: "Successful request",
          succeeded: true,
        }
      });
    } catch (err) {
      //Send the error
      next(err);
    }
  },

  findAllByCategory: async (req, res, next) => {
    try {
      const { id } = req.params;

      //Find a activity by Id
      var query = { idCategory: id };
      const theEvents = await Event.find(query);

      //Send the response
      res.send(theEvents);
    } catch (err) {
      //Send the error
      next(err);
    }
  },


  destroy: async (req, res, next) => {
    try {
      const { idEvent } = req.params;
     var query = { idEvent: idEvent };
      //Find a activity by id and remove it
      const theEvent = await Event.findOneAndDelete({idEvent: idEvent});

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
};
