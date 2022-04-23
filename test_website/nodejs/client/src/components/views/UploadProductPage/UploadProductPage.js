import React, { useState } from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Item from 'antd/lib/list/Item';
import Axios from 'axios';

const {TextArea} = Input;

const continents=[
    { key:1, value: "Africa" },
    { key:2, value: "Europe" },
    { key:3, value: "Asia" },
    { key:4, value: "North America" },
    { key:5, value: "South America" },
    { key:6, value: "Australia" },
    { key:7, value: "Antarctica" }
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler =(event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentsChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    
    const submitHandler = (event) =>{
        event.preventDefault(); // 확인 버튼을 누를때 자동적으로 페이지가 refresh되는 것을 막음.

        if (!Title || !Description || !Price || !Continent || !Images ){
            return alert('모든 값을 넣어주셔야 합니다.')
        }

        // 서버에 채운 값들을 request로 보낸다.

        const body = {
            // 로그인 된 사람의 ID를 가져와야함.
            writer: props.user.userData._id,
            title: Title,
            description : Description,
            price : Price,
            images : Images,
            continents : continents

        }

        Axios.post("/api/product", body) // 서버쪽에서 이것과 관련된 route를 만들어줘야함. server/routes/product.js 
            .then(response => {
                if(response.data.success){
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                }
                else{
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
    }
    
  return (
    <div>
        <div style={{maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <h2> 여행 상품 업로드</h2>
            </div>
            <Form onSubmitCapture={submitHandler}>
                {/* Dropzone */}
                {/* FileUpload.js 에서 props로 받는다. 왜냐? FileUpload.js에서 사진에 대한 정보를 다 가지고 있는데 
                서버에 업로드할때는 결국 지금 파일에서 다 모았다가 모든 정보를 보내야하기 때문임. */}
                {/* 파일 데이터를 uploadFile 컴포넌트에서 부모 컴포넌트로 업데이트 하기. */}
                <FileUpload refreshFunction={updateImages}></FileUpload> 
                <br>
                </br>
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격($)</label>
                <Input type ="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={continentsChangeHandler} value={Continent}>
                    {continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                {/* antd에서 button properties를 참고하자. */}
                <Button type="primary" htmlType = "submit">
                    확인
                </Button>


            </Form>
        </div>
    </div>
  )
}

export default UploadProductPage