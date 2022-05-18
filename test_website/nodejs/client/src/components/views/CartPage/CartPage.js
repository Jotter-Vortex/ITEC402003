import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {getCartItems, removeCartItem, onSuccessBuy} from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result } from 'antd';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0)
  const [ShowTotal, setShowTotal] = useState(false)
  const [ShowSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    
    let cartItems = []

    // console.log("props.user", props.user);

    // 리덕스 User state안에 cart 안에 상품이 들어있는지 확인해야함.
    if(props.user.userData && props.user.userData.cart){
      if(props.user.userData.cart.length > 0){
        // 상품의 아이디를 모두 가져와야함.
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id)
          // console.log("item.id", item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart))
        .then(response=> {calculateTotal(response.payload)})
      }
    }
  }, [props.user.userData])

  let calculateTotal = (cartDetail) => {
    let total =0;

    cartDetail.map(item=>{
      total+=parseInt(item.price,10) * item.quantity
    })
    setTotal(total)
    setShowTotal(true)
  }

  let removeFromCart = (productId) => {

    dispatch(removeCartItem(productId))
    .then(response => {
      if(response.payload.productInfo.length<=0){
        setShowTotal(false)
      }
    })

  }
  const transactionSuccess = (data) =>{
     dispatch(onSuccessBuy({
        paymentData : data,
        cartDetail : props.user.cartDetail
     }))
     .then(response => {
       if (response.payload.success){
         setShowTotal(false)
         setShowSuccess(true)
       }
     })
  }
  
  return (
    <div style={{width: '85%', margin: '3rem auto'}}>
      <h1>My Cart</h1> 

      <div>
        <UserCardBlock products = {props.user.cartDetail} removeItem = {removeFromCart}/>
      </div>

      

      {/* showTotal 변수가 있을때는 카드를 만들어 붙여주고 없을때는 UI를 보여준다. */}
      {ShowTotal ? 
        <div style={{marginTop: '3rem'}}>
          <h2>Total Amount: ${Total}</h2>
        </div>
        : ShowSuccess ?
          <Result
            status="success"
            title="Successfully Purchased Items"
          />
          :

          <>
            <br />
            <Empty description={false}></Empty>
          </>
      }


      {/* 상품이 있을 때만 결제 창을 보여주게끔 함. */}
      {ShowTotal && 
      <Paypal 
      total = {Total}
      onSuccess= {transactionSuccess}/>
      }
    </div>
    
  )
}

export default CartPage