import React, {Component} from 'react';
import './App.css';
import { CryptoPro } from 'ruscryptojs';


class App extends Component {

    cryptopro = new CryptoPro();

    state = {
        plugin: '',
        listCert: [],
        certInfo: {},
        certID: '',
        data: '',
        sign: ''
    }


    initPlugin = async () => {
        await this.cryptopro.init()
            .then((info) => {
                console.log('Initialized', info);
                this.setState({
                    plugin: info.version
                })
            })
        await this.cryptopro.listCertificates()
            .then((list) => {
                console.log(list)
                this.setState({
                    listCert: list
                })
            })
    }

    componentDidMount() {
        this.initPlugin()
    }

    onSign = (idCert) => {

        console.log(idCert)

        const str64 = btoa(this.state.data)

        this.cryptopro.signData(str64, idCert).then((signStr) => {
            this.setState({
                sign: signStr
            })
        })


    }

    onChangeData = (e) => {
        this.setState({
            data: e.target.value
        })
    }


    onCert = (idCert) => {
        this.cryptopro.certificateInfo(idCert).then((info) => {

            //Кому выдан сертификат
            console.log(info.SubjectName)

            //Кем выдан сертификат
            console.log(info.IssuerName)

            //Срок действия сертификата с .. по ..
            console.log(`действет с ${info.ValidFromDate} по ${info.ValidToDate}`)

            this.setState({
                certInfo: info,
                certID: idCert
            })

        })
    }


    render() {

    const {plugin, listCert, certInfo, certID, sign} = this.state
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

export default App;


