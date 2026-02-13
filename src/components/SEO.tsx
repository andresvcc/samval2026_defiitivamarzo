import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    page: 'home' | 'about' | 'projects' | 'services' | 'contact';
}

const SEO: React.FC<SEOProps> = ({ page }) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        // Update Document Title
        const title = t(`seo.${page}.title`);
        const description = t(`seo.${page}.description`);

        if (title) document.title = title;

        // Update Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = description;
            document.head.appendChild(meta);
        }

        // Update HTML Lang Tag
        document.documentElement.lang = i18n.language;

        // Update OpenGraph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', description);

    }, [page, t, i18n.language]);

    return null;
};

export default SEO;
