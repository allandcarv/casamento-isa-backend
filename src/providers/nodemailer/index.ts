import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendmail = async (email: string): Promise<any> => {
  const host = process.env.MAIL_SMTP || '';
  const port = Number(process.env.MAIL_PORT) || 0;
  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: 'Casamento Isa e Leo <casamentoisaeleo@pepisandbox.com>',
    to: email,
    subject: 'Obrigado pela confirmação',
    text: 'Obrigado por nos dizer se irá ou não ao nosso casamento.',
  });

  return info;
};

export default sendmail;
