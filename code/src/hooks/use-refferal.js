import refferalServices from '@services/refferal.services'
import { useAuthSelector, useRefferrerSelector } from './use-selector';
import useModal from './use-modal';
import useAlerts, { ALERT_TYPES } from './use-alerts';
import { useDispatch } from 'react-redux';
import { UPDATE_REFFERRED_BY } from '@reducers/referral.reducer';

const useRefferal = () => {
    const { walletAddress } = useAuthSelector();
    const { referredBy } = useRefferrerSelector()
    const { hideModal } = useModal();
    const showAlert = useAlerts()
    const dispatch = useDispatch()

    const sendInvitattion = async () => {
        try {
            await refferalServices.sendInvitattion(walletAddress);
        } catch (error) {
            showAlert({ type: ALERT_TYPES.error, message: 'Error while creating Invitation link', data: { error: JSON.stringify(error) } })
        } finally {
            hideModal();
        }
    }

    const fetchRefferalAddress = async () => {
        try {
            const response = await refferalServices.fetchRefferalAddress();
            dispatch(UPDATE_REFFERRED_BY(response.value))
        } catch (error) {
            console.log(error)
        }
    }

    return { sendInvitattion, fetchRefferalAddress }
}

export default useRefferal