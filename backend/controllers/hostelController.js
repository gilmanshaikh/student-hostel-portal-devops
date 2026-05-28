import Hostel from '../models/Hostel.js';
import cloudinary from '../config/cloudinary.js';

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'hostels' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

export const createHostel = async (req, res) => {
  try {
    const { name, address, description, price, capacity, amenities } = req.body;
    
    let images = [];
    
    // Upload images to Cloudinary if provided
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        images.push({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    }
    
    const hostel = await Hostel.create({
      name,
      address,
      description,
      price,
      capacity,
      amenities: amenities ? JSON.parse(amenities) : [],
      images,
      adminId: req.user.id
    });

    res.status(201).json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().populate('adminId', 'name email');
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id).populate('adminId', 'name email phone');
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find({ adminId: req.user.id });
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHostel = async (req, res) => {
  try {
    const { name, address, description, price, capacity, amenities } = req.body;
    
    const hostel = await Hostel.findById(req.params.id);
    
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    
    if (hostel.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    let images = hostel.images;
    
    // Upload new images if provided
    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        newImages.push({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
      images = [...images, ...newImages];
    }
    
    hostel.name = name || hostel.name;
    hostel.address = address || hostel.address;
    hostel.description = description || hostel.description;
    hostel.price = price || hostel.price;
    hostel.capacity = capacity || hostel.capacity;
    hostel.amenities = amenities ? JSON.parse(amenities) : hostel.amenities;
    hostel.images = images;
    
    await hostel.save();
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    
    if (hostel.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Delete images from Cloudinary
    for (const image of hostel.images) {
      if (image.publicId) {
        await cloudinary.uploader.destroy(image.publicId);
      }
    }
    
    await Hostel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hostel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHostelImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    const hostel = await Hostel.findById(req.params.id);
    
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    
    if (hostel.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);
    
    // Remove from database
    hostel.images = hostel.images.filter(img => img.publicId !== publicId);
    await hostel.save();
    
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
