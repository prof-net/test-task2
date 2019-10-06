import React from 'react'
import './CertInfo.css'
import { connect } from 'react-redux'

const CertInfo = ({certInfo}) => {



    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    return (
        <React.Fragment>
            <h2>Данные по сертификату</h2>
            <div className="Certificate">
                <p>кому выдан: {certInfo.SubjectName}</p>
                <p>Кем выдан: {certInfo.IssuerName}</p>
                <p>{`действет с ${formatDate(certInfo.ValidFromDate)} по ${formatDate(certInfo.ValidToDate)}`}</p>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        certInfo: state.certInfo
    }
}

export default connect(mapStateToProps)(CertInfo)