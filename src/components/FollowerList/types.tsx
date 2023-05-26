export interface followerUserMovie {
    userId:string,
    followedId:string,
    displayName:string,
    email:string,
    movieId:number,
    title:string,
    releaseDate:string,
    voteAverage:number,
    image:string
}

export interface FollowedUser {
    email:string,
    displayName:string,

}