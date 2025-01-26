const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplaintSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    enum: ['principal', 'vicePrincipal', 'hod', 'staff'],
    required: true,
  },
  department: {
    type: String,
    enum: ['cse', 'ece', 'mech', 'civil'],
    required: function() {
      return this.recipient === 'hod';  // Department is required if recipient is 'hod'
    },
  },
  staffName: {
    type: String,
    required: function() {
      return this.recipient === 'staff';  // Staff name is required if recipient is 'staff'
    },
  },
  type: {
    type: String,
    enum: ['financial', 'holiday', 'internet issue'],
    required: true,
  },
  messageType: {
    type: String,
    enum: ['Public', 'Private'],
    default: 'Public',  // Default value if none provided
  },
  status: {
    type: String,
    enum: ['Pending', 'Resolved', 'In Progress'],
    default: 'Pending',  // Default value if none provided
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Use Date for timestamp and default to current date and time
  },
  sr: {
    type: Number,
    unique: true,
  },
},{ timestamps: true });  // Automatic createdAt and updatedAt fields

const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = Complaint;
