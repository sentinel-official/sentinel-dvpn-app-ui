import React from 'react'
import PropTypes from 'prop-types'
import styles from './tunnel-app.module.scss'

const TunnelApp = ({ app = {} , isTunnelling= false}) => {
  return (
      <div className={styles.root}>
      
    </div>
  )
}

TunnelApp.propTypes = {
    app: PropTypes.object,
    isTunnelling: PropTypes.bool 
}

export default TunnelApp
