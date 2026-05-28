import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  // Extended application fields
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  college: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  currentAddress: {
    type: String,
    required: true
  },
  permanentAddress: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  fatherPhone: {
    type: String,
    required: true
  },
  fatherOccupation: {
    type: String,
    required: true
  },
  motherName: {
    type: String,
    required: true
  },
  motherPhone: {
    type: String,
    required: true
  },
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    relation: {
      type: String,
      required: true
    }
  },
  preferredRoomType: {
    type: String,
    required: true,
    enum: ['Single', 'Double', 'Triple', 'Dormitory']
  },
  moveInDate: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  specialRequirements: {
    type: String,
    default: ''
  },
  hasAllergies: {
    type: Boolean,
    default: false
  },
  allergiesDetails: {
    type: String,
    default: ''
  },
  hasMedicalConditions: {
    type: Boolean,
    default: false
  },
  medicalConditionsDetails: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
