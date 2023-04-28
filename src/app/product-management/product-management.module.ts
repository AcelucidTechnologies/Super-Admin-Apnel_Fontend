import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { DialogComponent } from './dialog/dialog.component'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DialogProductSubmitComponent } from './dialog-product-submit/dialog-product-submit.component';
import { ProductOptionListComponent } from './product-option-list/product-option-list.component';
import { AddProductOptionComponent } from './add-product-option/add-product-option.component';

@NgModule({
  declarations: [
    ProductListComponent,
    AddEditProductComponent,
    CategoryListComponent,
    AddEditCategoryComponent,
    DialogComponent,
    EditCategoryComponent,
    DialogProductSubmitComponent,
    ProductOptionListComponent,
    AddProductOptionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProductManagementRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,

  ]
})
export class ProductManagementModule { }
