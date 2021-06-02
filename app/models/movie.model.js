module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movie", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      releaseDate: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW,
        allowNull: false 
      }
    });
  
    return Movie;
  };