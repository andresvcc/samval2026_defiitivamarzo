export interface QuoteFormData {
    name: string;
    company?: string;
    email: string;
    serviceType: string;
    message: string;
}

export interface QuoteResponse {
    success: boolean;
    message: string;
    emailId?: string;
    error?: string;
}

export const sendQuote = async (formData: QuoteFormData): Promise<QuoteResponse> => {
    try {
        // Para Hostinger, usamos el script PHP
        const response = await fetch('/api/send-quote.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al enviar la cotización');
        }

        return data;
    } catch (error) {
        console.error('Error enviando cotización:', error);
        throw error;
    }
};
