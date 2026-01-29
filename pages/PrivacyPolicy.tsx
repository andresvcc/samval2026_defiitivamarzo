import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-white min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-black text-slate-900 mb-8 font-primary">Política de Tratamiento de Datos Personales</h1>
                <p className="text-sm text-slate-500 mb-12 uppercase tracking-widest font-bold">Vigencia: Enero 2026 | Ley 1581 de 2012</p>

                <section className="space-y-8 text-slate-700 leading-relaxed">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Identificación del Responsable</h2>
                        <p>
                            <strong>FUNDACIÓN SAMVAL</strong>, identificada con NIT registrado en Cámara de Comercio de Barranquilla, con domicilio en Calle 104 #51B-154 Ofi 17, Barranquilla, Colombia, correo electrónico: contact@samval.org y teléfono: 323 320 7532, actúa como Responsable del Tratamiento de sus datos personales.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Finalidad del Tratamiento</h2>
                        <p>Los datos personales recolectados serán utilizados para las siguientes finalidades secundarias y principales:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Gestionar procesos de donación, expedición de certificados tributarios y reportes ante la DIAN.</li>
                            <li>Mantener comunicación sobre el impacto de los proyectos sociales en el territorio.</li>
                            <li>Tramitar solicitudes de servicios tecnológicos y soporte técnico.</li>
                            <li>Dar cumplimiento a obligaciones legales y regulatorias en materia de ESAL (Entidades Sin Ánimo de Lucro).</li>
                            <li>Análisis estadístico y de impacto social bajo anonimización.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Derechos de los Titulares</h2>
                        <p>De acuerdo con la normatividad colombiana vigente, usted tiene derecho a:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Conocer, actualizar y rectificar su información personal.</li>
                            <li>Solicitar prueba de la autorización otorgada.</li>
                            <li>Ser informado sobre el uso que se le ha dado a sus datos.</li>
                            <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
                            <li>Revocar la autorización o solicitar la supresión del dato cuando no se respeten los principios, derechos y garantías constitucionales.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Procedimiento para el Ejercicio de Derechos</h2>
                        <p>
                            Usted puede elevar cualquier consulta, queja o solicitud de actualización enviando un correo electrónico a <strong>contact@samval.org</strong>. El tiempo de respuesta no excederá los quince (15) días hábiles establecidos por la ley.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Seguridad de la Información</h2>
                        <p>
                            La Fundación Samval implementa medidas técnicas, humanas y administrativas de seguridad para garantizar que sus datos no sean adulterados, perdidos o accedidos por terceros no autorizados, cumpliendo con los estándares de ciberseguridad exigidos para 2026.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
