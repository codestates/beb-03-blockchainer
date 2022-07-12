const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: Sequelize.STRING,
          primaryKey: true, // 추가
          defaultValue: "", // 추가
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        privatekey: {
          type: Sequelize.STRING,
        },
        balance: {
          type: Sequelize.FLOAT,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, {
      foreignKey: "writer",
      sourceKey: "username",
    });
    db.User.hasMany(db.Comment, {
      foreignKey: "writer",
      sourceKey: "username",
    });
    db.User.hasMany(db.Nft, {
      foreignKey: "owner",
      sourceKey: "username",
    });
  }
};
