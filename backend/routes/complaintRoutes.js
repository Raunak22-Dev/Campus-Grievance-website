const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Complaint = require("../models/Complaint");
const Counter =require("../models/Counter")
const { body, validationResult } = require("express-validator");

// Route 1: Submit Complaint - POST /api/complaints/submit
router.post(
  "/submit",
  fetchuser,
  [
    // Validation checks for incoming data
    body("message", "Message is required").trim().not().isEmpty(),
    body("recipient", "Recipient is required").trim().not().isEmpty(),
    body("type", "Complaint type must be selected").trim().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Extract complaint data from the request body
      const { message, recipient, department, staffName, type, messageType } = req.body;
      
      // Get the current value of the `sr` from the Counter collection and increment it
      const counter = await Counter.findOneAndUpdate(
        { name: "complaintCounter" }, // Find the counter document
        { $inc: { sequence_value: 1 } }, // Increment the `sr` by 1
        { new: true, upsert: true } // Create a new counter if not exists
      );
      
      // Create and save the complaint
      const newComplaint = new Complaint({
        message,
        recipient,
        department: recipient === "hod" ? department : null,
        staffName: recipient === "staff" ? staffName : null,
        type,
        messageType,
        sr: counter.sequence_value,
        // Include serial if needed
        user: req.user.id,
      });
      
      const savedComplaint = await newComplaint.save();
      console.log("Received data:", req.body)
      res.status(201).json({
        success: true,
        message: "Complaint submitted successfully!",
        complaint: savedComplaint,
      });
    } catch (error) {
      console.error("Server Error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
