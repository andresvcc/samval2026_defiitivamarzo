import React from 'react';

const TermsOfUse: React.FC = () => {
    return (
        <div className="bg-white min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-black text-slate-900 mb-8 font-primary">Términos y Condiciones de Uso</h1>
                <p className="text-sm text-slate-500 mb-12 uppercase tracking-widest font-bold">Última actualización: Enero 2026</p>

                <section className="space-y-8 text-slate-700 leading-relaxed">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Aceptación del Usuario</h2>
                        <p>
                            El acceso y uso del sitio web de la <strong>FUNDACIÓN SAMVAL</strong> atribuye la condición de Usuario e implica la aceptación total de estos términos. El sitio web tiene como objetivo informar sobre proyectos sociales, servicios tecnológicos y facilitar donaciones bajo el régimen tributario especial.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Propiedad Intelectual</h2>
                        <p>
                            Todo el contenido (textos, logos, código fuente de demostración, imágenes y metodologías STEAM) es propiedad exclusiva de la Fundación Samval o cuenta con las licencias correspondientes. Queda prohibida la reproducción total o parcial sin autorización previa y por escrito.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Proceso de Donación e Inversión Social</h2>
                        <p>
                            Las donaciones realizadas a través de los canales oficiales de la Fundación se rigen por la normativa de ESAL en Colombia. La Fundación se compromete a emitir los certificados de donación válidos para deducción tributaria (Art. 257 E.T.) una vez verificado el ingreso de los fondos.
                        </p>
                        <p className="mt-4">
                            Cada inversión en proyectos territoriales (como los programas de robótica en la Sierra Nevada) incluye reportes periódicos de impacto y transparencia en la ejecución presupuestal.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Exención de Responsabilidad</h2>
                        <p>
                            La Fundación Samval no se hace responsable por interrupciones técnicas del servicio ni por el uso indebido que terceros puedan dar a la información publicada. No garantizamos resultados específicos de aprendizaje si no se sigue la metodología STEAM completa proporcionada por nuestros facilitadores.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Legislación y Jurisdicción</h2>
                        <p>
                            Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia será resuelta ante los jueces competentes de la ciudad de Barranquilla.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TermsOfUse;
