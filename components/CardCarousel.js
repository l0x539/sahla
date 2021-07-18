import Card from "./Card"

const CardCarousel = ({items}) => {

    return (
        <div className="card-carousel">
            {items?.map((v, i) => {
                return <div className="card-carousel__item" key={i} >
                    <Card title={v.title} desc={v.desc} image={v.image} />
                </div>
            })}

        </div>
    )
}

export default CardCarousel;