import nodemailer from "nodemailer";

import env from "@appConfig";
import { IUser } from "@appTypes/user";

export default {
  async sendMail(user: IUser, code: string) {
    const auth = {
      user: env.email,
      pass: env.password
    };
    const mailOptions = {
      from: auth.user,
      to: user.email,
      subject: `${user.name} - Bisleksi Şifre Yenileme Talebi`,
      html: `<html>
<head>
</head>

<body style="font-family: Arial; font-size: 12px;">
<div>
    <p>
       Şifreni değiştirmek için talepte bulundun. İşte şifre değiştirme kodun burada: <b>${code}</b>
    </p>
    <p>
        Eğer şifre değiştirme talebinde bulunmadıysanız lütfen bu e-postayı dikkate almayınız.
    </p>

</div>
</body>
</html>`
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.com",
      port: 465,
      auth
    });
    return transporter.sendMail(mailOptions);
  }
};
