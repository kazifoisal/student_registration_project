import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 

const { genSalt, hash, compare } = bcrypt;

const StudentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profilePic: String
});

// Password hashing
StudentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Method to compare passwords
StudentSchema.methods.comparePassword = async function(password) {
  return await compare(password, this.password);
};

const Student = mongoose.model('Student', StudentSchema);
export default Student;

    