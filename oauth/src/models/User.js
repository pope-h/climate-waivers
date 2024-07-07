const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbconnect");


const User = sequelize.define(
  "User",
  {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	  },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
    last_name: {
      type: DataTypes.STRING,
	  allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
	  defaultValue: false
    },
    username: {
      type: DataTypes.STRING,
	  allowNull: false,
	  unique: true
    },
	is_facebook_user: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	is_linkedin_user: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	is_google_user: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	is_github_user: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
    password: {
      type: DataTypes.STRING,
    },
	profilePic: {
		type: DataTypes.STRING
	},
	bio: {
		type: DataTypes.STRING
	},
	cover: {
		type: DataTypes.STRING
	},
	phoneNumber: {
		type: DataTypes.STRING
	},
	lastLocation: {
		type: DataTypes.STRING
	}
  },
  { tableName: 'user', timestamps: true, underscored: true }
);

sequelize.sync({ alter: true})
  .then(() => {
    console.log('Database & tables synced!');
  });

module.exports = User;
