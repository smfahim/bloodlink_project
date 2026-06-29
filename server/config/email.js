const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp, name) => {
  await resend.emails.send({
    from:    "BloodLink <onboarding@resend.dev>",
    to:      email,
    subject: "BloodLink — Your Registration OTP Code",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 480px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: #cc0000; padding: 32px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
          .body { padding: 36px; }
          .otp-box { background: #f9f9f9; border: 2px dashed #cc0000; border-radius: 10px; padding: 24px; text-align: center; margin: 24px 0; }
          .otp-code { font-size: 42px; font-weight: bold; color: #cc0000; letter-spacing: 10px; }
          .otp-label { font-size: 13px; color: #888; margin-top: 8px; }
          .warning { background: #fff5f5; border-left: 4px solid #cc0000; padding: 12px 16px; border-radius: 4px; margin: 20px 0; font-size: 13px; color: #666; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #aaa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>BloodLink</h1>
            <p>Connecting donors. Saving lives.</p>
          </div>
          <div class="body">
            <p style="color:#333; font-size:16px;">
              Hello <strong>${name}</strong>,
            </p>
            <p style="color:#555; font-size:15px;">
              Use the OTP below to complete your BloodLink registration.
            </p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <div class="otp-label">
                Expires in <strong>5 minutes</strong>
              </div>
            </div>
            <div class="warning">
              ⚠️ Never share this code with anyone.
            </div>
            <p style="color:#888; font-size:13px;">
              If you didn't request this, ignore this email.
            </p>
          </div>
          <div class="footer">
            &copy; 2026 BloodLink. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

module.exports = { sendOTPEmail };