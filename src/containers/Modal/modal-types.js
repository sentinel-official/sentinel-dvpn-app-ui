import DNSModal from "./DNSModal";
import FiltersModal from "./FiltersModal";
import NoBalanceModal from "./NoBalanceModal";
import RenewSubscriptionModal from "./RenewSubscriptionModal";

const types = {
  "no-balance": NoBalanceModal,
  "renew-subscription": RenewSubscriptionModal,
  filters: FiltersModal,
  dns: DNSModal,
};

export const MODAL_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

export default types;
