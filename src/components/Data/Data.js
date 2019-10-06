import React, {Component} from 'react'
import './Data.css'
import { connect } from 'react-redux'


class Data extends Component{

    state = {
        text: '',
        textLimit: false
    }

    onChangeData = (e) => {
        if (this.state.text.length < 2001) {
            this.setState(
                {
                    text: e.target.value.slice(0, 2000) ,
                    textLimit: false
                }
            )
        } else {
            this.setState(
                {
                    textLimit: true
                }
            )
        }



    }

    render() {

        const {onSign, certID} = this.props


        const massage = this.state.textLimit ?  <span>Текст не должен привышать 2000 символов</span> : null

        return (
            <React.Fragment>
                <h2>Данные для подписи</h2>
                <div className="Data">

                    {massage}

                    <textarea rows="10" cols="80" name="text" onChange={this.onChangeData} value={this.state.text}></textarea>
                </div>

                <button onClick={()=>onSign(certID, this.state.text)}>Подписать</button>
            </React.Fragment>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        certID: state.certID
    }
}



export default connect(mapStateToProps)(Data)