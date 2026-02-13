
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
        photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
        social_linkedin: '#',
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Carlos Rodríguez',
        role: 'Líder Técnico',
        bio: 'Desarrollador Full Stack apasionado por la enseñanza y el código libre.',
        photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
        social_linkedin: '#',
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Luisa Fernanda',
        role: 'Coordinadora de Campo',
        bio: 'Socióloga experta en trabajo comunitario y metodologías participativas.',
        photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
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
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000',
        description: 'Banner Principal - Niños aprendiendo',
        category: 'home',
        page: 'home',
        section: 'hero',
        title: 'Hero Image',
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
        description: 'Misión - Trabajo en equipo',
        category: 'home',
        page: 'home',
        section: 'mission',
        title: 'Mission Image',
        created_at: new Date().toISOString()
    }
];
