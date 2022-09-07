const {
  Teacher
} = require("../model");



module.exports = {
  create: async (req, res, next) => {

    try {

      let body = req.body;

      let {
        cedula,
        firstName,
        lastName,
        phoneNumber,
        address,
        dateOfBirth
      } = body;

      let newTeacher = new Teacher({
        cedula,
        firstName,
        lastName,
        phoneNumber,
        address,
        dateOfBirth
      });

      await newTeacher.save();

      res.send({
        data: {
          teacher: newTeacher
        },
        status: {
          code: 200,
          message: "Teacher successfully registered",
          succeeded: true
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
        searchBy = "firstName",
        order = "desc",
        orderBy = "createdAt"
      } = req.query;

      const theTeachers = await Teacher.paginate({
        [searchBy]: {
          $regex: `${search}`
        }
      }, {
        sort: {
          [orderBy]: order
        }
      });

      res.send({
        data: {
          teacher: theTeachers.docs,
          total: theTeachers.total,
        },
        status: {
          code: 200,
          message: "Successful request",
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
      const teacher = await Teacher.findById({
        _id: id
      });

      if (!teacher) {
        return res.status(404).json({
          data: {
            teacher: teacher
          },
          status: {
            code: 404,
            message: "Teacher not found",
            succeeded: false,
          }
        });
      }

      await Teacher.findByIdAndRemove(id);

      res.send({
        data: {
          teacher: teacher
        },
        status: {
          code: 200,
          message: "Teacher successfully removed",
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

      const teacher = await Teacher.findById({
        _id: id
      });

      if (!teacher) {
        return res.status(404).json({
          data: {
            teacher: teacher
          },
          status: {
            code: 404,
            message: "Teacher not found",
            succeeded: true,
          }
        });
      };

      const updatedTeacher = await Teacher.findOneAndUpdate({ _id: id }, {
        cedula: body.cedula,
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        address: body.address,
        dateOfBirth: body.dateOfBirth
      }, { new: true })


      res.send({
        data: {
          teacher: updatedTeacher
        },
        status: {
          code: 200,
          message: "Teacher successfully updated",
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

      const theTeacher = await Teacher.findById(id);

      if (!theTeacher) {
        return res.status(404).send({
          data: {
            teacher: theTeacher
          },
          status: {
            code: 404,
            message: "Teacher not found",
            succeeded: true,
          }
        });
      }

      res.send({
        data: {
          teacher: theTeacher
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