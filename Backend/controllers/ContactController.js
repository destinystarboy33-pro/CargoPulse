import Contact from "../models/ContactModel.js";
import nodemailer from "nodemailer";

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Submit contact message
export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject and message are required",
      });
    }

    // Save message to MongoDB
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New CargoPulse Contact Message: ${subject}`,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">

            <h2 style="color: #f97316;">
              New Contact Message
            </h2>

            <p>
              Someone has submitted a new message through the CargoPulse
              website.
            </p>

            <hr />

            <h3>Customer Information</h3>

            <p>
              <strong>Name:</strong> ${name}
            </p>

            <p>
              <strong>Email:</strong> ${email}
            </p>

            <p>
              <strong>Phone:</strong> ${phone || "Not provided"}
            </p>

            <p>
              <strong>Subject:</strong> ${subject}
            </p>

            <h3>Message</h3>

            <p style="line-height: 1.6;">
              ${message}
            </p>

            <hr />

            <p style="color: #666;">
              This message was sent from the CargoPulse contact form.
            </p>

          </div>
        `,
      });
    } catch (emailError) {
      console.error(
        "Email notification failed:",
        emailError.message
      );
    }

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Create contact error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
};