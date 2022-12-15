import React, {useEffect} from 'react'
import s from './Offers.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getOffers, selectOffers} from '../../../../../redux/reducers/offers'
import OfferCard from './OfferCard'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Offers = () => {
  const offers = useSelector(selectOffers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOffers())
  }, [dispatch])

  return (
    <div className={s.offerContainer}>
      {!offers || offers.length === 0 ? <h4>No offers available</h4>
        :
        <div className={s.offers}>
          <Row>
            {offers.map(offer => <Col md={6} key={offer.id}>
              <OfferCard offer={offer}/>
            </Col>)}
          </Row>

        </div>
      }
    </div>
  )
}

export default Offers
