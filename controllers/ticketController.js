// controllers/ticketController.js
const Ticket = require('../models/ticketModel');

const createTicket = async (req, res) => {
  try {
    const { customerID, subject, description } = req.body;

    const newTicket = await Ticket.create({
      customerID,
      subject,
      description,
    });

    return res.status(201).json({ success: true, ticket: newTicket });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error creating ticket' });
  }
};

const assignTicket = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const { assignee } = req.body;

    const ticket = await Ticket.findByPk(ticketID);

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }

    ticket.assignee = assignee;
    await ticket.save();

    return res.status(200).json({ success: true, message: 'Ticket assigned successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error assigning ticket' });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findByPk(ticketID);

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }

    ticket.status = status;
    await ticket.save();

    return res.status(200).json({ success: true, message: 'Ticket status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Error updating ticket status' });
  }
};

module.exports = { createTicket, assignTicket, updateTicketStatus };
