const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: ['user', 'employee', 'admin'], default: 'user' },
    // avatar: { type: String, default: '', required: false },
    firstName: { type: String },
    familyName: { type: String },
    shifts: [{ type: ObjectId, ref: 'Shift' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

// userSchema.virtual('fullName').get(() => {
//   return this.firstName + ' ' + this.familyName;
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
