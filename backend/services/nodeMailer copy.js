const nodemailer = require("nodemailer");

async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
    //   host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "art79arm@gmail.com", // generated ethereal user
        pass: "lnzzkshallstacez", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"CT_Bugey 👋" <art79arm@gmail.com>', // sender address
      to: "artur.karapetyan@outlook.fr", // list of receivers
      subject: "Hello ✔ comment va", // Subject line
      text: "I specialize in web development by interest and passion. For the professional license, I obtained my Web Developer diploma in 2021 (in France).", // plain text body
      // html: "<b>I specialize in web development by interest and passion. For the professional license, I obtained my Web Developer diploma in 2021 (in France).</b>", // html body
    });
  
    console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);