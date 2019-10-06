
const isPlugin = (plugin) => {
    return {
        type: 'IS_PLUGIN',
        payload: plugin
    }
}
const getListCert = (list) => {
    return {
        type: 'GET_LIST_CERT',
        payload: list
    }
}
const getCertInfo = (certInfo, certId) => {
    return {
        type: 'GET_CERT_INFO',
        certInfo: certInfo,
        certID: certId
    }
}
const setData = (data) => {
    return {
        type: 'SET_DATA',
        payload: data
    }
}

const onSign = (signData) => {
    return {
        type: 'ON_SIGN',
        payload: signData
    }
}
export {
    isPlugin,
    getListCert,
    getCertInfo,
    setData,
    onSign

}