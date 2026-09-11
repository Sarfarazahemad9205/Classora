import { Subject } from "../models/subject.js";
import Trycatch from "../middlewares/tryCatch.js";

export const createSubject = Trycatch(async (req, res) => {
  const { name, description } = req.body;

  const existingSubject = await Subject.findOne({ name });

  if (existingSubject) {
    return res.status(400).json({
      message: "Subject already exists",
    });
  }

  const subject = await Subject.create({
    name,
    description,
  });

  res.status(201).json({
    message: "Subject created successfully",
    subject,
  });
});

export const getAllSubjects = Trycatch(async (req, res) => {
  const subjects = await Subject.find();

  res.status(200).json({
    subjects,
  });
});

export const getSubjectById = Trycatch(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    return res.status(404).json({
      message: "Subject not found",
    });
  }

  res.status(200).json({
    subject,
  });
});

export const updateSubject = Trycatch(async (req, res) => {
  const { name, description } = req.body;

  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!subject) {
    return res.status(404).json({
      message: "Subject not found",
    });
  }

  res.status(200).json({
    message: "Subject updated successfully",
    subject,
  });
});

export const deleteSubject = Trycatch(async (req, res) => {
  const subject = await Subject.findByIdAndDelete(req.params.id);

  if (!subject) {
    return res.status(404).json({
      message: "Subject not found",
    });
  }

  res.status(200).json({
    message: "Subject deleted successfully",
  });
});