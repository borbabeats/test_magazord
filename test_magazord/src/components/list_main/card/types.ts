export interface CardProps {
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number | undefined;
    forks_count: number | undefined;
}