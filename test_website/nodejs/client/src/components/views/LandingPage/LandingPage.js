import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon, Col, Cards, Row, Card, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import Column from 'antd/lib/table/Column';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    

    useEffect(()=> {

        let body = {
            skip : Skip,
            limit : Limit
        }

        // 여기서 limit과 skip을 사용해서 8개만 가져오게함.
        axios.post('/api/product/products', body)
        .then(response => {
            if (response.data.success){
                console.log(response.data)
                setProducts(response.data.productInfo)
            }
            else{
                alert("상품들을 가져오는데 실패했습니다.")
            }
        })  


     }, [])

     const loadMoreHandler = () =>{
         
     }

     const renderCards = Products.map((product, index) => {

        console.log('product', product)

        return <Col lg={6} md={8} xs={24} key = {index}>
        
        <Card
            cover= {<ImageSlider images = {product.images}></ImageSlider>}>
            
            <Meta
                title = {product.title}
                description = {`$${product.price}`}></Meta>
        </Card>

        </Col>
     })


    return (
        <div style = {{width:'75%', margin: '3rem auto'}}>

            <div style= {{textAlign : 'center'}}>
                <h2>Let's Travel Anyware!!!<Icon type = "rocket"></Icon></h2>
            </div>
            
            {/* Filter */}

            {/* Search */}

            {/* Cards */}


            <Row gutter= {[16,16]}>
                {renderCards}
            </Row>
            

            <div style={{justifyContent:'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>

        </div>
    )
}

export default LandingPage
