import React, {Component} from 'react';
import './App.css';
import { CryptoPro } from 'ruscryptojs';
import { connect } from 'react-redux'
import {
    isPlugin,
    getListCert,
    getCertInfo,
    onSign} from './../../actions/index'
import Plugin from './../Plugin/Plugin'
import Certs from './../Certs/Certs'
import CertInfo from './../CertInfo/CertInfo'
import Data from './../Data/Data'
import Sign from './../Sign/Sign'

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

    onSign = (idCert, text) => {

        const str64 = btoa(encodeURI(text))
        this.cryptopro.signData(str64, idCert).then((signStr) => {
            this.props.onSign(signStr)
        })
    }

    onCert = (idCert) => {
        this.cryptopro.certificateInfo(idCert).then((info) => {
            this.props.getCertInfo(info, idCert)
        })
    }

    render() {


        const isCert = this.props.certID ? <CertInfo/> : null

        return (
        <div className="App">
          <Plugin/>
          <Certs onCert={(idCert)=>this.onCert(idCert)} />
            { isCert }
          <Data onSign={(certID)=>this.onSign(certID)}/>
          <Sign/>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        certID: state.certID
    }
}

const mapDispatchToProps = {
    isPlugin,
    getListCert,
    getCertInfo,

    onSign
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


