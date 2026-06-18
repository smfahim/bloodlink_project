const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"BloodLink" <${process.env.EMAIL_USER}>`,
    to:   email,
    subject: "BloodLink — Your Login OTP Code",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 480px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: #cc0000; padding: 32px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
          .body { padding: 36px; }
          .greeting { font-size: 16px; color: #333; margin-bottom: 16px; }
          .otp-box { background: #f9f9f9; border: 2px dashed #cc0000; border-radius: 10px; padding: 24px; text-align: center; margin: 24px 0; }
          .otp-code { font-size: 42px; font-weight: bold; color: #cc0000; letter-spacing: 10px; }
          .otp-label { font-size: 13px; color: #888; margin-top: 8px; }
          .warning { background: #fff5f5; border-left: 4px solid #cc0000; padding: 12px 16px; border-radius: 4px; margin: 20px 0; font-size: 13px; color: #666; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #aaa; }
          .footer span { color: #cc0000; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Blood<span style="color:#ffaaaa">Link</span></h1>
            <p>Connecting donors. Saving lives.</p>
          </div>
          <div class="body">
            <p class="greeting">Hello <strong>${name}</strong>,</p>
            <p style="color:#555; font-size:15px;">
              You requested to login to your BloodLink account.
              Use the OTP code below to complete your login.
            </p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <div class="otp-label">This code expires in <strong>5 minutes</strong></div>
            </div>
            <div class="warning">
              ⚠️ Never share this code with anyone. BloodLink will never ask for your OTP.
            </div>
            <p style="color:#888; font-size:13px;">
              If you didn't request this, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            &copy; 2026 <span>BloodLink</span>. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };