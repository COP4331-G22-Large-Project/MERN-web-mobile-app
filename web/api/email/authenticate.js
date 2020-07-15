import { createTransport } from 'nodemailer';

var transporter = createTransport({
service: 'gmail',
auth: {
user: 'coydiego@gmail.com',
pass: 'Peeper71!'
}
});

var mailOptions = {
from: 'coydiego@gmail.com',
to: 'coydiego@gmail.com',
subject: 'Hello World',
text: 'test'
};

transporter.sendMail(mailOptions, function(error, info){
if (error) {
console.log(error);
} else {
console.log('Email sent: ' + info.response);
}
});