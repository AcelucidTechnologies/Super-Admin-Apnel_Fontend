import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AssetDialogComponent } from './asset-dialog/asset-dialog.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';


@NgModule({
  declarations: [
    AssetDialogComponent,
    AddAssetComponent,
    AssetListComponent,
    EditAssetComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    MatDividerModule,
  ]
})
export class AssetModule { }
