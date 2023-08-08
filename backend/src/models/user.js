const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
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

// save하기 전 함수 호출
userSchema.pre("save", async function (next) {
  let user = this;

  // 패스워드를 저장 할 때 hash된 패스워드로 저장하게 됨
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  let user = this;
  const match = await bcrypt.compare(plainPassword, user.password);
  // match 함수는 true 또는 false로 출력됨
  return match;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
