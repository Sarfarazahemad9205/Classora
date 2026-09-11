import { Stats } from "../models/stats.js";
import Trycatch from "../middlewares/tryCatch.js";

export const recordVisit = Trycatch(async (req, res) => {
  let stats = await Stats.findOne();

  if (!stats) {
    stats = await Stats.create({
      visits: 1,
    });
  } else {
    stats.visits += 1;
    await stats.save();
  }

  res.status(200).json({
    message: "Visit recorded",
  });
});

export const getVisits = Trycatch(async (req, res) => {
  let stats = await Stats.findOne();

  if (!stats) {
    stats = await Stats.create({
      visits: 0,
    });
  }

  res.status(200).json({
    visits: stats.visits,
  });
});