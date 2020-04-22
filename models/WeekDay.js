const mongoose = require('mongoose');

const { Schema } = mongoose;

const weekDaySchema = new Schema(
  {
    weekDayName: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const WeekDay = mongoose.model('WeekDay', weekDaySchema);

module.exports = WeekDay;
