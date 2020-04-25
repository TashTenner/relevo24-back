const express = require('express');
// const createError = require('http-errors');

const router = express.Router();
const WorkingDay = require('../models/WorkingDay');
// const { checkIfLoggedIn, checkUsernameNotEmpty } = require("../middlewares");

router.get('/', async (req, res, next) => {
  try {
    const workingDays = await WorkingDay.find();
    res.json(workingDays);
  } catch (error) {
    next(error);
  }
});

router.get('/:workingDayId', async (req, res, next) => {
  const { workingDayId } = req.params;
  try {
    const workingDay = await WorkingDay.findById(workingDayId);
    if (workingDay) {
      res.json(workingDay);
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

router.post('/add', async (req, res, next) => {
  const {
    day,
  } = req.body;
  try {
    const workingDay = await WorkingDay.create({
      day,
    });
    res.json(workingDay);
  } catch (error) {
    next(error);
  }
});

router.put('/:workingDayId/update', async (req, res, next) => {
  const { workingDayId } = req.params;
  const {
    day,
  } = req.body;
  try {
    const workingDay = await WorkingDay.findByIdAndUpdate(workingDayId, { new: true }, {
      day,
    });
    res.json(workingDay);
  } catch (error) {
    next(error);
  }
});

router.delete('/:workingDayId/delete', async (req, res, next) => {
  const { workingDayId } = req.params;
  try {
    const workingDay = await WorkingDay.findByIdAndDelete(workingDayId);
    res.json(workingDay);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
