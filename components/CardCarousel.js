import Loader from "react-loader-spinner";
import Card from "./Card"

const CardCarousel = ({items, preview, isLoggedIn, isLoading, selectCard}) => {

    return (
        <div className="card-carousel">
            {(items?.length && !isLoading)?
                items?.map((v, i) => {
                    return <div className="card-carousel__item" key={i} id={v.id} >
                        <Card isLoggedIn={isLoggedIn} onClick={preview} order={v} selectCard={selectCard} />
                    </div>
                })
            :
            <div className="av-height">
                <div className="center">
                    {isLoading?<Loader type="TailSpin" />:'No Items yet.'}
                </div>
            </div>
            }

        </div>
    )
}

export default CardCarousel;