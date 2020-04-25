const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const workingDaySchema = new Schema(
  {
    dayName: {
      type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true, unique: true
    },
    dayNumber: {
      type: Number, enum: [1, 2, 3, 4, 5, 6, 7], required: true, unique: true
    },
    employeesTeam: [{ type: ObjectId, ref: 'User' }],
    shifts: [{ type: ObjectId, ref: 'Shift' }],
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
