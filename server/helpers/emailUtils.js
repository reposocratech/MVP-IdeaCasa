import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (to, subject, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${to} con asunto: ${subject}`);
        return { success: true, message: 'Correo enviado correctamente' };
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw { success: false, message: 'Error al enviar el correo', error: error.message };
    }
};
