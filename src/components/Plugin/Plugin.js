import React from 'react'
import './Plugin.css'
import { connect } from 'react-redux'

const Plugin = ({plugin}) => {




    const pluginVersion = plugin ? `Версия плагина: ${plugin}` : 'Плагин не доступен'

    return (
        <React.Fragment>
            <h2>Проверка плагина</h2>
        <div className="Plugin">
            {pluginVersion}
        </div>
        </React.Fragment>
    )
}



const mapStateToProps = (state) => {
    return {
        plugin: state.plugin
    }
}

export default connect(mapStateToProps)(Plugin)