import React from 'react'
import './Certs.css'
import { connect } from 'react-redux'



const Certs = ({listCert, onCert}) => {

    const certs = listCert.map((cert) => {

        return (
            <option key={cert.id} value="s1" onClick={()=>onCert(cert.id)}>{cert.name}</option>
        )
    })


    return (
        <React.Fragment>
            <h2>Сертификаты</h2>
            <div className="ListCertificate">
            <select name="select" size="3" multiple>
                {certs}
            </select>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        listCert: state.listCert
    }
}



export default connect(mapStateToProps)(Certs)