const nodemailer = require('nodemailer');
    const Email = require('email-templates');

    const transporter = nodemailer.createTransport({
      service: "gmail",
        auth: {
          user: "mail.showgist@gmail.com",
          pass: process.env.SHOWGIST_EMAIL_PSW,
        },
        tls: { rejectUnauthorized: !1 },
    });

    const email = new Email({
      transport: transporter,
      send: true,
      preview: false,
    });

    email.send({
      template: 'subscribed',
      message: {
        from: 'ShowGist <mail.showgist@gmail.com>',
        to: `${e.body.email}`,
      }
    }).then(() => console.log('email has been sent!'));