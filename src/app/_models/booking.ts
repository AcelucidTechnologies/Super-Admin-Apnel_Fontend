export interface BOOKING {
        id : number,
        customerName: string,
        cratedAt: string,
        totalAmount: string,
        status: string,  
        lastLogin: string,
        discount: string,
        payment: string,
        shipping: string,
        voucher: string,
        tax: string,
        shippingLocation: string,
        category: string,
        price: string,
        total: string 
        email:string,
        contactNo: string,
        country: string,
        state: string,
        city: string,
        ZipCode: string,
        address: string,
        landmark: string
}

export interface PRODUCTS {
        id : number,
        product: string,
        quantitys: string,
        prices: string,
        subTotal: string,
        category: string
}