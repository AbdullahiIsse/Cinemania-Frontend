export interface MovieDetail {
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    runtime:number
    genres: []
}

export interface MovieCredits{
    id:number;
    cast:[MovieCast];
    crew:[MovieCast];
}

interface MovieCast {
    id:number;
    known_for_department:string;
    name:string;
    profile_path:string;
    character:string;
    job:string;
}

export interface MovieCastRecommendations{
    results:[MovieDetail]
}

