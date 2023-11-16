export async function getCustomer( customerId ){
    try {
        const response = await fetch( `http://localhost:3000/api/v1/customer/getCustomer`,{
            method : 'POST',
            body : JSON.stringify( { customerId } ),
            headers : {
                'Content-Type' : 'application/json'
            },
            credentials : "include"
        })
        
        const data = await response.json();
        if( data.success ){
            return data.customerDoc;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error , "get customer handler");
        return null;
    }
}

export async function getAllCustomer(){
    try {
        const response = await fetch( `http://localhost:3000/api/v1/customer/getAllCustomers`,{
            method : 'GET',
            credentials : "include"
        })
        
        const data = await response.json();
        if( data.success ){
            return data.allCustomersDoc;
        }else{
            toast.error(data.message)
            return false;
        }
    } catch (error) {
        console.log(error , "create customer handler");
        return null;
    }
}