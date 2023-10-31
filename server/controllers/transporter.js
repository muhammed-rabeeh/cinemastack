import { createTransport } from 'nodemailer';
import { google } from 'googleapis';

const createTransporter = async () => {
  const OAuth2 = google.auth.OAuth2;
  const OAuth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developer.google.com/oauthplayground'
  );

  OAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    OAuth2Client.getAccessToken((error, token) => {
      if (error) {
        reject('Failed to create Access Token');
      }
      resolve(token);
    })
  });

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GOOGLE_GMAIL,
      accessToken,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

  return transporter;
}


const sendMail = async (email, token) => {


  const transporter = await createTransporter();

  const mailOptions = {
    from: 'cinemastack',
    to: email,
    subject: 'Verify your email account',
    html: `Press <a href='http://localhost:4500/api/user/verify?email=${email}&token=${token}'>this link</a> to verify your email.`
  }

  await transporter.sendMail(mailOptions);
}

export default sendMail;