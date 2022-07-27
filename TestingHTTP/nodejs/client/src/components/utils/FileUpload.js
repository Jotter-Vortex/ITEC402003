import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';
// import { response } from 'express'

function FileUpload(props) {

    const [Images, setImages] = useState([]) // uploadproductpage에서 해당 정보를 가지고 있어야함.

    const dropHandler = (files) => {

        let formData = new FormData(); // 파일을 전송할 때 같이 보내줘야함.
        const config = {
            header: {'content-type': 'multipart/fomr-data'} // 백엔드에서 리퀘스트를 받을때 에러가 없이 하는것
        }
        formData.append("file",files[0])

        axios.post('/api/product/image', formData , config)
            .then(response => { // response 안에 정보가 들어있음
                if (response.data.success){
                    // console.log(response.data)
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])
                }
                else{
                    alert("파일을 저장하는데 실패했습니다.")
                }
            })


    }

    const deleteHandler = (image) =>{
        const currentIndex = Images.indexOf(image)

        //console.log(currentIndex) // 배열의 인덱스를 print 해봄

        let newImages = [...Images]
        newImages.splice(currentIndex,1) // currentIndex에서부터 n 개의 요소를 삭제함. 인덱스까지도 바꿔주니까 매우 편함
        setImages(newImages)
        props.refreshFunction(newImages)

    }



  return (
      <div style = {{display:'flex', justifyContent: 'space-between'}}>
          <Dropzone onDrop={dropHandler}>
              {({ getRootProps, getInputProps }) => (
                      <div
                            style ={{
                                width:300, height:240, border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                       {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Icon type="plus" style={{fontSize: '3rem'}}></Icon>
                      </div>
              )}
          </Dropzone>

          <div style = {{display:'flex', width:'350px', height: '240px', overflowX:'scroll'}}>
              {Images.map((image,index) => (
                  <div onClick={()=> deleteHandler(image)} key={index}>
                      <img style={{minWidth:'300px', width: '300px', height: '240px'}}
                    //   서버에 올릴 때는 이 부분을 바꿔줘야 함
                      src = {`http://changjinboondang.iptime.org:5000/${image}`}
                      />
                  </div>
              ))}



          </div>



    </div>
  )
}

export default FileUpload