import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { menuItems, storeMenuItems } from "@/core/data";
import useAddress from '../../customer/hooks/useAddress';
import AddressCard from '../../customer/components/AddressCard';
import AddAddress from '../../customer/pages/AddAddress';

export default function CheckoutPage (){
    const { addresses, loading, error, showAddressForm, toggleAddressForm } = useAddress();

    if (loading) {
        return <div>Loading addresses...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header menuItems={storeMenuItems} />
            <h1>Checkout Page</h1>
            <button onClick={toggleAddressForm}>
                {showAddressForm ? 'Show Address List' : 'Add New Address'}
            </button>

            {showAddressForm ? (
                <AddAddress />
            ) : (
                <div>
                    {addresses.length === 0 ? (
                        <div>No addresses found.</div>
                    ) : (
                        addresses.map((address) => (
                            <AddressCard key={address.id} address={address} />
                        ))
                    )}
                </div>
            )}
            <Footer menuItems={menuItems} />
        </>
    );
};
