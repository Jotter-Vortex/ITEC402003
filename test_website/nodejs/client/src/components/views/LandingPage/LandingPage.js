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
    const [PostSize, setPostSize] = useState(0)
    

    useEffect(()=> {

        let body = {
            skip : Skip,
            limit : Limit
        }
        
        getProducts(body) // 처음에 들어왔을때 트리거함.


     }, [])

    const getProducts = (body) => {
        // 여기서 limit과 skip을 사용해서 8개만 가져오게함.
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    }
                    else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                    console.log(response.data)
                }
                else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })  
     }

     const loadMoreHandler = () =>{

        let skip = Skip + Limit // 더보기를 눌렀을때 가지는 skip 값
        //          0 + 8
        //          8 + 8

        let body = {
            skip : skip,        // 여기선 이 skip이 바뀌어야함
            limit : Limit,
            loadMore: true                   // 더보기 눌렀을때 가는 정보
        }

        getProducts(body)
        setSkip(skip)
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
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let's Travel Anyware!!!<Icon type="rocket"></Icon>
                </h2>
            </div>

            {/* Filter */}

            {/* Search */}

            {/* Cards */}

            <Row gutter={[16, 16]}>{renderCards}</Row>

            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
