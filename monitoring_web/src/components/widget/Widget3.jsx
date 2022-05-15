import "./Widget3.scss";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Widget3= () => {

  return (
    <div className="widget3">
      <div className="top">
        <h1 className="title">Notice</h1>
      </div>
      <hr />
      <div className="bottom">
          <h2 className="content">
            <span>Nothing to Check!</span>
          </h2>
        <div className="Vchart">
        </div>
        {/* <p className="title">Total</p>
        <p className="title">Total</p> */}
      </div>
    </div>
  )
}


export default Widget3