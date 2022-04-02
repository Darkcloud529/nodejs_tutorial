const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN, // true, false
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE, // DATETIME, MYSQL DATE -> Sequelize DateOnly
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        // 만약 timestamps가 true일 경우?
        // createdAt, updatedAt를 자동으로 만들어준다.
      }, {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        modelName: 'User', //javascript에서 쓰는 이름
        tableName: 'users',// mysql에서 쓰는 이름
        charset: 'utf8',
        collate: 'utf8_general_ci',
      });
    }
  
    static associate(db) {
        db.User.hasMany(db.Comment, {foreginKey: 'commenter', sourceKey: 'id'});
    }
  };