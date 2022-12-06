const fs = require("fs")
const nodemailer = require("nodemailer")
const json2xls = require("json2xls")
const filename = "BUIFIX.xlsx"

const convert = function (responses) {
    var xls = json2xls(responses);
    fs.writeFileSync(filename, xls, "binary", (err) => {
        if (err) {
            console.log("writeFileSync :", err);
        }
        console.log(filename + " file is saved!");
    });
};

const pushEmail = ({ data, email }) => {
    convert(data);
    const output = `
            <p>BUIFIX Software Report</p>
            <h3>Contact Details</h3>
            <ul>
                <li>Name: BUIFIX Software</li>
                <li>Email: admin@buifix.rw</li>
                <li>Phone: +250 789 833 217</li>
            </ul>
            <h3>Message</h3>
            <p>This is the report was generated on ${new Date()}</p>
        `;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    // Step 2
    let mailOptions = {
        from: process.env.EMAIL,
        to: `${email}`,
        subject: "BUIFIX System Report",
        text: "heading",
        html: output,
        attachments: [
            {
                filename: "BUIFIX.xlsx",
                path: "./BUIFIX.xlsx",
            },
        ],
    };

    // Step 3
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return err.message;
        }
    });

    return "report sent to your email please check, and make sure that you have verifyed account "
}


const pushNotification = ({ email, amount }) => {
    const output = `
            <p>BUIFIX Software WAGE-INCOME</p>
            <h3>Contact Details</h3>
            <ul>
                <li>Name: BUIFIX Software</li>
                <li>Email: admin@buifix.rw</li>
                <li>Phone: +250 789 833 217</li>
            </ul>
            <h3>WAGE-NOT</h3>
            <p>${new Date()} you have received amount: ${amount} on your account from BUIFIX-${new Date()}</p>
        `;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    // Step 2
    let mailOptions = {
        from: process.env.EMAIL,
        to: `${email}`,
        subject: "BUIFIX Software WAGE-INCOME",
        text: "heading",
        html: output,
    };

    // Step 3
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return err.message;
        }
    });

    return "notification sent to your email please check, and make sure that you have verifyed account "
}

module.exports = { pushEmail, pushNotification }