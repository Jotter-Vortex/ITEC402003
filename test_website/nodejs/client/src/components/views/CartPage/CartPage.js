import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {getCartItems} from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
  const dispatch = useDispatch();

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
      }
    }
  }, [props.user.userData])
  
  return (
    <div style={{width: '85%', margin: '3rem auto'}}>
      <h1>My Cart</h1> 

      <div>
        <UserCardBlock products = {props.user.cartDetail && props.user.cartDetail.product}/>
      </div>
    </div>
    
  )
}

export default CartPage