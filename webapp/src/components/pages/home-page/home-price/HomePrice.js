import React, {useEffect} from 'react'
import style from './HomePrice.module.scss'
import Button from '../../../common/button/Button'
import {plansColorScheme} from '../../../../constants'
import {useDispatch, useSelector} from 'react-redux'
import {getSubscriptions, selectSubscriptions} from '../../../../redux/reducers/subscriptions'

const PricePage = () => {
  const subscriptions = useSelector(selectSubscriptions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSubscriptions())
  }, [dispatch])

  console.log("DATA", subscriptions);


  return (
    <div className={style.pricePage} id={'bukmarkz-home-price'}>
      <div className={style.pricingContainer}>
        <h2>Price</h2>
        <div className={style.plans}>
          {
            subscriptions.map((plan, index) => (
              <div className={style.cardContainer}>
                <div style={{backgroundColor: plansColorScheme[plan.name.toUpperCase()].titleBgColor}}
                     className={style.header}>
                  <h2
                    style={{
                      color: plansColorScheme[plan.name.toUpperCase()].titleColor
                    }}>
                    {plan.name}
                  </h2>
                  <p style={{color: plansColorScheme[plan.name.toUpperCase()].descColor}}>{plan.desc}</p>
                </div>
                <div className={style.priceText}>
                  {!plan.is_free &&
                  <span style={{color: plansColorScheme[plan.name.toUpperCase()].textColor}} id={style.doller}>{plan.currency}</span>}
                  {!plan.is_free
                    ? <span style={{color: plansColorScheme[plan.name.toUpperCase()].textColor}}
                            id={style.price}>{plan.price}</span>
                    : <span style={{color: plansColorScheme[plan.name.toUpperCase()].textColor}}
                            id={style.price}>Free</span>
                  }
                  {!plan.is_free && <span id={style.misc}>per <br/> year</span>}
                </div>
                <div className={style.features}>
                  <ul>
                    {
                      plan.features.map(f => (
                        <li>
                          <span>{f.name}</span>
                          <span
                            style={{color: plansColorScheme[plan.name.toUpperCase()].textColor}}>{f.description}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className={style.btnContainer}>
                  <Button
                    label={'Order Now!'}
                    style={{
                      color: plansColorScheme[plan.name.toUpperCase()].btnTextColor,
                      backgroundColor: plansColorScheme[plan.name.toUpperCase()].btnBgColor
                    }}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PricePage
