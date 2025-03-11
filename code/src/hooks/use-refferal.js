import refferalServices from '@services/refferal.services'
import { useAuthSelector } from './use-selector';

const useRefferal = () => {
  const { walletAddress } = useAuthSelector();

    const sendInvitattion = async () => {
        try {
            const response = await refferalServices.sendInvitattion(walletAddress);
            
        } catch (error) {
    console.log(error)
            
        }
    }

    const fetchRefferalAddress = async() => {
try {
            const response = await refferalServices.fetchRefferalAddress();

} catch (error) {
    console.log(error)
}    }

    return {sendInvitattion, fetchRefferalAddress}
}

export default useRefferal