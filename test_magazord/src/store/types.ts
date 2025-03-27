export interface User {
    avatar_url: string
    name: string | null
    bio: string | null
    company: string | null
    location: string | null
    login: string | null
}

export interface Repo {
    full_name: string
    html_url: string
    id: number
    name: string
    description: string | null
    stargazers_count?: number
    forks_count?: number
    language?: string | null
}

export interface StoreState {
    user: User | null
    repos: Repo[]
    loading: boolean
    error: string | null
    fetchRepos: () => void
    fetchUser: () => void
}