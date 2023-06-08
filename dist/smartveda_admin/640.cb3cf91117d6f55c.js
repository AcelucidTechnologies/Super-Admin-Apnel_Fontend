"use strict";(self.webpackChunkAdmin_Panel=self.webpackChunkAdmin_Panel||[]).push([[640],{2640:(re,h,r)=>{r.r(h),r.d(h,{ReviewModule:()=>ie});var p=r(9808),_=r(529),d=r(1083),f=r(574),q=r(4327),C=r(3583),R=r(2983),S=r.n(R),e=r(5e3),c=r(8966),Z=r(7423);let U=(()=>{class i{constructor(){}ngOnInit(){}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-lead-view"]],decls:10,vars:1,consts:[["mat-dialog-title",""],[1,"mat-typography"],["align","end"],["mat-button","",1,"dialog1","mr-2",3,"mat-dialog-close"],["mat-button","","mat-dialog-close","",1,"dialog2"]],template:function(t,o){1&t&&(e.TgZ(0,"h2",0),e._uU(1,"Delete Review Details"),e.qZA(),e.TgZ(2,"mat-dialog-content",1),e.TgZ(3,"h3"),e._uU(4,"Do you want to delete this Record?"),e.qZA(),e.qZA(),e.TgZ(5,"mat-dialog-actions",2),e.TgZ(6,"button",3),e._uU(7,"Yes"),e.qZA(),e.TgZ(8,"button",4),e._uU(9,"Cancel"),e.qZA(),e.qZA()),2&t&&(e.xp6(6),e.Q6J("mat-dialog-close",!0))},directives:[c.uh,c.xY,c.H8,Z.lW,c.ZT],styles:["mat-dialog-content[_ngcontent-%COMP%]{width:600px}[_nghost-%COMP%]  .dialog1{background:#e41c1c;color:#fff;border-radius:5px;outline:none}.dialog2[_ngcontent-%COMP%]{color:#fff;background:#637381;border-radius:5px;outline:none}.mat-dialog-title[_ngcontent-%COMP%], .mat-dialog-content[_ngcontent-%COMP%]{text-align:center}.mat-dialog-actions[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),i})();var g=r(3744),b=r(7650),w=r(8441),y=r(2888),F=r(845),m=r(4851),L=r(9783),P=r(1424),I=r(4119);const M=["dt"];function k(i,n){if(1&i){const t=e.EpF();e.TgZ(0,"div",12),e.TgZ(1,"div",13),e.TgZ(2,"div",14),e._UZ(3,"img",15),e.TgZ(4,"input",16,17),e.NdJ("input",function(a){return e.CHM(t),e.oxw().applyFilterGlobal(a,"contains")}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(6,"div"),e.TgZ(7,"button",18),e.NdJ("click",function(){return e.CHM(t),e.oxw().exportPdf()}),e._UZ(8,"img",19),e.qZA(),e.TgZ(9,"button",20),e.NdJ("click",function(){return e.CHM(t),e.oxw().exportExcel()}),e._UZ(10,"img",21),e.qZA(),e.qZA(),e.qZA()}}function J(i,n){1&i&&(e.TgZ(0,"tr"),e.TgZ(1,"th"),e.TgZ(2,"div",22),e._uU(3," S.No. "),e.qZA(),e.qZA(),e.TgZ(4,"th",23),e.TgZ(5,"div",22),e._uU(6," Review Subject "),e._UZ(7,"p-sortIcon",24),e.qZA(),e.qZA(),e.TgZ(8,"th",25),e.TgZ(9,"div",22),e._uU(10," Publishing Site Url "),e._UZ(11,"p-sortIcon",26),e.qZA(),e.qZA(),e.TgZ(12,"th",27),e.TgZ(13,"div",22),e._uU(14," Rating "),e._UZ(15,"p-sortIcon",28),e.qZA(),e.qZA(),e.TgZ(16,"th",29),e.TgZ(17,"div",22),e._uU(18," Status "),e._UZ(19,"p-sortIcon",30),e.qZA(),e.qZA(),e.TgZ(20,"th",31),e._uU(21,"Actions"),e.qZA(),e.qZA())}const O=function(){return["/review/editreview"]},Y=function(i){return{id:i}};function D(i,n){if(1&i){const t=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td"),e.TgZ(2,"span",32),e._uU(3,"Sr.no"),e.qZA(),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA(),e.TgZ(11,"td"),e._uU(12),e.qZA(),e.TgZ(13,"td"),e.TgZ(14,"a",33),e._UZ(15,"img",34),e.qZA(),e.TgZ(16,"a",35),e.NdJ("click",function(){const l=e.CHM(t).$implicit;return e.oxw().openDialog(l)}),e._UZ(17,"img",36),e.qZA(),e.qZA(),e.qZA()}if(2&i){const t=n.$implicit,o=n.rowIndex;e.xp6(4),e.hij(" ",o+1," "),e.xp6(2),e.Oqu(t.reviewSubject),e.xp6(2),e.Oqu(t.publishingSiteUrl),e.xp6(2),e.Oqu(t.ratingCountReview),e.xp6(2),e.Oqu(t.status),e.xp6(3),e.Q6J("routerLink",e.DdM(7,O))("queryParams",e.VKq(8,Y,t._id))}}function j(i,n){1&i&&(e.TgZ(0,"tr"),e.TgZ(1,"td",37),e._uU(2,"No records to show"),e.qZA(),e.qZA())}const N=function(){return["/review/addreview"]},Q=function(){return["reviewSubject","status","ratingCountReview"]};let E=(()=>{class i{constructor(t,o,a,l,u){this.reviewsService=t,this.toastr=o,this.ngxLoader=a,this.dialog=l,this.permissionService=u,this.sidebarSpacing="contracted",this.statusList=["Active","Inactive"],this.permissionService.getModulePermission().subscribe(v=>{this.accessPermission=v[0].RatingList,console.log(this.accessPermission),this.getReviewList()})}ngOnInit(){this.cols=[{field:"reviewSubject",headers:"Review Subject"},{field:"publishingSiteUrl",headers:"publishing Site Url"},{field:"rating",headers:"Rating"},{field:"status",headers:"Status"}],this.exportColumns=this.cols.map(t=>({title:t.headers,dataKey:t.field}))}onToggleSidebar(t){this.sidebarSpacing="open"===t?"contracted":"expanded"}getReviewList(){this.reviewsService.getReviewList().subscribe(t=>{this.reviewListValue=t,console.log("55",this.reviewListValue)})}exportExcel(){const o={Sheets:{data:f.utils.json_to_sheet(this.reviewListValue)},SheetNames:["data"]},a=f.write(o,{bookType:"xlsx",type:"array"});this.saveAsExcelFile(a,"reviews")}saveAsExcelFile(t,o){const u=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});q.saveAs(u,o+"_export_"+(new Date).getTime()+".xlsx")}exportPdf(){this.reviewDetails=this.reviewListValue;const t=new C.jsPDF("l","pt");S()(t,{columns:this.exportColumns,body:this.reviewDetails}),t.save("reviews.pdf")}openDialog(t){this.dialog.open(U).afterClosed().subscribe(a=>{1==a&&this.deleteReviewDetails(t._id)})}deleteReviewDetails(t){this.ngxLoader.start(),this.reviewsService.deleteReviewDetails(t).subscribe(o=>{o&&(this.toastr.showSuccess("Review deleted successfully","Review deleted"),this.getReviewList())})}applyFilterGlobal(t,o){this.dt.filterGlobal(t.target.value,o)}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(g.Y),e.Y36(b.$),e.Y36(w.LA),e.Y36(c.uw),e.Y36(y.y))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-review-list"]],viewQuery:function(t,o){if(1&t&&e.Gf(M,5),2&t){let a;e.iGM(a=e.CRH())&&(o.dt=a.first)}},decls:14,vars:10,consts:[[1,"container","page-heading"],[1,"row","mb-2","mt-2"],[1,"col-6"],[1,"col-6","text-right"],[1,"p-input-icon-right","ml-5"],["pButton","","type","button","label"," + Add Review",1,"add-button-review",3,"routerLink"],["id","reviewTable","responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","styleClass","p-datatable-striped",3,"columns","paginator","rows","showCurrentPageReport","value","responsive","globalFilterFields"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"d-flex","justify-content-between"],[1,"d-flex","align-items-center","p-0"],[1,"input-container"],["src","../../../assets/images/search-white.svg",1,"input-container-img"],["pInputText","","type","text","placeholder","Search...",3,"input"],["search",""],["pButton","","type","button","pTooltip","Pdf","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/pdf.svg","alt","Button Image"],["pButton","","type","button","pTooltip","Excel","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/excel.svg","alt","Button Image"],[1,"flex","justify-content-between","align-items-center","head1"],["pSortableColumn","reviewSubject"],["field","reviewSubject"],["pSortableColumn","publishingSiteUrl"],["field","publishingSiteUrl"],["pSortableColumn","ratingCountReview"],["field","ratingCountReview"],["pSortableColumn","status"],["field","status"],[1,"text-center"],[1,"p-column-title"],["pTooltip","Edit Review","tooltipPosition","bottom",2,"margin-right","15px","cursor","pointer"],["src","../../../../assets/images/edit.svg","alt","img",3,"routerLink","queryParams"],["pTooltip","Delete Review","tooltipPosition","bottom","href","javascript:void(0);",1,"me-3","confirm-text",3,"click"],["src","../../../../assets/images/delete.svg","alt","img"],["colspan","12",1,"text-center","text-danger"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"h4"),e._uU(4,"Review List"),e.qZA(),e.qZA(),e.TgZ(5,"div",3),e.TgZ(6,"span",4),e._UZ(7,"button",5),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(8,"p-table",6,7),e.YNc(10,k,11,0,"ng-template",8),e.YNc(11,J,22,0,"ng-template",9),e.YNc(12,D,18,10,"ng-template",10),e.YNc(13,j,3,0,"ng-template",11),e.qZA()),2&t&&(e.xp6(7),e.Q6J("routerLink",e.DdM(8,N)),e.xp6(1),e.Q6J("columns",o.cols)("paginator",!0)("rows",10)("showCurrentPageReport",!0)("value",o.reviewListValue)("responsive",!0)("globalFilterFields",e.DdM(9,Q)))},directives:[F.Hq,d.rH,m.iA,L.jx,P.o,I.u,m.lQ,m.fz],styles:['[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button:before{content:"Filter";margin-right:10px}[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button{width:100px;height:40.5px;border-radius:3px;font-size:large;margin:1px 5px 1px 1px;padding:15px 20px;border:1px solid #ced4da}.add-button-review[_ngcontent-%COMP%]{background-color:#f52e2e;color:#fff;border:none}.add-button-review[_ngcontent-%COMP%]:hover{background-color:#f08080;color:#fff;border:none}.input-container[_ngcontent-%COMP%]{position:relative;border:.5px solid rgba(145,158,171,.32)!important}.input-container-img[_ngcontent-%COMP%]{position:absolute;left:10px;top:50%;transform:translateY(-50%);width:20px;height:20px;cursor:pointer}.input-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{padding-left:30px;font-size:.875rem}.custom-image[_ngcontent-%COMP%]{background:none;border:none}[_nghost-%COMP%]  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight{background-color:#e41c1c;margin-bottom:10px;margin-top:10px;border-radius:5px}  .p-paginator{background:white!important;border:none!important}.head1[_ngcontent-%COMP%]{color:#000;text-align:center}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{border:none!important;border-bottom:1px solid #d7c6c6!important;background-color:#fff!important;color:#000!important;justify-content:center}  .edit-delete-button{background-color:#fff!important;border:none!important}  .p-datatable .p-datatable-header{background:white;border:none}.custom-image[_ngcontent-%COMP%], .custom-image[_ngcontent-%COMP%]:hover{background:none;border:none}']}),i})();var s=r(3075),x=r(4036);function B(i,n){1&i&&(e.TgZ(0,"div",25),e._uU(1," Please enter valid Url "),e.qZA())}function z(i,n){if(1&i&&(e.TgZ(0,"div"),e.TgZ(1,"div",23),e._uU(2," Url is required "),e.qZA(),e.YNc(3,B,2,0,"div",24),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.reviewForm.controls.publishSiteUrl.errors.required),e.xp6(2),e.Q6J("ngIf",t.reviewForm.controls.publishSiteUrl.errors.pattern)}}function H(i,n){if(1&i&&(e.TgZ(0,"div"),e.TgZ(1,"div",26),e._uU(2,"ReferenceId is required "),e.qZA(),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.reviewForm.controls.referenceId.errors.required)}}function G(i,n){if(1&i&&(e.TgZ(0,"div"),e.TgZ(1,"div",26),e._uU(2,"Status is required"),e.qZA(),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.reviewForm.controls.reviewStatus.errors.required)}}const T=function(){return["/review/reviewlist"]};function X(i,n){if(1&i&&(e.TgZ(0,"div"),e.TgZ(1,"div",24),e._uU(2,"URL is required"),e.qZA(),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.editForm.controls.publishingSiteUrl.errors.required)}}function $(i,n){if(1&i&&(e.TgZ(0,"div"),e.TgZ(1,"div",24),e._uU(2,"ReferenceId is required"),e.qZA(),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.editForm.controls.referenceId.errors.required)}}function K(i,n){if(1&i&&(e.TgZ(0,"div"),e.TgZ(1,"div",24),e._uU(2,"Status is required"),e.qZA(),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.editForm.controls.status.errors.required)}}const A=function(){return["/review/reviewlist"]},W=[{path:"reviewlist",component:E},{path:"addreview",component:(()=>{class i{constructor(t,o,a){this.fb=t,this.reviewService=o,this.route=a,this.sidebarSpacing="contracted",this.statusList=["Active","Inactive"],this.reviewForm=this.fb.group({publishSiteUrl:["",[s.kI.required,s.kI.pattern("^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$")]],referenceId:["",[s.kI.required]],reviewStatus:["",[s.kI.required]]})}ngOnInit(){}submitForm(){this.payload={username:localStorage.getItem("email"),reviewSubject:this.reviewForm.controls.referenceId.value,publishingSiteUrl:this.reviewForm.controls.publishSiteUrl.value,rating:"4",status:this.reviewForm.controls.reviewStatus.value},this.reviewService.submitReviewDetail(this.payload).subscribe(t=>{t&&this.route.navigate(["/review/reviewlist"])})}onToggleSidebar(t){this.sidebarSpacing="open"===t?"contracted":"expanded"}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(s.qu),e.Y36(g.Y),e.Y36(d.F0))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-add-review"]],decls:42,vars:10,consts:[[2,"overflow-y","auto","height","700px","margin-bottom","100px"],[1,"page-heading"],[1,"button-heading-container"],[1,"mb-2","p-1","back-button",3,"routerLink"],[1,"material-icons"],[1,"d-flex","justify-content-center"],[1,"card",2,"width","1000px","height","520px"],[1,"card-body",2,"width","800px","margin","auto"],[1,"p-5"],[1,"mt-2","mb-5"],[3,"formGroup"],[1,"form-row","mt-5"],[1,"col-3"],["for","siteUrl",1,"text-center","starlabel","mb-4"],[1,"col-9"],["type","text","id","siteUrl","formControlName","publishSiteUrl","placeholder","enter publishing url",1,"form-control"],[4,"ngIf"],["for","reference",1,"text-center","starlabel","mb-4"],["type","text","id","reference","formControlName","referenceId","placeholder","enter refrence id",1,"form-control"],["styleClass","statusDropdown","placeholder","Select status","formControlName","reviewStatus",3,"options"],[1,"d-flex","justify-content-end","mt-4","mb-4"],["type","submit",1,"btn","btn-info","mr-3",2,"background","rgb(228, 28, 28)","border","none",3,"disabled","click"],[1,"btn","btn-info",2,"background","#637381","border","none",3,"routerLink"],[2,"color","rgb(253, 122, 122)","font-size","small","font-style","italic",3,"hidden"],["style","\n                    color: rgb(253, 122, 122);\n                    font-size: small;\n                    font-style: italic;\n                  ",4,"ngIf"],[2,"color","rgb(253, 122, 122)","font-size","small","font-style","italic"],[2,"font-size","smaller","color","rgb(253, 122, 122)","font-style","italic",3,"hidden"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e._UZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"button",3),e.TgZ(4,"i",4),e._uU(5,"arrow_back"),e.qZA(),e.qZA(),e.TgZ(6,"h5"),e._uU(7,"\xa0Review Details"),e.qZA(),e.qZA(),e.TgZ(8,"div",5),e.TgZ(9,"div",6),e.TgZ(10,"div",7),e.TgZ(11,"div",8),e.TgZ(12,"div",9),e.TgZ(13,"h4"),e._uU(14,"Add Reviews"),e.qZA(),e.qZA(),e.TgZ(15,"form",10),e.TgZ(16,"div",11),e.TgZ(17,"div",12),e.TgZ(18,"label",13),e._uU(19,"Publishing Site Url"),e.qZA(),e.qZA(),e.TgZ(20,"div",14),e._UZ(21,"input",15),e.YNc(22,z,4,2,"div",16),e.qZA(),e.qZA(),e.TgZ(23,"div",11),e.TgZ(24,"div",12),e.TgZ(25,"label",17),e._uU(26,"Reference Id"),e.qZA(),e.qZA(),e.TgZ(27,"div",14),e._UZ(28,"input",18),e.YNc(29,H,3,1,"div",16),e.qZA(),e.qZA(),e.TgZ(30,"div",11),e.TgZ(31,"div",12),e.TgZ(32,"label",17),e._uU(33,"Status"),e.qZA(),e.qZA(),e.TgZ(34,"div",14),e._UZ(35,"p-dropdown",19),e.YNc(36,G,3,1,"div",16),e.qZA(),e.qZA(),e.TgZ(37,"div",20),e.TgZ(38,"button",21),e.NdJ("click",function(){return o.submitForm()}),e._uU(39,"Submit"),e.qZA(),e.TgZ(40,"button",22),e._uU(41,"Cancel"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(3),e.Q6J("routerLink",e.DdM(8,T)),e.xp6(12),e.Q6J("formGroup",o.reviewForm),e.xp6(7),e.Q6J("ngIf",!o.reviewForm.controls.publishSiteUrl.valid&&(o.reviewForm.controls.publishSiteUrl.touched||o.reviewForm.controls.publishSiteUrl.dirty)),e.xp6(7),e.Q6J("ngIf",!o.reviewForm.controls.referenceId.valid&&o.reviewForm.controls.referenceId.touched),e.xp6(6),e.Q6J("options",o.statusList),e.xp6(1),e.Q6J("ngIf",!o.reviewForm.controls.reviewStatus.valid&&o.reviewForm.controls.reviewStatus.touched),e.xp6(2),e.Q6J("disabled",!o.reviewForm.valid),e.xp6(2),e.Q6J("routerLink",e.DdM(9,T)))},directives:[d.rH,s._Y,s.JL,s.sg,s.Fj,s.JJ,s.u,p.O5,x.Lt],styles:['[_nghost-%COMP%]  .statusDropdown{width:100%}[_nghost-%COMP%]  label.starlabel:after{content:"*";color:#e41c1c}[_nghost-%COMP%]  .contentBody{height:500px}.button-heading-container[_ngcontent-%COMP%]{display:flex;align-items:center}.back-button[_ngcontent-%COMP%]{background:#e41c1c;color:#fff;border:none;border-radius:5px;margin-left:80px;width:40px}  .back-button:hover{background-color:#f08080!important}  .p-dropdown{border:1px solid lightgray}']}),i})()},{path:"editreview",component:(()=>{class i{constructor(t,o,a,l,u,v,oe){this.fb=t,this.reviewService=o,this.route=a,this.activatedRoute=l,this.reviewsService=u,this.ngxLoader=v,this.toastr=oe,this.sidebarSpacing="contracted",this.reviewList=["Friend","Family","Business Trip"],this.statusList=["Active","Inactive"],this.editMode=!1,this.activatedRoute.queryParamMap.subscribe(ne=>{this.id=ne.get("id"),this.id&&null!=this.id?(this.editMode=!0,this.title="Edit Review",this.update="Update"):this.editMode=!1}),this.editForm=this.fb.group({rating:[""],publishingSiteUrl:["",[s.kI.required]],referenceId:["",[s.kI.required]],status:["",[s.kI.required]],username:[""]})}ngOnInit(){this.getReviewListById()}submit(){this.editForm.patchValue({username:localStorage.getItem("email")||""}),this.payload={username:this.editForm.controls.username.value,reviewSubject:this.editForm.controls.referenceId.value,publishingSiteUrl:this.editForm.controls.publishingSiteUrl.value,rating:this.editForm.controls.rating.value,status:this.editForm.controls.status.value},this.ngxLoader.start(),this.editMode&&this.editReviews(),this.route.navigate(["/review/reviewlist"])}editReviews(){this.reviewsService.editReviewList(this.payload,this.id).subscribe(t=>{t&&(this.toastr.showSuccess("Review list edit successfully","Reviews edit"),this.ngxLoader.stop(),this.route.navigate(["/review/reviewlist"]))})}onToggleSidebar(t){this.sidebarSpacing="open"===t?"contracted":"expanded"}getReviewListById(){this.reviewsService.getReviewDetailById(this.id).subscribe(t=>{this.review=t,console.log("review list by id ===>"+JSON.stringify(t)),this.editForm.patchValue({rating:t.ratingCountReview,publishingSiteUrl:t.publishingSiteUrl,referenceId:t.reviewSubject,status:t.status})})}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(s.qu),e.Y36(g.Y),e.Y36(d.F0),e.Y36(d.gz),e.Y36(g.Y),e.Y36(w.LA),e.Y36(b.$))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-edit-review"]],decls:41,vars:10,consts:[[2,"height","700px","margin-bottom","100px"],[1,"button-heading-container"],[1,"mb-2","p-1","back-button",3,"routerLink"],[1,"material-icons"],[1,"d-flex","justify-content-center"],[1,"card",2,"width","1000px","height","650px"],[1,"card-body"],[1,"p-5"],[1,"mt-2","mb-5"],[3,"formGroup"],[1,"row","mb-4"],[1,"form-group","col-6"],["for","rating",1,"mb-4"],["readonly","","type","text","id","rating","formControlName","rating",1,"form-control"],["for","reviewPage",1,"starlabel","mb-4"],["type","text","id","reviewPage","formControlName","publishingSiteUrl",1,"form-control"],[4,"ngIf"],["for","reference",1,"starlabel","mb-4"],["type","text","id","reference","formControlName","referenceId",1,"form-control"],["for","status",1,"starlabel","mb-4"],["id","status","styleClass","reviewDropdown","placeholder","Select","formControlName","status",3,"options"],[1,"d-flex","justify-content-end","mt-4"],["type","submit",1,"btn","btn-info","mr-3",2,"background","rgb(228, 28, 28)","border","none",3,"disabled","click"],[1,"btn","btn-info",2,"background","#637381","border","none","margin-right","20px",3,"routerLink"],[2,"font-size","smaller","color","rgb(253, 122, 122)","font-style","italic",3,"hidden"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"button",2),e.TgZ(3,"i",3),e._uU(4,"arrow_back"),e.qZA(),e.qZA(),e.TgZ(5,"h5"),e._uU(6,"\xa0Review Details"),e.qZA(),e.qZA(),e.TgZ(7,"div",4),e.TgZ(8,"div",5),e.TgZ(9,"div",6),e.TgZ(10,"div",7),e.TgZ(11,"div",8),e.TgZ(12,"h4"),e._uU(13,"Edit Reviews"),e.qZA(),e.qZA(),e.TgZ(14,"form",9),e.TgZ(15,"div",10),e.TgZ(16,"div",11),e.TgZ(17,"label",12),e._uU(18,"Rating"),e.qZA(),e._UZ(19,"input",13),e.qZA(),e.TgZ(20,"div",11),e.TgZ(21,"label",14),e._uU(22,"Publishing Site Url "),e.qZA(),e._UZ(23,"input",15),e.YNc(24,X,3,1,"div",16),e.qZA(),e.qZA(),e.TgZ(25,"div",10),e.TgZ(26,"div",11),e.TgZ(27,"label",17),e._uU(28,"Reference Id"),e.qZA(),e._UZ(29,"input",18),e.YNc(30,$,3,1,"div",16),e.qZA(),e.TgZ(31,"div",11),e.TgZ(32,"label",19),e._uU(33,"Status"),e.qZA(),e._UZ(34,"p-dropdown",20),e.YNc(35,K,3,1,"div",16),e.qZA(),e.qZA(),e.TgZ(36,"div",21),e.TgZ(37,"button",22),e.NdJ("click",function(){return o.submit()}),e._uU(38,"Update"),e.qZA(),e.TgZ(39,"button",23),e._uU(40,"Cancel"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(2),e.Q6J("routerLink",e.DdM(8,A)),e.xp6(12),e.Q6J("formGroup",o.editForm),e.xp6(10),e.Q6J("ngIf",!o.editForm.controls.publishingSiteUrl.valid&&o.editForm.controls.publishingSiteUrl.touched),e.xp6(6),e.Q6J("ngIf",!o.editForm.controls.referenceId.valid&&o.editForm.controls.referenceId.touched),e.xp6(4),e.Q6J("options",o.statusList),e.xp6(1),e.Q6J("ngIf",!o.editForm.controls.status.valid&&o.editForm.controls.status.touched),e.xp6(2),e.Q6J("disabled",!o.editForm.valid),e.xp6(2),e.Q6J("routerLink",e.DdM(9,A)))},directives:[d.rH,s._Y,s.JL,s.sg,s.Fj,s.JJ,s.u,p.O5,x.Lt],styles:['[_nghost-%COMP%]  .reviewDropdown{width:100%}[_nghost-%COMP%]  label.starlabel:after{content:"*";color:#e41c1c}.button-heading-container[_ngcontent-%COMP%]{display:flex;align-items:center}.back-button[_ngcontent-%COMP%]{background:#e41c1c;color:#fff;border:none;border-radius:5px;margin-left:80px;width:40px}  .back-button:hover{background-color:#f08080!important}']}),i})()}];let ee=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[p.ez,d.Bz.forChild(W)]]}),i})();var te=r(6526);let ie=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[p.ez,_.m,ee,te.q4,c.Is,Z.ot]]}),i})()}}]);