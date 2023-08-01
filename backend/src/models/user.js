const { default: mongoose } = require("mongoose");

mongoose.Schema({
  name: {
    type: String,
    maxLength: 40,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
