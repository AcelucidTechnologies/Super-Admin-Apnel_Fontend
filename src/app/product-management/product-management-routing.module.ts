import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { AddProductOptionComponent } from './add-product-option/add-product-option.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ProductListComponent } from './product-list/product-list.component'
import { ProductOptionListComponent } from './product-option-list/product-option-list.component';

const routes: Routes = [
  {
    path: 'editProduct', component: AddEditProductComponent
  },
  {
    path: 'addProduct', component: AddEditProductComponent
  },
  {
    path: 'productlist', component: ProductListComponent
  },
  {
    path: 'categorylist', component: CategoryListComponent
  },
  {
    path: 'editcategory', component: EditCategoryComponent
  },
  {
    path: 'addcategory', component: AddEditCategoryComponent
  },
  {
    path: 'productOptionList', component: ProductOptionListComponent
  },
  {
    path: 'addProductOptionList', component: AddProductOptionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
