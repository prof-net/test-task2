import React from 'react'
import './Sign.css'
import { connect } from 'react-redux'

const Sign = ({sign}) => {
    return (
        <React.Fragment>
            <h2>Подпись</h2>
            <div className="Signature">
                <textarea rows="10" cols="80" name="text" defaultValue={sign}></textarea>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        sign: state.sign
    }
}

export default connect(mapStateToProps)(Sign)