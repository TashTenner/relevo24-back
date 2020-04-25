const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const workingDaySchema = new Schema(
  {
    dayName: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], unique: true },
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
