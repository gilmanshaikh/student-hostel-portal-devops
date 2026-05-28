import Application from '../models/Application.js';
import Hostel from '../models/Hostel.js';

export const createApplication = async (req, res) => {
  try {
    const { 
      hostelId,
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      college,
      course,
      year,
      currentAddress,
      permanentAddress,
      fatherName,
      fatherPhone,
      fatherOccupation,
      motherName,
      motherPhone,
      emergencyContact,
      preferredRoomType,
      moveInDate,
      duration,
      specialRequirements,
      hasAllergies,
      allergiesDetails,
      hasMedicalConditions,
      medicalConditionsDetails
    } = req.body;
    
    const existingApplication = await Application.findOne({
      studentId: req.user.id,
      hostelId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this hostel' });
    }

    const application = await Application.create({
      studentId: req.user.id,
      hostelId,
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      college,
      course,
      year,
      currentAddress,
      permanentAddress,
      fatherName,
      fatherPhone,
      fatherOccupation,
      motherName,
      motherPhone,
      emergencyContact,
      preferredRoomType,
      moveInDate,
      duration,
      specialRequirements,
      hasAllergies,
      allergiesDetails,
      hasMedicalConditions,
      medicalConditionsDetails
    });

    const populatedApp = await Application.findById(application._id)
      .populate('studentId', 'name email phone')
      .populate('hostelId', 'name address price');

    res.status(201).json(populatedApp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentApplications = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user.id })
      .populate('hostelId', 'name address price')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminApplications = async (req, res) => {
  try {
    const hostels = await Hostel.find({ adminId: req.user.id });
    const hostelIds = hostels.map(h => h._id);
    
    const applications = await Application.find({ hostelId: { $in: hostelIds } })
      .populate('studentId', 'name email phone')
      .populate('hostelId', 'name address')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('studentId', 'name email phone')
      .populate('hostelId', 'name address price');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is authorized (either the student or the hostel owner)
    const isStudent = req.user.id === application.studentId._id.toString();
    const hostel = await Hostel.findById(application.hostelId._id);
    const isOwner = hostel && hostel.adminId.toString() === req.user.id;

    if (!isStudent && !isOwner) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id)
      .populate('hostelId');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.hostelId.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    const updatedApp = await Application.findById(application._id)
      .populate('studentId', 'name email phone')
      .populate('hostelId', 'name address');

    res.json(updatedApp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('hostelId');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is authorized (either the student or the hostel owner)
    const isStudent = req.user.id === application.studentId.toString();
    const isOwner = application.hostelId.adminId.toString() === req.user.id;

    if (!isStudent && !isOwner) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
