import './MovieSearchContent.scss'
import {MouseEventHandler} from "react";

interface MovieSearchContentProps {
    tsrc: string,
    name: string,
    rating: number,
    onClick: MouseEventHandler<HTMLDivElement>
}

const MovieSearchContent = ({ tsrc, name, rating, onClick }: MovieSearchContentProps): JSX.Element => {
    return (
        <div className="film-container"  onClick={onClick}>
            <div className="thumbnail-container">
                <img src={tsrc} alt={name} />
            </div>
            <h3 className="name">{name}</h3>
            <span className="rating">{rating}</span>
        </div>
    );
};
export default MovieSearchContent;