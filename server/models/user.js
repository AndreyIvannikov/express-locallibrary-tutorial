/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next()
})

UserSchema.methods.copmarePassword = function (candidatePassword,cb) {
  bcrypt.compare(candidatePassword,this.password,(err,isMatch) => {
    console.log(candidatePassword)
    if(err){
      return cb(err)
    }
    cb(null, isMatch)
  })
}
module.exports = mongoose.model("User", UserSchema);
