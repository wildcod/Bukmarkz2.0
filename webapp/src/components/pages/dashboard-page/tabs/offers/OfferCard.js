import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import s from './Offers.module.scss'
import Card from 'reactstrap/lib/Card'

const OfferCard = ({offer}) => {
  console.log(offer)
  return (
    <div className={s.offerCard}>
      <Card>
        <Carousel>
          {offer.images.map((i, idx) =>
            <Carousel.Item>
              <div className={s.imageContainer}>
                <img
                  src={i.image}
                  alt={idx}
                />
              </div>
            </Carousel.Item>
          )}
        </Carousel>
        <h4 className={s.offerTitle}>
          {offer.title}
        </h4>
        <div className={s.offerDescription}>
          {offer.description}
        </div>
      </Card>
    </div>
  )
}

export default OfferCard
