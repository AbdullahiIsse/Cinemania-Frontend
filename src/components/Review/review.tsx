import {useContext, useEffect, useState} from "react";
import {Avatar, Button, createStyles, Group, Rating, Textarea, Text, rem, Popover} from "@mantine/core";
import {UserContext} from "../../Context/UserContext.tsx";
import {addReview, getReviewsByMovie, RemoveReview, updateReview} from "./Service.tsx";
import {Reviews} from "./types.tsx";


const useStyles = createStyles((theme) => ({
    body: {
        paddingLeft: rem(54),
        paddingTop: theme.spacing.sm,
    },
}));

interface id {
    movieId:number
}
const Review = ({movieId} :id) => {
    const { classes } = useStyles();
    const [rating, setRating] = useState(0);
    const [updatedRating, setUpdatedRating] = useState(0);
    const [text, setText] = useState('');
    const [updatedText, setUpdatedText] = useState('');
    const [reviewList, setReviewList] = useState<Reviews[]>([]);
    const {currentUser} = useContext(UserContext);
    const handleSubmit = async (event:any)=> {
        event.preventDefault();
        if (rating === 0){
           alert("Rating cannot be 0")
            return;
        }
        const date = new Date();
        const review = {rating:rating,text:text,timestamp:date.toDateString(),userId:currentUser.uid,movieId:movieId}
        if (reviewList.find((r) => r.userId === review.userId)) {
            alert("You have already given a review. Please delete or update your current review.");
            return;
        }

        try {
            await addReview({rating:rating,text:text,timestamp:date.toDateString(),userId:currentUser.uid,movieId:movieId});
            window.location.reload();
        } catch (error:any){
            console.log(error)
        }
    }


    useEffect(() => {
        getReviewsByMovie(movieId)
            .then((data: any ) => {
                setReviewList(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [movieId]);
    
    
    return (<div>

            <h3>Review:</h3>
            <br/>
            <br/>
            <br/>
            <br/>
            {reviewList.length === 0 && <h3>Be the first to review this</h3>}
            {reviewList.map((review) => (

                <div key={review.reviewId}>
                    <Group>
                        <Avatar src={""} alt={""} radius="xl" />
                        <div>
                            <Text size="sm">{review.displayName}</Text>
                            <Text size="xs" color="dimmed">
                                {review.timestamp}
                            </Text>
                        </div>
                        {currentUser &&
                            review.userId === currentUser.uid && (
                                <div>
                                    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
                                        <Popover.Target>
                                            <Button>Edit</Button>
                                        </Popover.Target>
                                        <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
                                            <form onSubmit={async (event)=> {
                                                event.preventDefault();
                                                if (updatedRating === 0){
                                                    alert("Rating cannot be 0")
                                                    return;
                                                }
                                                const date = new Date();
                                                try {
                                                    await updateReview({rating:updatedRating,text:updatedText,timestamp:date.toDateString(),userId:currentUser.uid,movieId:movieId},review.reviewId,review.userId);
                                                    window.location.reload();
                                                } catch (error:any){
                                                    console.log(error)
                                                }

                                            }}>
                                                <Rating value={updatedRating} onChange={setUpdatedRating}  />;
                                                <Textarea value={updatedText} onChange={(event) => setUpdatedText(event.currentTarget.value)} required/>
                                                <Button type='submit' color='blue'>Update the review</Button>
                                            </form>

                                        </Popover.Dropdown>
                                    </Popover>
                                    <Button onClick={ async ()=> {await RemoveReview(review.reviewId,currentUser.uid); window.location.reload();}}>Delete</Button>
                                </div>
                            )}
                    </Group>
                    <Text className={classes.body} size="sm">
                        <Rating value={review.rating} fractions={2} readOnly />
                        {review.text}
                    </Text>
                    <br/>
                </div>)
            )}
            <br/>
            <br/>
            <br/>
            <br/>
            {currentUser !== null ? (<div>
                <form onSubmit={handleSubmit}>
                    <Rating value={rating} onChange={setRating}  />;
                    <br/>
                    <br/>
                    <Textarea value={text} onChange={(event) => setText(event.currentTarget.value)} required/>
                    <br/>
                    <br/>
                    <Button type='submit' color='blue'>Submit the review</Button>
                </form>
            </div>): <h3>Please sign in to review this </h3>}
        </div>
    )

};

export default Review;