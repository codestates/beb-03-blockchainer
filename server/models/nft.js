const Sequelize = require("sequelize");

module.exports = class Nft extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        ipfs: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.INTEGER,
        },

        name: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Nft",
        tableName: "nfts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Nft.belongsTo(db.User, {
      foreignKey: "owner",
      targetKey: "username",
    });
  }
};
