const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4, // Force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ SMTP Connection Test
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:");
    console.error(error);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

const sendOTPEmail = async (email, otp, name) => {
  try {
    const mailOptions = {
      from: `"BloodLink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "BloodLink - Your Registration OTP Code",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body{
            font-family:Arial,sans-serif;
            background:#f4f4f4;
            margin:0;
            padding:0;
          }
          .container{
            max-width:500px;
            margin:40px auto;
            background:#fff;
            border-radius:12px;
            overflow:hidden;
            box-shadow:0 4px 15px rgba(0,0,0,.15);
          }
          .header{
            background:#c40000;
            color:#fff;
            text-align:center;
            padding:30px;
          }
          .body{
            padding:30px;
          }
          .otp{
            text-align:center;
            font-size:38px;
            font-weight:bold;
            color:#c40000;
            letter-spacing:8px;
            margin:25px 0;
          }
          .footer{
            background:#fafafa;
            padding:15px;
            text-align:center;
            color:#888;
            font-size:12px;
          }
        </style>
      </head>
      <body>
        <div class="container">

          <div class="header">
            <h2>BloodLink</h2>
            <p>Connecting Donors. Saving Lives.</p>
          </div>

          <div class="body">

            <h3>Hello ${name},</h3>

            <p>
              Thank you for registering with <b>BloodLink</b>.
            </p>

            <p>Your verification OTP is:</p>

            <div class="otp">${otp}</div>

            <p>
              This OTP will expire in <b>5 minutes</b>.
            </p>

            <p style="color:red;">
              Never share this OTP with anyone.
            </p>

          </div>

          <div class="footer">
            © 2026 BloodLink. All Rights Reserved.
          </div>

        </div>
      </body>
      </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent Successfully");
    console.log("Message ID:", info.messageId);

    return true;
  } catch (error) {
    console.error("❌ Email Send Error:");
    console.error(error);
    throw error;
  }
};

module.exports = { sendOTPEmail };