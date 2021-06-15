const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

exports.sendMessage = [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("message").trim().isLength({ min: 1 }).escape(),
  body("gender").trim().isLength({ min: 1 }).escape(),
  body("name").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    console.log(req.body);
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(404).json({ title: "Данные не отправлены" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "dronxxx1993@yandex.ru", // generated ethereal user
        pass: "hsrjdcfif24315", // generated ethereal password
      },
    });

    try {
      const output = `
             <p>You have a new message from MEVN-course:</p>
            <ul>
               <li>name: ${req.body.name}</li>
               <li>gender: ${req.body.gender}</li>
               <li>message: ${req.body.message}</li>
             </ul>
           `;
      const info = await transporter.sendMail({
        from: `"${req.body.title}👻" <dronxxx1993@yandex.ru>`, // sender address
        to: "dronxxx1993@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: req.body.message, // plain text body
        html: output, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log(
        "Preview URL: %s",
        nodemailer.getTestMessageUrl(info)
      );
    } catch (error) {
      next(error);
    }
  },
];
