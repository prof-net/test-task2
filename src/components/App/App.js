import React, {Component} from 'react';
import './App.css';
import { CryptoPro } from 'ruscryptojs';


class App extends Component {

    cryptopro = new CryptoPro();

    state = {
        plugin: ''
    }


    componentDidMount() {
        this.cryptopro.init()
            .then((info) => {
                console.log('Initialized', info);
                this.setState({
                    plugin: info.version
            })
        })

        if (this.state.plugin) {
            this.listCertificates()
                .then( (listCert) => {
                        console.log(listCert)
                })

        }

    }





    render() {

    const {plugin} = this.state
    const pluginVersion = plugin ? `Версия плагина: ${plugin}` : 'Плагин не доступен'




    return (
        <div>
          <h2>Проверка плагина</h2>
          <div className="Plugin">
              {pluginVersion}
          </div>

          <h2>Сертификаты</h2>
          <div className="ListCertificate">
              <select name="select" size="3" multiple>
                  <option value="s1">Пункт 111111111111</option>
                  <option value="s2">Пункт 2111111111111</option>
              </select>
          </div>

          <h2>Данные по сертификату</h2>
          <div className="Certificate">

          </div>


          <h2>Данные для подписи</h2>
          <div className="Data">

          </div>
          <button>Подписать</button>

          <h2>Подпись</h2>
          <div className="Signature">

          </div>


        </div>
    );
  }
}

export default App;


