import nodemailer from "nodemailer"
import handlebars from "handlebars"
import * as fs from 'fs'
import path from 'path'
import url from 'url'

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure:true,
      auth: {
        user: process.env.FROM_EMAIL,               
        pass: "jurrllcivslimnrn", // naturally, replace both with your real credentials or an application-specific password
      },
    });
//hvgsrbzbewuandgt
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        return res.status(200).json({
          
          success: true,
        });
      }
    });
  } catch (error) {
    console.log("jj",error);
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

export default sendEmail  