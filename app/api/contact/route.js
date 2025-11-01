// app/api/contact/route.js

import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    // === 1️⃣ Create a transporter ===
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can replace with "smtp.mailtrap.io", "hotmail", etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // === 2️⃣ Define mail options ===
    const mailOptions = {
      from: `"GreenFarm Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `🌿 New Contact Message: ${subject}`,
      html: `
        <h2>New Message from GreenFarm Contact Form</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <small>Sent via GreenFarm website</small>
      `,
    };

    // === 3️⃣ Send the email ===
    await transporter.sendMail(mailOptions);

    // === 4️⃣ Return success response ===
    return Response.json({
      success: true,
      message: "✅ Message sent successfully! We’ll get back to you soon.",
    });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return Response.json(
      { error: "Something went wrong while sending the message." },
      { status: 500 }
    );
  }
}
