export let str = '';
const getShippingOrBillingContainer = (className?: string) => {
    str = className || '';   
    return str
}

export default getShippingOrBillingContainer;
