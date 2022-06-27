const db = require("./models/Flight");
const Flight = db.flight;

exports.example = (req, res) => {
    console.log("examplenode")
    res.send("Flight example")
}

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Flight
    const flight = new Flight({
    title: req.body.title,
    time: req.body.time,
    price: req.body.price,
    date: req.body.date
    });
    // Save Flight in the database
    flight
      .save(flight)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Flight."
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Flight.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Flights."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Flight.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Flight with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Flight with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Flight.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Flight with id=${id}. Maybe Flight was not found!`
          });
        } else res.send({ message: "Flight was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Flight with id=" + id
      });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Flight.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Flight with id=${id}. Maybe Flight was not found!`
          });
        } else {
          res.send({
            message: "Flight was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Flight with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Flight.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Flights were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Flights."
        });
      });
  };
