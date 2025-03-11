import { BTN_VARIANTS, Button, Image, Text } from '@components/index'
import useRefferal from '@hooks/use-refferal'
import React from 'react'
import GitImage from '@pngs/gift.png'
import styles from './refer-earn.module.scss'
import useModal from '@hooks/use-modal'

const ReferEarn = () => {
    const { hideModal } = useModal();
    const { sendInvitattion } = useRefferal()
    
    return (
        <div className={styles.root}>
            <Image src={GitImage} className={styles.gift} />
            <Text text={'refer_earn'} className={styles.title} />
            <Text text={'refer_earn_desc'} forceHTML={true} className={styles.subtitle} />
            <Button onClick={sendInvitattion} className={styles.btn}>
                <Text text={'refer'} className={styles.text} />
            </Button>
            <Button variant={BTN_VARIANTS.SECONDARY} onClick={hideModal} className={styles.btn}>
                <Text text={'cancel'} className={styles.text} />    
            </Button>
        </div>
    )
}

export default ReferEarn
