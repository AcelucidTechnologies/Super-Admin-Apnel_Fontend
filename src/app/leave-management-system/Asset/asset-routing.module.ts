import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AssetDialogComponent } from './asset-dialog/asset-dialog.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';

const routes: Routes = [
  {
    path:'asset-list', component: AssetListComponent
  },
  {
    path:'asset-delete', component: AssetDialogComponent
  },
  {
    path:'add-asset', component: AddAssetComponent
  },
  {
    path:'edit-asset', component: EditAssetComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
