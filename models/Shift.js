const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const shiftSchema = new Schema(
  {
    timeStart: String,
    timeEnd: String,
    day: { type: ObjectId, ref: 'WorkingDay' },
    employee: { type: ObjectId, ref: 'User' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;
