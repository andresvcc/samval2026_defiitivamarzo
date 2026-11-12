import { media } from '../generated/media';

// Tipos
export type Photo = {
    id: string;
    url: string;
    description: string | null;
    category: string | null;
    page: string | null;
    section: string | null;
    title: string | null;
    created_at: string;
};

export type FinancialStatement = {
    id: string;
    year: number;
    title: string;
    file_url: string;
    created_at: string;
};

export type Partner = {
    id: string;
    name: string;
    logo_url: string | null;
    website_url: string | null;
    created_at: string;
};

export type TeamMember = {
    id: string;
    name: string;
    role: string;
    bio: string | null;
    photo_url: string | null;
    social_linkedin: string | null;
    created_at: string;
};

// Datos Estáticos (Puede editarlos aquí directamente)

export const staticTeamData: TeamMember[] = [
    {
        id: '1',
        name: 'Ana María Vallejo',
        role: 'Directora Ejecutiva',
        bio: 'Ingeniera con más de 10 años de experiencia en gestión de proyectos sociales y tecnología.',
        photo_url: media.team1,
        social_linkedin: '#',
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Carlos Rodríguez',
        role: 'Líder Técnico',
        bio: 'Desarrollador Full Stack apasionado por la enseñanza y el código libre.',
        photo_url: media.team2,
        social_linkedin: '#',
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Luisa Fernanda',
        role: 'Coordinadora de Campo',
        bio: 'Socióloga experta en trabajo comunitario y metodologías participativas.',
        photo_url: media.team3,
        social_linkedin: '#',
        created_at: new Date().toISOString()
    }
];

export const staticPartnersData: Partner[] = [
    {
        id: '1',
        name: 'Sierra Nevada Tech',
        logo_url: 'https://placehold.co/200x200?text=SNT',
        website_url: 'https://example.com',
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Fundación Futuro',
        logo_url: 'https://placehold.co/200x200?text=FF',
        website_url: 'https://example.com',
        created_at: new Date().toISOString()
    }
];

export const staticFinancialsData: FinancialStatement[] = [
    {
        id: '1',
        year: 2025,
        title: 'Informe de Gestión 2025',
        file_url: '#', // Enlace a PDF real
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        year: 2024,
        title: 'Estados Financieros 2024',
        file_url: '#',
        created_at: new Date().toISOString()
    }
];

export const staticPhotosData: Photo[] = [
    {
        id: '1',
        url: media.project1,
        description: 'Banner Principal - Niños aprendiendo',
        category: 'home',
        page: 'home',
        section: 'hero',
        title: 'Hero Image',
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        url: media.project2,
        description: 'Misión - Trabajo en equipo',
        category: 'home',
        page: 'home',
        section: 'mission',
        title: 'Mission Image',
        created_at: new Date().toISOString()
    }
];
