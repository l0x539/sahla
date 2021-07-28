import Card from "./Card"

const CardCarousel = ({items, preview}) => {

    return (
        <div className="card-carousel">
            {items?.map((v, i) => {
                return <div className="card-carousel__item" key={i} >
                    <Card onClick={preview} title={v.title} desc={v.desc} image={v.image} id={v.id} />
                </div>
            })}

        </div>
    )
}

export default CardCarousel;