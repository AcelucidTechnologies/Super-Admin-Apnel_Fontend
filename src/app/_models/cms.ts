export interface CATEGORY {
    id: number,
    name: string,
    image: File|any,
    hyperlink: string,
    position: string,
}

export interface SUB_CATEGORY {
    id: number,
    name: string,
    image: string,
    hyperlink: string,
   parent_category:PARENT_CATEGORY,
}
export interface PARENT_CATEGORY {
    id:string,
    name:string
}
export interface SPONSOR {
    id: number,
    name: string,
    email: string,
    phone: string,
    funding: string,
    address: ADDRESS,
}

export interface ADDRESS {
    city: string,
    street: string,
    landmark: string,
    state: string,
    zip: number,
    country: string
}

export interface BANNERSPECIAL {
    id: number,
    url: string,
    sortby: string,
    image: File|any,
    description: string,

}

export interface FEATURE {
    id: number,
    image: File|any,
    productName: string,
    modal: string,
    price: string,
    quantity: string
}

export interface SPECIALOFFER {
    id: number,
    image: File|any,
    product: string,
    category: string,

}

export interface PAGE {
    id: number,
    url: string
    page: string,
    description: string,
}

export interface Admin{
  id: string,
  sortby: number,
  url: string,
  description: string,
  image: File|any,
}


export interface USER_BANNER_LIST{
   _id: string,
   username:string,
   bannerName:string,
   bannerDescription:string,
   bannerOrder:string,
   image:string,
}
