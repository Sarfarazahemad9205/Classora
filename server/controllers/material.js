
import { Material } from "../models/material.js";
import { Chapter } from "../models/chapter.js";
import Trycatch from "../middlewares/tryCatch.js";
import { unlink } from "fs/promises";


// CREATE MATERIAL
export const createMaterial = Trycatch(async (req, res) => {
  const {
    title,
    type,
    description,
    content,
    videoUrl,
    chapter,
  } = req.body;

  // Check common required fields
  if (!title || !type || !description || !chapter) {
    return res.status(400).json({
      message: "Title, type, description and chapter are required",
    });
  }

  // Check chapter
  const existingChapter = await Chapter.findById(chapter);

  if (!existingChapter) {
    return res.status(404).json({
      message: "Chapter not found",
    });
  }


  // NOTES
  if (type === "notes") {
    if (!content) {
      return res.status(400).json({
        message: "Content is required for notes",
      });
    }

    const material = await Material.create({
      title,
      type,
      description,
      content,
      chapter,
    });

    return res.status(201).json({
      message: "Notes created successfully",
      material,
    });
  }


  // PDF
  if (type === "pdf") {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const material = await Material.create({
      title,
      type,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
      chapter,
    });

    return res.status(201).json({
      message: "PDF uploaded successfully",
      material,
    });
  }


  // VIDEO
  if (type === "video") {
    if (!videoUrl) {
      return res.status(400).json({
        message: "YouTube URL is required",
      });
    }

    // Check YouTube URL
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    if (!youtubeRegex.test(videoUrl)) {
      return res.status(400).json({
        message: "Please provide a valid YouTube URL",
      });
    }

    const material = await Material.create({
      title,
      type,
      description,
      videoUrl,
      chapter,
    });

    return res.status(201).json({
      message: "Video added successfully",
      material,
    });
  }


  // Invalid type
  return res.status(400).json({
    message: "Invalid material type",
  });
});


// GET ALL MATERIALS
export const getMaterials = Trycatch(async (req, res) => {
  const materials = await Material.find().populate("chapter");

  res.status(200).json({
    materials,
  });
});


// GET MATERIAL BY ID
export const getMaterialById = Trycatch(async (req, res) => {
  const { id } = req.params;

  const material = await Material.findById(id).populate("chapter");

  if (!material) {
    return res.status(404).json({
      message: "Material not found",
    });
  }

  res.status(200).json({
    material,
  });
});


// UPDATE MATERIAL
export const updateMaterial = Trycatch(async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    type,
    content,
    videoUrl,
    chapter,
  } = req.body;

  const material = await Material.findById(id);

  if (!material) {
    return res.status(404).json({
      message: "Material not found",
    });
  }


  // Check chapter if provided
  if (chapter) {
    const existingChapter = await Chapter.findById(chapter);

    if (!existingChapter) {
      return res.status(404).json({
        message: "Chapter not found",
      });
    }

    material.chapter = chapter;
  }


  // UPDATE NOTES
  if (type === "notes") {
    if (!content) {
      return res.status(400).json({
        message: "Content is required for notes",
      });
    }

    // If old material was PDF, delete old PDF
    if (material.fileUrl) {
      const oldFilePath = material.fileUrl.replace(
        "/uploads/",
        "uploads/"
      );

      await unlink(oldFilePath).catch(() => {});
    }

    material.type = "notes";
    material.content = content;
    material.fileUrl = undefined;
    material.videoUrl = undefined;
  }


  // UPDATE PDF
  if (type === "pdf") {
    if (!req.file && !material.fileUrl) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    if (req.file) {
      // Delete old PDF
      if (material.fileUrl) {
        const oldFilePath = material.fileUrl.replace(
          "/uploads/",
          "uploads/"
        );

        await unlink(oldFilePath).catch(() => {});
      }

      material.fileUrl = `/uploads/${req.file.filename}`;
    }

    material.type = "pdf";
    material.content = undefined;
    material.videoUrl = undefined;
  }


  // UPDATE VIDEO
  if (type === "video") {
    if (!videoUrl) {
      return res.status(400).json({
        message: "YouTube URL is required",
      });
    }

    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    if (!youtubeRegex.test(videoUrl)) {
      return res.status(400).json({
        message: "Please provide a valid YouTube URL",
      });
    }

    // Delete old PDF if changing from PDF to video
    if (material.fileUrl) {
      const oldFilePath = material.fileUrl.replace(
        "/uploads/",
        "uploads/"
      );

      await unlink(oldFilePath).catch(() => {});
    }

    material.type = "video";
    material.videoUrl = videoUrl;
    material.fileUrl = undefined;
    material.content = undefined;
  }


  // Update common fields
  material.title = title || material.title;
  material.description = description || material.description;

  await material.save();

  res.status(200).json({
    message: "Material updated successfully",
    material,
  });
});


// DELETE MATERIAL
export const deleteMaterial = Trycatch(async (req, res) => {
  const { id } = req.params;

  const material = await Material.findById(id);

  if (!material) {
    return res.status(404).json({
      message: "Material not found",
    });
  }

  // Delete PDF file from server
  // Only PDFs have fileUrl
  if (material.fileUrl) {
    const filePath = material.fileUrl.replace(
      "/uploads/",
      "uploads/"
    );

    await unlink(filePath).catch(() => {});
  }

  await Material.findByIdAndDelete(id);

  res.status(200).json({
    message: "Material deleted successfully",
  });
});

