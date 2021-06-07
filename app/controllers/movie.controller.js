const db = require("../models");
const Movie = db.movies;
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Movie
    const movie = {
      title: req.body.title,
      description: req.body.description,
    };
  
    // Save movie in the database
    Movie.create(movie)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Movie."
        });
      });
  };

// Create and Save new Comments
exports.createComment = (movieId, comment) => {
  return Comment.create({
    name: comment.name,
    text: comment.text,
    movieId: movieId,
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};

// Get the comments for a given tutorial
exports.findMovieById = (movieId) => {
  return Movie.findByPk(movieId, { include: ["comments"] })
    .then((movie) => {
      return movie;
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};

// Get the comments for a given comment id

exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["movie"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};

// Get all Tutorials include comments

exports.findAll = () => {
  return Movie.findAll({
    include: ["comments"],
  }).then((movies) => {
    return movies;
  });
};

// Retrieve all movies/ find by title from the database:

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Movie.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving movies."
        });
      });
  };

// Find a single movie with an id:

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Movie.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Movie with id=" + id
        });
      });
  };

// Update a Movie identified by the id in the request:

exports.update = (req, res) => {
    const id = req.params.id;
  
    Movie.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Movie was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Movie with id=${id}. Maybe Movie was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Movie with id=" + id
        });
      });
  };

// Delete a Movie with the specified id:

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Movie.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Movie was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Movie with id=" + id
        });
      });
  };

// Delete all Movies from the database:

exports.deleteAll = (req, res) => {
    Movie.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Movies were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Movies."
        });
      });
  };
