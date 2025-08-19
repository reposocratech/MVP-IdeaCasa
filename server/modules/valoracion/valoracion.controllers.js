import { sendEmail } from '../../helpers/emailUtils.js';
import dotenv from 'dotenv';
import { valoracionSchema } from '../../schemas/valoracionSchema.js';
import { ZodError } from 'zod';

dotenv.config();

class ValoracionController {
    solicitarValoracion = async (req, res) => {
        try {

            const validatedData = valoracionSchema.parse(req.body); //


            const subject = `Nueva Solicitud de Valoración: ${validatedData.tipo} en ${validatedData.ciudad}`;

            const htmlContent = `
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>${subject}</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td style="padding: 20px 0 30px 0;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                    <tr>
                                        <td align="center" bgcolor="#007bff" style="padding: 10px 0; border-top-left-radius: 8px; border-top-right-radius: 8 honoured;">
                                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; padding: 10px 0;">¡Nueva Solicitud de Valoración!</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" style="padding: 30px 40px;">
                                            <p style="margin: 0 0 15px 0; font-size: 16px;">Estimado/a gerente,</p>
                                            <p style="margin: 0 0 20px 0; font-size: 16px;">Se ha recibido una nueva solicitud de valoración a través del formulario web. A continuación, se detallan los datos proporcionados por el interesado:</p>

                                            <h2 style="color: #007bff; font-size: 20px; font-weight: 600; margin: 25px 0 15px 0; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">Datos del Inmueble:</h2>
                                            <ul style="list-style: none; padding: 0; margin: 0;">
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Tipo:</strong> ${validatedData.tipo}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Ciudad:</strong> ${validatedData.ciudad}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Provincia:</strong> ${validatedData.provincia || 'No especificada'}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Calle:</strong> ${validatedData.calle || 'No especificada'}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Código Postal:</strong> ${validatedData.codigoPostal || 'No especificado'}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Planta:</strong> ${validatedData.planta || 'No especificada'}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Dormitorios:</strong> ${validatedData.dormitorios || 'No especificado'}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Superficie:</strong> ${validatedData.superficie ? `${validatedData.superficie} m²` : 'No especificada'}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Baños:</strong> ${validatedData.baños || 'No especificado'}</li>
                                            </ul>

                                            <h2 style="color: #007bff; font-size: 20px; font-weight: 600; margin: 25px 0 15px 0; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">Datos de Contacto:</h2>
                                            <ul style="list-style: none; padding: 0; margin: 0;">
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Nombre:</strong> ${validatedData.nombreContacto}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Teléfono:</strong> ${validatedData.telefonoContacto || 'No especificado'}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Email:</strong> ${validatedData.emailContacto}</li>
                                                <li style="margin-bottom: 8px;"><strong style="color: #555555;">Mensaje:</strong> ${validatedData.mensajeContacto || 'Ninguno'}</li>
                                            </ul>

                                            <p style="margin: 20px 0 5px 0;">El cliente <strong style="color: ${validatedData.aceptoPrivacidad ? '#28a745' : '#dc3545'};">${validatedData.aceptoPrivacidad ? 'ha aceptado' : 'NO ha aceptado'}</strong> la política de privacidad.</p>
                                            <p style="margin: 5px 0 0 0;">El cliente <strong style="color: ${validatedData.aceptoNovedades ? '#28a745' : '#dc3545'};">${validatedData.aceptoNovedades ? 'ha aceptado' : 'NO ha aceptado'}</strong> recibir boletines y novedades.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#f4f4f4" style="padding: 20px 40px; text-align: center; font-size: 12px; color: #aaaaaa; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-top: 1px solid #eeeeee;">
                                            <p style="margin: 0;">Este correo ha sido generado automáticamente por el Sistema de Solicitudes de Valoración.</p>
                                            <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} IdeaCasa. Todos los derechos reservados.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `;

            await sendEmail(process.env.EMAIL_RECIPIENT, subject, htmlContent);

            res.status(200).json({ message: 'Solicitud de valoración enviada con éxito.' });

        } catch (error) {

            if (error instanceof ZodError) { //
                console.error('Error de validación Zod:', error.errors);
                const errors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                return res.status(400).json({ message: 'Errores de validación', errors }); //
            }

            console.error('Error en el controlador solicitarValoracion:', error);
            res.status(500).json({ message: 'Error interno del servidor al procesar su solicitud.' });
        }
    };
}

export default new ValoracionController();
