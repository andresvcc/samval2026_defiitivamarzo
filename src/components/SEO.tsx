import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    page?: string;
    title?: string;
    description?: string;
}

const SEO: React.FC<SEOProps> = ({ page, title, description }) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        // Resolve title: direct prop > translation key > fallback
        const resolvedTitle = title || (page ? t(`seo.${page}.title`, { defaultValue: '' }) : '') || 'Fundación SAMVAL';
        const resolvedDescription = description || (page ? t(`seo.${page}.description`, { defaultValue: '' }) : '');

        // Only set if we have a real value (not a translation key echo)
        if (resolvedTitle && !resolvedTitle.startsWith('seo.')) {
            document.title = resolvedTitle;
        } else {
            document.title = 'Fundación SAMVAL';
        }

        // Update Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        const descContent = resolvedDescription && !resolvedDescription.startsWith('seo.') ? resolvedDescription : '';
        if (metaDescription) {
            metaDescription.setAttribute('content', descContent);
        } else if (descContent) {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = descContent;
            document.head.appendChild(meta);
        }

        // Update HTML Lang Tag
        document.documentElement.lang = i18n.language;

        // Update OpenGraph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', resolvedTitle);
        else {
            const meta = document.createElement('meta');
            meta.setAttribute("property", "og:title");
            meta.content = resolvedTitle;
            document.head.appendChild(meta);
        }

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', descContent);
        else {
            const meta = document.createElement('meta');
            meta.setAttribute("property", "og:description");
            meta.content = descContent;
            document.head.appendChild(meta);
        }

        // --- JSON-LD Structured Data ---
        let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
        
        if (!script) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }

        const jsonLdData = {
            "@context": "https://schema.org",
            "@type": "NGO",
            "name": "Fundación SAMVAL",
            "url": "https://samval.org",
            "logo": "https://samval.org/logo.png",
            "description": descContent || "Organización No Gubernamental especializada en robótica etnopertinente y educación STEAM para comunidades indígenas y afrocolombianas en Colombia.",
            "knowsAbout": ["Robótica Etnopertinente", "Educación STEAM Indígena", "Thymio", "Arhuaco", "Palenquero"],
            "areaServed": "Colombia"
        };
        
        script.textContent = JSON.stringify(jsonLdData);

    }, [page, title, description, t, i18n.language]);

    return null;
};

export default SEO;
