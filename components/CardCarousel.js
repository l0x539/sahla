import Card from "./Card"

const CardCarousel = ({items, preview}) => {

    return (
        <div className="card-carousel">
            {items?.map((v, i) => {
                console.log("pro:", v);
                return <div className="card-carousel__item" key={i} >
                    <Card onClick={preview} order={v} />
                </div>
            })}

        </div>
    )
}

export default CardCarousel;