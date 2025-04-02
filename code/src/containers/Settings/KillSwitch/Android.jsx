import Card, { CARD_VARIANTS } from '@components/Card';
import RightArrowIcon from "@svgs/right-arrow-icon.svg";
import styles from './android.module.scss';
import React from 'react'
import { Image, Text } from '@components/index';
import settingsServices from '@services/settings.services';

const Android = () => {
    return (
        <div className={styles.root}>
            <Card
                variant={CARD_VARIANTS.SECONDARY}
                onClick={async () => { await settingsServices.openSettings() }}
                className={`${styles.card} my-4 px-14`}
            >
                <section className={styles.left}>
                    <Text text={"open_settings"} className="fs-14 fw-5 ml-8" />
                </section>
                <section className={styles.right}>
                    <Image src={RightArrowIcon} height={"14px"} />
                </section>
            </Card>

            <section className={styles.content}>
                <section className={styles.top}>
                    <Text text={'how_to_enable_kill_switch'} className={`fs-18 fw-5 ${styles.title}`} />
                    <section className={styles.points}>
                        <Text text={'how_to_enable_kill_switch_point_1'} className={`fs-13 fw-4 ${styles.point}`} />
                        <Text text={'how_to_enable_kill_switch_point_2'} className={`fs-13 fw-4 ${styles.point}`} />
                        <Text text={'how_to_enable_kill_switch_point_3'} className={`fs-13 fw-4 ${styles.point}`} />
                    </section>
                </section>
                 <section className={styles.top}>
                    <Text text={'how_to_enable_kill_switch_note'} forceHTML={true} className={`text-9cabc9 fs-13 fw-5 ${styles.title}`} />
                    <section className={styles.points}>
                        <Text text={'how_to_enable_kill_switch_note_point_1'} forceHTML={true} className={`text-9cabc9 fs-12 fw-4 ${styles.point}`} />
                        <Text text={'how_to_enable_kill_switch_note_point_2'} forceHTML={true} className={`text-9cabc9 fs-12 fw-4 ${styles.point}`} />
                    </section>
                </section>
            </section>
        </div>
    )
}

export default Android
