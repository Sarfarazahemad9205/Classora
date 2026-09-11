 import { Chapter } from "../models/chapter.js";
import { Subject } from "../models/subject.js";
import Trycatch from "../middlewares/tryCatch.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

export const createChapter = Trycatch(async (req, res) => {
  const { name, description, subject } = req.body;

  const existingSubject = await Subject.findById(subject);

  if (!existingSubject) {
    return res.status(404).json({
      message: "Subject not found",
    });
  }

  const existingChapter = await Chapter.findOne({
    name,
    subject,
  });

  if (existingChapter) {
    return res.status(400).json({
      message: "Chapter already exists in this subject",
    });
  }

  const chapter = await Chapter.create({
    name,
    description,
    subject,
  });

  res.status(201).json({
    message: "Chapter created successfully",
    chapter,
  });
});

export const getChapters = Trycatch(async (req, res) => {
  const chapters = await Chapter.find().populate("subject");

  res.status(200).json({
    chapters,
  });
});

export const getChapterById = Trycatch(async (req, res) => {
  const { id } = req.params;

  const chapter = await Chapter.findById(id).populate("subject");

  if (!chapter) {
    return res.status(404).json({
      message: "Chapter not found",
    });
  }

  res.status(200).json({
    chapter,
  });
});

export const updateChapter = Trycatch(async (req, res) => {
  const { id } = req.params;
  const { name, description, subject } = req.body;

  const chapter = await Chapter.findById(id);

  if (!chapter) {
    return res.status(404).json({
      message: "Chapter not found",
    });
  }

  if (subject) {
    const existingSubject = await Subject.findById(subject);

    if (!existingSubject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }
  }

  const existingChapter = await Chapter.findOne({
    name: name || chapter.name,
    subject: subject || chapter.subject,
    _id: { $ne: id },
  });

  if (existingChapter) {
    return res.status(400).json({
      message: "Chapter already exists in this subject",
    });
  }

  chapter.name = name || chapter.name;
  chapter.description = description || chapter.description;
  chapter.subject = subject || chapter.subject;

  await chapter.save();

  res.status(200).json({
    message: "Chapter updated successfully",
    chapter,
  });
});

export const deleteChapter = Trycatch(async (req, res) => {
  const { id } = req.params;

  const chapter = await Chapter.findByIdAndDelete(id);

  if (!chapter) {
    return res.status(404).json({
      message: "Chapter not found",
    });
  }

  res.status(200).json({
    message: "Chapter deleted successfully",
  });
});