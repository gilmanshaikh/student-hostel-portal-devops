import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Admin from '../models/Admin.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const studentRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = await Student.create({ name, email, password, phone });
    const token = generateToken(student._id, student.role);

    res.status(201).json({
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const student = await Student.findOne({ email });
    if (!student || !(await student.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(student._id, student.role);

    res.json({
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({ name, email, password });
    const token = generateToken(admin._id, admin.role);

    res.status(201).json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id, admin.role);

    res.json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Student Profile
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student Profile
export const updateStudentProfile = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password update through this route
    delete updates.email; // Don't allow email update
    
    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Admin Profile
export const updateAdminProfile = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password update through this route
    delete updates.email; // Don't allow email update
    
    const admin = await Admin.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
