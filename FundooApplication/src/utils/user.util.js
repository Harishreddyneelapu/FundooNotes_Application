import dotenv from 'dotenv';
dotenv.config();

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const createTransport = async () => {
  const oAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  try {
    const accessToken = await new Promise((resolve, reject) => {
      oAuth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token :(');
        }
        resolve(token);
      });
    });

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    });

    return transport;
  } catch (error) {
    console.error('Error creating transport:', error);
    throw error;
  }
};

const sendEmail = async (emailOptions) => {
  try {
    let emailTransporter = await createTransport();
    await emailTransporter.sendMail(emailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail;
