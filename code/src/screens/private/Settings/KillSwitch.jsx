import styles from './kill-switch.module.scss'
import Android from '@containers/Settings/KillSwitch/Android'
import IOS from '@containers/Settings/KillSwitch/IOS'
import { getMobileOS } from '@helpers/getOSType'
import { CHANGE_LIST_TITLE } from '@reducers/loader.reducer'
import React from 'react'
import { useDispatch } from 'react-redux'

const KillSwitch = () => {
  const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch(
        CHANGE_LIST_TITLE({
          title: "kill_switch",
          canGoBack: true,
        })
      );
    }, []);
  return (
    <div className={styles.root}>
      {getMobileOS() === 'ios' ? <IOS/> : <Android/>}
    </div>
  )
}

export default KillSwitch
