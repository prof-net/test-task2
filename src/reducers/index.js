

const initialState = {
    plugin: '',
    listCert: [],
    certInfo: {},
    certID: '',
    data: '',
    sign: ''
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'IS_PLUGIN':
            return {...state, plugin: action.payload}
        case 'GET_LIST_CERT':
            return {...state, listCert: action.payload}
        case 'GET_CERT_INFO':
            return {...state, certInfo: action.certInfo, certID: action.certID}
        case 'SET_DATA':
            return {...state, data: action.payload}
        case 'ON_SIGN':
            return {...state, sign: action.payload}


        default:
            return state
    }


}

export default reducer