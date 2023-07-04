import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { products } from '../DummyData/product';
import { categories } from '../DummyData/product-category';
// import { category, product } from '../_models/catalog'

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) { }

    getProductList(): Observable<any[]> {
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem('email')
      let httpOptions = new HttpHeaders().set('x-access-token', token)
     const endpointUrl = `${environment.JSON_SERVER}/products?username=${email}`;
     return this.http.get<any[]>(endpointUrl ,{ 'headers': httpOptions });

    }
    getProductById(id: string) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.BASE_URL}/products?id=${id}`;
        return this.http.get<any>(endpointUrl, { 'headers': httpOptions });

    }
    // addProduct(productData: any) {
    //     const token = localStorage.getItem('token') || '';
    //     let httpOptions = new HttpHeaders().set('x-access-token', token)
    //     const endpointUrl = `${environment.JSON_SERVER}/product`;
    //     return this.http.post<any>(endpointUrl, categoryData, { 'headers': httpOptions });
    //     productData.id = products.length + 1
    //     products.push(productData);
    //     return of(productData)
    // }

    addProduct(payload: any): Observable<any[]> {
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem('email') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token);
      const formData = new FormData();
      formData.append('username', email);
      formData.append('image', payload.image);
      formData.append('productName', payload.productName);
      formData.append('categoryName', payload.categoryName);
      formData.append('model', payload.model);
      formData.append('ourPrice', payload.ourPrice);
      formData.append('marketPrice', payload.marketPrice);
      const endpointUrl = `${environment.JSON_SERVER}/createProducts`;
      return this.http.post<any>(endpointUrl, formData, { headers: httpOptions });
    }

    editProduct(productData, id) {
        const formData = new FormData()
        formData.append("Data", JSON.stringify(productData))
        productData.image = "";
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.BASE_URL}/products?id=${id}`;
        return this.http.put(endpointUrl, formData, { 'headers': httpOptions });
    }


    deleteProduct(id) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/products?id=${id}`;
        return this.http.delete<any>(endpointUrl, { 'headers': httpOptions });
    }



    // ############################# categpory apis #############################
    getCategoryList() {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.BASE_URL}/categories`;
        return this.http.get<any[]>(endpointUrl, { 'headers': httpOptions });
    }

    getCategoryById(id: string): Observable<any> {
      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      const endpointUrl = `${environment.JSON_SERVER}/categories?id=${id}`;
      return this.http.get<any>(endpointUrl,{ 'headers': httpOptions });
    }

    editCategory(payload, id: string) {
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem('email') || '';
      const httpOptions = new HttpHeaders().set('x-access-token', token);
      const formData = new FormData();
      formData.append('username', email);
      formData.append('image', payload.image);
      formData.append('categoryName', payload.categoryName);
      formData.append('subCategory', payload.subCategory);
      formData.append('status', payload.status);
      formData.append('categoryOrder', payload.categoryOrder);
      const endpointUrl = `${environment.JSON_SERVER}/updateCategories?id=${id}`;

      return this.http.put<any>(endpointUrl, formData, { headers: httpOptions });
    }

    addCategory(payload: any): Observable<any[]> {
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem('email') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token);
      const formData = new FormData();
      formData.append('username', email);
      formData.append('image', payload.image);
      formData.append('categoryName', payload.categoryName);
      formData.append('subCategory', payload.subCategory);
      formData.append('status', payload.status);
      formData.append('categoryOrder', payload.categoryOrder);
      const endpointUrl = `${environment.JSON_SERVER}/createCategory`;
      return this.http.post<any>(endpointUrl, formData, { headers: httpOptions });
    }
    deleteCategory(id: number) {
        const token = localStorage.getItem('token') || '';
        let httpOptions = new HttpHeaders().set('x-access-token', token)
        const endpointUrl = `${environment.JSON_SERVER}/category/${id}`;
        //return this.http.delete<CATEGORY>(endpointUrl, { 'headers': httpOptions });
        let indexObj = categories.findIndex((item) => item.id == id)
        categories.splice(categories.findIndex((index) => index.id == id), 1);
        return of(categories[indexObj])
    }




    // ############################# create order apis #############################

    createMobileStatus(payload:any): Observable<any[]> {
      const token = localStorage.getItem('token') || '';
            const email = localStorage.getItem('email') || '';
            let httpOptions = new HttpHeaders().set('x-access-token', token)
              const endpointUrl = `${environment.JSON_SERVER}/createOrder`;
            return this.http.post<any>(endpointUrl, payload,{ 'headers': httpOptions });
    }



    // ############################# product options #############################
    getproductOptionList(): Observable<any[]> {
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem('email')
      let httpOptions = new HttpHeaders().set('x-access-token', token)
     const endpointUrl = `${environment.JSON_SERVER}/getProductOption?username=${email}`;
     return this.http.get<any[]>(endpointUrl ,{ 'headers': httpOptions });

    }

    deleteproductOption(id: string) {
      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      const endpointUrl = `${environment.JSON_SERVER}/deleteProductOption?id=${id}`;
      return this.http.delete<any>(endpointUrl, { 'headers': httpOptions });
    }
    getproductOptionById(id: string): Observable<any> {
      const token = localStorage.getItem('token') || '';
      let httpOptions = new HttpHeaders().set('x-access-token', token)
      const endpointUrl = `${environment.JSON_SERVER}/getProductOptionById?id=${id}`;
      return this.http.get<any>(endpointUrl,{ 'headers': httpOptions });
    }
    editproductOptionList(payload, id: string) {
      const token = localStorage.getItem('token') || '';
      const httpOptions = new HttpHeaders().set('x-access-token', token);
      const endpointUrl = `${environment.JSON_SERVER}/updateProductOption?id=${id}`;

      return this.http.put<any>(endpointUrl, payload, { headers: httpOptions });
    }

    createproductOption(payload:any): Observable<any[]> {
      const token = localStorage.getItem('token') || '';
            const email = localStorage.getItem('email') || '';
            let httpOptions = new HttpHeaders().set('x-access-token', token)
              const endpointUrl = `${environment.JSON_SERVER}/createProductOption`;
            return this.http.post<any>(endpointUrl, payload,{ 'headers': httpOptions });
    }

}
