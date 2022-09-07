const { Room } = require("../model");

module.exports = {
  create: async (req, res, next) => {

    try {

      let body = req.body;

      let {
        name,
        description,
        type,
        initialTime,
        endTime,
        capacity,
        airConditioner
      } = body;

      let newRoom = new Room({
        name,
        description,
        type,
        initialTime,
        endTime,
        capacity,
        airConditioner
      });

      await newRoom.save();

      console.log(newRoom);

      res.send({
        data: {
          room: newRoom,
        },
        status: {
          code: 200,
          message: "Room successfully registered",
          succeeded: true,
        }
      });
    } catch (err) {
      next(err);
    }
  },
  find: async (req, res, next) => {
    try {

      console.log(req.query);

      const {
        search = "",
        searchBy = "name",
        order = "desc",
        orderBy = "createdAt"
      } = req.query;

      const theRooms = await Room.paginate({
        [searchBy]: {
          $regex: `${search}`,
          $options: 'i'
        }
      }, {
        sort: {
          [orderBy]: order
        }
      });

      res.send({
        data: {
          rooms: theRooms.docs,
          total: theRooms.total,
        },
        status: {
          code: 200,
          message: "Succesful request",
          succeeded: true,
        }
      });

    } catch (err) {
      //se envia el error
      next(err);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;
      const room = await Room.findById({
        _id: id
      });

      if (!room) {
        return res.status(404).json({
          data: {
            room: room
          },
          status: {
            code: 404,
            message: "Room not found",
            succeeded: true,
          }
        });
      }

      await Room.findByIdAndRemove(id);

      res.send({
        data: {
          room: room
        },
        status: {
          code: 200,
          message: "Room successfully removed",
          succeeded: true,
        }
      });

    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {

    try {
      const { id } = req.params;
      let body = req.body;

      console.log("ID " + req.params.id);

      const room = await Room.findById({
        _id: id
      });

      if (!room) {
        return res.status(404).json({
          data: {
            room: room
          },
          status: {
            code: 404,
            message: "Room not found",
            succeeded: true,
          }
        });
      };

      const updatedRoom = await Room.findOneAndUpdate({ _id: id }, {
        name: body.name,
        description: body.description,
        type: body.type,
        initialTime: body.initialTime,
        endTime: body.endTime,
        capacity: body.capacity,
        airConditioner: body.airConditioner
      }, { new: true });

      res.send({
        data: {
          room: updatedRoom
        },
        status: {
          code: 200,
          message: "Room successfully updated",
          succeeded: true,
        }
      });
    } catch (error) {
      next(error);
    }

  },
  findOne: async (req, res, next) => {

    try {
      const { id } = req.params

      const theRoom = await Room.findById(id);

      if (!theRoom) {
        return res.status(404).send({
          data: {
            room: theRoom
          },
          status: {
            code: 404,
            message: "Room not found",
            succeeded: true,
          }
        });
      }

      res.send({
        data: {
          room: theRoom
        },
        status: {
          code: 200,
          message: "Successful request",
          succeeded: true,
        }
      });
    } catch (error) {
      next(error);
    }

  }

};