const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const workingDaySchema = new Schema(
  {
    employees: [{ type: ObjectId, ref: 'User' }],
    day: { type: ObjectId, ref: 'WeekDay' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const WorkingDay = mongoose.model('WorkingDay', workingDaySchema);

module.exports = WorkingDay;
