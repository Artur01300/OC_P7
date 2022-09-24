const nodemailer = require("nodemailer");

async function main() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports

    auth: {
      user: "art79arm@gmail.com", // generated ethereal user
      pass: "lnzzkshallstacez", // generated ethereal password
    },
  });

let info = await transporter.sendMail({
    from: '"CT_Bugey 👋" <art79arm@gmail.com>',
    to: "artur.karapetyan@outlook.fr",
    subject: "Hello ✔ comment va", // Subject line
    text: "I specialize in web development by interest and passion. For the professional license, I obtained my Web Developer diploma in 2021 (in France).", // plain text body
    // html: "<b>I specialize in web development by interest and passion. For the professional license, I obtained my Web Developer diploma in 2021 (in France).</b>", // html body
  });
  console.log("Message sent: %s", info);
}
  
  main().catch(console.error);