export interface Reviews {
    reviewId: number;
    rating: number;
    text: string;
    timestamp: string;
    displayName:string;
    userId:string;
}

export interface ReviewAdd {
    rating: number;
    text: string;
    timestamp: string;
    userId:string;
    movieId:number;
}

