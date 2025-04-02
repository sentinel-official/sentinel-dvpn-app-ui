import styles from './ios.module.scss';
import { Card, CARD_VARIANTS, Text, ToggleSwitch } from '@components/index'
import { TOGGLE_KILL_SWITCH } from '@reducers/settings.reducer'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const IOS = () => {
  const dispatch = useDispatch()
  const {killSwitch} = useSelector(state=>state.settings)
  return (
    <div className={styles.root}>
      <Card className={`px-8 ${styles.card}`} variant={CARD_VARIANTS.SECONDARY}>
        <Text className="fs-14 fw-5" text={'kill_switch'}/>
        <ToggleSwitch checked={killSwitch} onClick={()=>dispatch(TOGGLE_KILL_SWITCH(!killSwitch))} />
      </Card>
      <Text className={`text-9cabc9 fs-13`} text={'Please Enable to block internet access when VPN disconnects.'}/>
    </div>
  )
}

export default IOS
