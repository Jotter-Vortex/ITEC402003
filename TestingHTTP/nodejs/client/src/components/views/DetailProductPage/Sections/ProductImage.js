import React, {useState, useEffect} from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        if(props.detail.images && props.detail.images.length > 0){
            let images = []
            props.detail.images.map(item =>{
                // 서버에 올릴때는 여기 부분을 바꿔야함
                images.push({
                    original:`http://changjinboondang.iptime.org:5000/${item}`,
                    thumbnail: `http://changjinboondang.iptime.org:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])
    // 이 배열에 props.detail을 안넣으면 이미지를 안 가져옴.
    // props.detail이 바뀔 때마다 한 번씩 더 실행시켜줘라 라는 의미임.
  return (
    <div>
        <ImageGallery items={Images} />
    </div>
  )
}

export default ProductImage