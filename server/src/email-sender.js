const nodemailer = require('nodemailer');
const feserver = require("./support/constants").feserver;


module.exports = function sendEmail(email, hash) {



    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: 'Gmail',
        auth: {
            user: 'dmitry.dubravin@bigdropinc.com', // generated ethereal user
            pass: 'password' // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `<a href="${feserver}/email-confirmation/${hash}">link</a>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('\n\n\nerror', error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });



}
