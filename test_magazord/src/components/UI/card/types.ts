export interface CardProps {
    full_name: string;
    description?: string | null;
    stargazers_count?: number | undefined;
    forks_count?: number | undefined;
    language?: string | undefined | null
}