import './card-list.scss'

interface CardProps {
    category: string;
    heading: string;
    backgroundImage:string;
}

const CardList: React.FC<CardProps> = ({category, heading,backgroundImage}) => {


    return (
        <div className="card-list-container">
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet"/>

            <div className="hero-section">
                <div className="card-grid">
                    <a className="card" href="#">
                        <div className="card__background"
                             style={{backgroundImage: `url(${backgroundImage})`}}></div>
                        <div className="card__content">
                            <p className="card__category">{category}</p>
                            <h3 className="card__heading">{heading}</h3>
                            <br/>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    )

};

export default CardList;