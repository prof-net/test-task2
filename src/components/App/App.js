import React, {Component} from 'react';
import './App.css';
import { CryptoPro } from 'ruscryptojs';
import { connect } from 'react-redux'
import {
    isPlugin,
    getListCert,
    getCertInfo,
    setData,
    onSign} from './../../actions/index'


class App extends Component {

    cryptopro = new CryptoPro();
    initPlugin = async () => {
        await this.cryptopro.init()
            .then((info) => {

                this.props.isPlugin(info.version)

            })
        await this.cryptopro.listCertificates()
            .then((list) => {
               this.props.getListCert(list)
            })
    }

    componentDidMount() {
        this.initPlugin()
    }

    onSign = (idCert) => {
        const str64 = btoa(encodeURI(this.props.data))
        this.cryptopro.signData(str64, idCert).then((signStr) => {
            this.props.onSign(signStr)
        })
    }

    onChangeData = (e) => {
        this.props.setData(e.target.value)
    }


    onCert = (idCert) => {
        this.cryptopro.certificateInfo(idCert).then((info) => {

            this.props.getCertInfo(info, idCert)

        })
    }

    render() {

    const {plugin, listCert, certInfo, certID, sign } = this.props

    const pluginVersion = plugin ? `Версия плагина: ${plugin}` : 'Плагин не доступен'

    const certs = listCert.map((cert) => {

        return (
            <option key={cert.id} value="s1" onClick={()=>this.onCert(cert.id)}>{cert.name}</option>
        )
    })

    return (
        <div>
          <h2>Проверка плагина</h2>
          <div className="Plugin">
              {pluginVersion}
          </div>

          <h2>Сертификаты</h2>
          <div className="ListCertificate">
              <select name="select" size="3" multiple>
                  {certs}
              </select>
          </div>

          <h2>Данные по сертификату</h2>
          <div className="Certificate">
              <p>кому выдан: {certInfo.SubjectName}</p>
              <p>Кем выдан: {certInfo.IssuerName}</p>
              <p>{`действет с ${certInfo.ValidFromDate} по ${certInfo.ValidToDate}`}</p>
          </div>


          <h2>Данные для подписи</h2>
          <div className="Data">
              <textarea rows="10" cols="45" name="text" onChange={this.onChangeData}></textarea>
          </div>

          <button onClick={()=>this.onSign(certID)}>Подписать</button>

          <h2>Подпись</h2>
          <div className="Signature">
              <textarea rows="10" cols="45" name="text" defaultValue={sign}></textarea>
          </div>

        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        plugin: state.plugin,
        listCert: state.listCert,
        certInfo: state.certInfo,
        certID: state.certID,
        data: state.data,
        sign: state.sign
    }
}

const mapDispatchToProps = {
    isPlugin,
    getListCert,
    getCertInfo,
    setData,
    onSign
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


