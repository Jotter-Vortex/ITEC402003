import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon, Col, Cards, Row, Card, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { continents, price } from './Sections/Datas';
import Radiobox from './Sections/RadioBox';
import SearchFreature from './Sections/SearchFreature';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
      continents: [],
      price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")
    

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
            loadMore: true,                   // 더보기 눌렀을때 가는 정보
            filters : Filters
        }

        getProducts(body)
        setSkip(skip)
     }

     const renderCards = Products.map((product, index) => {

        console.log('product', product)

        return (
          <Col lg={6} md={8} xs={24} key={index}>
            <Card cover={<a href = {`/product/${product._id}`}><ImageSlider images={product.images}></ImageSlider></a>}>
              <Meta
                title={product.title}
                description={`$${product.price}`}
              ></Meta>
            </Card>
          </Col>
        )
     })

     const showFilteredResults = (filters) => {

      let body = {    // contents별 새로고침 body
        skip : 0, 
        limit : Limit,
        filters: filters
    }

      getProducts(body)
      setSkip(0)

     }

     const handlePrice = (value) => {
       const data = price;
       let array = [];
       for (let key in data){
         if(data[key]._id === parseInt(value, 10)){ // 혹시나 string이 들어오면 int로 parsing함
          array = data[key].array; // array = [100,199]
        }
       }
       return array;
     }

     const handleFilters = (filters, category) => { // continents를 담고 있는 category.

      const newFilters = {...Filters}

      newFilters[category] = filters // continents array를 가리키고 있음

      console.log('filters', filters);


      // price를 처리할 때는 continents랑 다른 것을 해주어야함
      if(category === "price"){
        let priceValues = handlePrice(filters)
        newFilters[category] = priceValues
      }
      showFilteredResults(newFilters)
      setFilters(newFilters)
     }

     const updateSearchTerm = (newSearchTerm) => {
      //  console.log(newSearchTerm)
       let body = {
         skip : 0, // db에서 처음부터 긁어와야하기 때문임
         limit: Limit,
         filters: Filters,
         searchTerm: newSearchTerm
       }

       setSkip(0)
       setSearchTerm(newSearchTerm)
       getProducts(body)
     }


    return (
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Let's Travel Anyware!!!<Icon type="rocket" />
          </h2>
        </div>

        {/* Filter */}

        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            {/* CheckBox */}
            <CheckBox list={continents} handleFilters={(filters) => handleFilters(filters, "continents")} />
          </Col>

          <Col lg={12} xs={24}>
            {/* RadioBox */}
            {/* 처리한 내용을 부모로 전달해야하기 때문에 handleFilters가 여전히 필요함 */}
            <Radiobox list={price} handleFilters={(filters) => handleFilters(filters, "price")} />
          </Col>
        </Row>
        <br />

        {/* Search */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rm auto",
          }}
        >
          <SearchFreature
          refreshFunction ={updateSearchTerm} />
        </div>

        <br />

        {/* Cards */}

        <Row gutter={[16, 16]}>{renderCards}</Row>

        <br />

        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        )}
      </div>
    );
}

export default LandingPage
