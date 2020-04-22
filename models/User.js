const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    // email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    // hashedPassword: { type: String, required: true },
    name: { type: String },
    familyName: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    shifts: [{
      day: { type: ObjectId, ref: 'WeekDay' },
      periods: [{
        start: { type: Date },
        end: { type: Date },
      }],
    }],
    // avatar: { type: String, default: '', required: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

// userSchema.virtual('fullName').get(() => {
//   return this.name + ' ' + this.familyName;
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
