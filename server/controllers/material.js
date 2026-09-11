import { Material } from "../models/material.js";
import { Chapter } from "../models/chapter.js";
import Trycatch from "../middlewares/tryCatch.js";
import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

// Upload PDF to Cloudinary
const uploadPdfToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const publicId = `classora/pdfs/${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`;

    console.log("Starting Cloudinary PDF upload...");
    console.log("Original file:", originalName);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        format: "pdf",
        public_id: publicId,
      },
      (error, result) => {
        if (error) {
          console.error("========== CLOUDINARY ERROR ==========");
          console.error("Message:", error.message);
          console.error("HTTP Code:", error.http_code);
          console.error("Name:", error.name);
          console.error("Full Error:", error);
          console.error("======================================");

          reject(error);
        } else {
          console.log("========== CLOUDINARY SUCCESS ==========");
          console.log("URL:", result.secure_url);
          console.log("Public ID:", result.public_id);
          console.log("========================================");

          resolve(result);
        }
      }
    );

    Readable.from([fileBuffer]).pipe(uploadStream);
  });
};

// Delete PDF from Cloudinary
const deletePdfFromCloudinary = async (publicId) => {
  if (!publicId) {
    return;
  }

  console.log("Deleting PDF from Cloudinary:", publicId);

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};

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

    console.log("PDF received by backend.");
    console.log("File name:", req.file.originalname);
    console.log("File size:", req.file.size);
    console.log("File type:", req.file.mimetype);

    const result = await uploadPdfToCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    const material = await Material.create({
      title,
      type,
      description,
      fileUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
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

    // Delete old PDF from Cloudinary
    if (material.cloudinaryPublicId) {
      await deletePdfFromCloudinary(material.cloudinaryPublicId);
    }

    material.type = "notes";
    material.content = content;
    material.fileUrl = undefined;
    material.cloudinaryPublicId = undefined;
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
      // Delete old PDF from Cloudinary
      if (material.cloudinaryPublicId) {
        await deletePdfFromCloudinary(material.cloudinaryPublicId);
      }

      // Upload new PDF
      const result = await uploadPdfToCloudinary(
        req.file.buffer,
        req.file.originalname
      );

      material.fileUrl = result.secure_url;
      material.cloudinaryPublicId = result.public_id;
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

    // Delete old PDF from Cloudinary
    if (material.cloudinaryPublicId) {
      await deletePdfFromCloudinary(material.cloudinaryPublicId);
    }

    material.type = "video";
    material.videoUrl = videoUrl;
    material.fileUrl = undefined;
    material.cloudinaryPublicId = undefined;
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

  // Delete PDF from Cloudinary
  if (material.cloudinaryPublicId) {
    await deletePdfFromCloudinary(material.cloudinaryPublicId);
  }

  await Material.findByIdAndDelete(id);

  res.status(200).json({
    message: "Material deleted successfully",
  });
});