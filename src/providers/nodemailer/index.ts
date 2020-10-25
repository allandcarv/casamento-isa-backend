import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendmail = async (name: string, email: string): Promise<any> => {
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
    html: `
      <style>
      div {
        width: 300px;
        padding: 30px;
        margin: 30px auto;
        border: 1px solid #5c0527;
        border-radius: 10px;;
        color: #5c0527;
      }
    </style>

    <body>
      <div>
        <p>Olá <strong>${name}</strong></p>
        <p>Estamos muitos felizes pela sua confirmação.</p>
        <p>Isto nos ajudará a fazer um dia cada vez mais especial.</p>
        <br>
        <p>Isabelle e Leonardo</p>
        <p>23 de janeiro de 2021</p>
      </div>
    </body>

    `,
  });

  const toNewlyweds = await transporter.sendMail({
    from: 'Casamento Isa e Leo <casamentoisaeleo@pepisandbox.com>',
    to: 'isabellerif@live.com, leoulisses83@gmail.com',
    subject: 'Notificaçao de Confirmação',
    html: `
      <style>
      div {
        width: 300px;
        padding: 30px;
        margin: 30px auto;
        border: 1px solid #5c0527;
        border-radius: 10px;;
        color: #5c0527;
      }
    </style>

    <body>
      <div>
        <p>Olá</p>
        <p>${name} preencheu formulário de confirmação</p>
        <p>As informações estão na planilha de confirmação</p>
        <br>
        <p>Isabelle e Leonardo</p>
        <p>23 de janeiro de 2021</p>
      </div>
    </body>

    `,
  });

  return { info, toNewlyweds };
};

export default sendmail;
