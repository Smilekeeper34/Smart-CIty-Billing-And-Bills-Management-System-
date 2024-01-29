const Feedback = require('../models/FeedbackModel');

const submitFeedback = async (req, res) => {
  try {
    const { customerID, content } = req.body;

    const newFeedback = await Feedback.create({
      customerID,
      content,
    });

    return res.status(201).json({ success: true, feedback: newFeedback });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error submitting feedback' });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const allFeedback = await Feedback.findAll();

    return res.status(200).json({ success: true, feedback: allFeedback });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error getting feedback' });
  }
};

module.exports = { submitFeedback, getAllFeedback };
