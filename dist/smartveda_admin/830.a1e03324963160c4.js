"use strict";(self.webpackChunkAdmin_Panel=self.webpackChunkAdmin_Panel||[]).push([[830],{1830:(W,m,r)=>{r.r(m),r.d(m,{SettingRatingModule:()=>K});var u=r(9808),d=r(1083),f=r(574),v=r(4327),x=r(3583),T=r(2983),A=r.n(T),t=r(5e3),g=r(8966),h=r(7423);let _=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-lead-view"]],decls:10,vars:1,consts:[["mat-dialog-title",""],[1,"mat-typography"],["align","end"],["mat-button","",1,"dialog1","mr-2",3,"mat-dialog-close"],["mat-button","","mat-dialog-close","",1,"dialog2"]],template:function(i,n){1&i&&(t.TgZ(0,"h2",0),t._uU(1,"Delete Rating Criteria Detail"),t.qZA(),t.TgZ(2,"mat-dialog-content",1),t.TgZ(3,"h3"),t._uU(4,"Do you want to delete this Record?"),t.qZA(),t.qZA(),t.TgZ(5,"mat-dialog-actions",2),t.TgZ(6,"button",3),t._uU(7,"Yes"),t.qZA(),t.TgZ(8,"button",4),t._uU(9,"Cancel"),t.qZA(),t.qZA()),2&i&&(t.xp6(6),t.Q6J("mat-dialog-close",!0))},directives:[g.uh,g.xY,g.H8,h.lW,g.ZT],styles:["mat-dialog-content[_ngcontent-%COMP%]{width:600px}[_nghost-%COMP%]  .dialog1{background:#e41c1c;color:#fff;border-radius:5px;outline:none}.dialog2[_ngcontent-%COMP%]{color:#fff;background:#637381;border-radius:5px;outline:none}.mat-dialog-title[_ngcontent-%COMP%], .mat-dialog-content[_ngcontent-%COMP%]{text-align:center}.mat-dialog-actions[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),e})();var C=r(8550),y=r(7650),M=r(8441),P=r(2888),q=r(845),p=r(4851),R=r(9783),S=r(1424),F=r(4119);const O=["dt"];function D(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"div",12),t.TgZ(1,"div",13),t.TgZ(2,"div",14),t.NdJ("click",function(){t.CHM(i);const o=t.MAs(5);return t.oxw().applyFilterGlobal(o.value,"contains")}),t._UZ(3,"img",15),t.TgZ(4,"input",16,17),t.NdJ("input",function(o){return t.CHM(i),t.oxw().applyFilterGlobal(o,"contains")}),t.qZA(),t.qZA(),t.qZA(),t.TgZ(6,"div"),t.TgZ(7,"button",18),t.NdJ("click",function(){return t.CHM(i),t.oxw().exportPdf()}),t._UZ(8,"img",19),t.qZA(),t.TgZ(9,"button",20),t.NdJ("click",function(){return t.CHM(i),t.oxw().exportExcel()}),t._UZ(10,"img",21),t.qZA(),t.qZA(),t.qZA()}}function U(e,a){1&e&&(t.TgZ(0,"tr"),t.TgZ(1,"th",22),t._uU(2,"S.No."),t.qZA(),t.TgZ(3,"th",23),t._uU(4,"Rating Criteria "),t._UZ(5,"p-sortIcon",24),t.qZA(),t.TgZ(6,"th",25),t._uU(7,"Status "),t._UZ(8,"p-sortIcon",26),t.qZA(),t.TgZ(9,"th",22),t._uU(10,"Actions "),t.qZA(),t.qZA())}const b=function(){return["/ratesettings/ratingcriteriaform"]},w=function(e){return{id:e}};function k(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"tr"),t.TgZ(1,"td"),t.TgZ(2,"span",27),t._uU(3,"Sr.no"),t.qZA(),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t.TgZ(10,"div"),t.TgZ(11,"a",28),t._UZ(12,"img",29),t.qZA(),t.TgZ(13,"a",30),t.NdJ("click",function(){const s=t.CHM(i).$implicit;return t.oxw().openDialog(s)}),t._UZ(14,"img",31),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&e){const i=a.$implicit,n=a.rowIndex;t.xp6(4),t.hij(" ",n+1," "),t.xp6(2),t.Oqu(i.ratingCriteria),t.xp6(2),t.Oqu(i.status),t.xp6(4),t.Q6J("routerLink",t.DdM(5,b))("queryParams",t.VKq(6,w,null==i?null:i._id))}}function E(e,a){1&e&&(t.TgZ(0,"tr"),t.TgZ(1,"td",32),t._uU(2,"No Records to Show"),t.qZA(),t.qZA())}const J=function(){return["ratingCriteria","status"]};let L=(()=>{class e{constructor(i,n,o,s,c){this.ratingCriteriaService=i,this.toastr=n,this.ngxLoader=o,this.dialog=s,this.permissionService=c,this.sidebarSpacing="contracted",this.statusList=["Active","Inactive"],this.permissionService.getModulePermission().subscribe(V=>{this.accessPermission=V[0].RatingSetting,console.log(this.accessPermission),this.getCriteriaList()})}ngOnInit(){}onToggleSidebar(i){this.sidebarSpacing="open"===i?"contracted":"expanded"}getCriteriaList(){this.ratingCriteriaService.getCriteriaList().subscribe(i=>{this.ratingSettingData=i})}openDialog(i){this.dialog.open(_).afterClosed().subscribe(o=>{1==o&&this.deleteCriteriaDetail(i._id)})}deleteCriteriaDetail(i){this.ratingCriteriaService.deleteCriteriaDetails(i).subscribe(n=>{n&&(this.toastr.showSuccess("rating criteria deleted successfully","criteria deleted"),this.getCriteriaList())})}exportExcel(){const n={Sheets:{data:f.utils.json_to_sheet(this.ratingSettingData)},SheetNames:["data"]},o=f.write(n,{bookType:"xlsx",type:"array"});this.saveAsExcelFile(o,"ratingCriterias")}saveAsExcelFile(i,n){const c=new Blob([i],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});v.saveAs(c,n+"_export_"+(new Date).getTime()+".xlsx")}exportPdf(){this.ratingData=this.ratingSettingData.map((s,c)=>Object.assign({sno:c+1},s));const i=new x.jsPDF("l","pt"),n=this.ratingData;A()(i,{columns:[{title:"S No.",dataKey:"sno"},{title:"Rating Criteria",dataKey:"ratingCriteria"},{title:"Status",dataKey:"status"}],body:n}),i.save("Rating Criteria List.pdf")}applyFilterGlobal(i,n){this.dt.filterGlobal(i.target.value,n)}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(C.T),t.Y36(y.$),t.Y36(M.LA),t.Y36(g.uw),t.Y36(P.y))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-rating-criteria"]],viewQuery:function(i,n){if(1&i&&t.Gf(O,5),2&i){let o;t.iGM(o=t.CRH())&&(n.dt=o.first)}},decls:14,vars:11,consts:[[1,"container","page-heading"],[1,"row","mb-2","mt-2"],[1,"col-6"],[1,"col-6","text-right"],[1,"p-input-icon-right","ml-5"],["pButton","","type","button","label"," + Add Criteria",1,"add-button-rating",3,"routerLink","disabled"],["id","customerTable","responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","styleClass","p-datatable-striped",3,"columns","paginator","rows","showCurrentPageReport","value","responsive","globalFilterFields"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"d-flex","justify-content-between"],[1,"d-flex","align-items-center","p-0"],[1,"input-container",3,"click"],["src","../../../assets/images/search-white.svg",1,"input-container-img"],["pInputText","","type","text","placeholder","Search...",3,"input"],["search",""],["pButton","","type","button","pTooltip","Pdf","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/pdf.svg","alt","Button Image"],["pButton","","type","button","pTooltip","Excel","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/excel.svg","alt","Button Image"],[1,"text-center"],["pSortableColumn","ratingCriteria",1,"text-center"],["field","ratingCriteria"],["pSortableColumn","status",1,"text-center"],["field","status"],[1,"p-column-title"],["pTooltip","Edit Criteria","tooltipPosition","bottom",2,"margin-right","15px","cursor","pointer"],["src","../../../../assets/images/edit.svg","alt","img",3,"routerLink","queryParams"],["pTooltip","Delete Criteria","tooltipPosition","bottom","href","javascript:void(0);",1,"me-3","confirm-text",3,"click"],["src","../../../../assets/images/delete.svg","alt","img"],["colspan","12",1,"text-danger"]],template:function(i,n){1&i&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"h4"),t._uU(4,"Rating Criteria List"),t.qZA(),t.qZA(),t.TgZ(5,"div",3),t.TgZ(6,"span",4),t._UZ(7,"button",5),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(8,"p-table",6,7),t.YNc(10,D,11,0,"ng-template",8),t.YNc(11,U,11,0,"ng-template",9),t.YNc(12,k,15,8,"ng-template",10),t.YNc(13,E,3,0,"ng-template",11),t.qZA()),2&i&&(t.xp6(7),t.Q6J("routerLink",t.DdM(9,b))("disabled",!(null!=n.accessPermission&&n.accessPermission.add)),t.xp6(1),t.Q6J("columns",n.cols)("paginator",!0)("rows",10)("showCurrentPageReport",!0)("value",n.ratingSettingData)("responsive",!0)("globalFilterFields",t.DdM(10,J)))},directives:[q.Hq,d.rH,p.iA,R.jx,S.o,F.u,p.lQ,p.fz],styles:['[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button:before{content:"Filter";margin-right:10px}[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button{width:100px;height:40.5px;border-radius:3px;font-size:large;margin:1px 5px 1px 1px;padding:15px 20px;border:1px solid #ced4da}.page-heading[_ngcontent-%COMP%]{padding:0}.page-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;letter-spacing:1.2px;word-spacing:.1rem}.add-button-rating[_ngcontent-%COMP%]{background-color:#f52e2e;color:#fff;border:none}.add-button-rating[_ngcontent-%COMP%]:hover{background-color:#f08080;color:#fff;border:none}.custom-image[_ngcontent-%COMP%], .custom-image[_ngcontent-%COMP%]:hover{background:none;border:none}.input-container[_ngcontent-%COMP%]{position:relative;border:.5px solid rgba(145,158,171,.32)!important}.input-container-img[_ngcontent-%COMP%]{position:absolute;left:10px;top:50%;transform:translateY(-50%);width:20px;height:20px;cursor:pointer}.input-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{padding-left:30px;font-size:.875rem}.custom-image[_ngcontent-%COMP%]{background:none;border:none}[_nghost-%COMP%]  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight{background-color:#e41c1c;margin-bottom:10px;margin-top:10px;border-radius:5px}  .p-paginator{background:white!important;border:none!important}.head1[_ngcontent-%COMP%]{color:#000;text-align:center}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{border:none!important;border-bottom:1px solid #d7c6c6!important;background-color:#fff!important;color:#000!important;justify-content:center}  .edit-delete-button{background-color:#fff!important;border:none!important}  .p-datatable .p-datatable-header{background:white;border:none}[_nghost-%COMP%]  .p-datatable .p-sortable-column .p-sortable-column-icon{color:#848484}[_nghost-%COMP%]  .p-datatable .p-sortable-column.p-highlight:hover .p-sortable-column-icon{color:#848484}']}),e})();var l=r(3075),N=r(4036);function j(e,a){1&e&&(t.TgZ(0,"div",24),t._uU(1," Criteria name should be Albhabet only "),t.qZA())}function I(e,a){if(1&e&&(t.TgZ(0,"div"),t.TgZ(1,"div",22),t._uU(2," Criteria is required "),t.qZA(),t.YNc(3,j,2,0,"div",23),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("hidden",!i.criteriaForm.controls.ratingCriteria.errors.required),t.xp6(2),t.Q6J("ngIf",i.criteriaForm.controls.ratingCriteria.errors.pattern)}}function Y(e,a){if(1&e&&(t.TgZ(0,"div"),t.TgZ(1,"div",25),t._uU(2,"Status is required"),t.qZA(),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("hidden",!i.criteriaForm.controls.status.errors.required)}}const Z=function(){return["/ratesettings/ratingcriterialist"]},Q=[{path:"ratingcriterialist",component:L},{path:"ratingcriteriaform",component:(()=>{class e{constructor(i,n,o,s){this.ratingCriteriaService=i,this.fb=n,this.route=o,this.activatedRoute=s,this.sidebarSpacing="contracted",this.editMode=!1,this.statusList=["Active","Inactive"],this.criteriaForm=n.group({ratingCriteria:["",[l.kI.required,l.kI.pattern(/^[a-zA-Z\s]+$/)]],status:["",[l.kI.required]]}),this.activatedRoute.queryParamMap.subscribe(c=>{this.id=c.get("id"),this.id&&null!=this.id?(this.editMode=!0,this.title="Edit",this.getRatingCriteriaDetail()):(this.editMode=!1,this.title="Add")})}ngOnInit(){}onToggleSidebar(i){this.sidebarSpacing="open"===i?"contracted":"expanded"}submit(){let i={username:localStorage.getItem("email"),ratingCriteria:this.criteriaForm.controls.ratingCriteria.value,status:this.criteriaForm.controls.status.value};this.id?this.submitEditedDetails(i):this.submitDetails(i)}submitEditedDetails(i){let n=Object.assign({},i);this.ratingCriteriaService.submitEditedCriteriaDetail(n,this.id).subscribe(o=>{o&&this.route.navigate(["/ratesettings/ratingcriterialist"])})}submitDetails(i){let n=Object.assign({},i);this.ratingCriteriaService.submitCriteriaDetail(n).subscribe(o=>{o&&this.route.navigate(["/ratesettings/ratingcriterialist"])})}getRatingCriteriaDetail(){this.ratingCriteriaService.getCriteriaDetails(this.id).subscribe(i=>{console.log("----45-----\x3e",i),this.criteriaForm.patchValue({_id:i._id,ratingCriteria:i.ratingCriteria,status:i.status})})}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(C.T),t.Y36(l.qu),t.Y36(d.F0),t.Y36(d.gz))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-add-edit-rating-criteria"]],decls:36,vars:10,consts:[[1,"page-heading"],[1,"button-heading-container"],[1,"mb-2","p-1","back-button",3,"routerLink"],[1,"material-icons"],[1,"d-flex","justify-content-center"],[1,"card",2,"width","1150px","height","600px"],[1,"p-2"],[1,"card-body",2,"width","1100px"],[1,"mt-2","mb-3","ml-4"],[1,"d-flex","justify-content-center",3,"formGroup"],[1,"w-100"],[1,"row","mt-5"],[1,"form-group","col-12","d-flex","justify-content-center"],["for","criteriaName",1,"col-2","col-form-label","starlabel"],[1,"col-8"],["type","text","id","criteriaName","formControlName","ratingCriteria",1,"form-control"],[4,"ngIf"],["for","status",1,"col-2","col-form-label","starlabel"],["styleClass","statusDropdown","placeholder","Select status","formControlName","status",3,"options"],[1,"form-group","col-12","d-flex","justify-content-end",2,"padding-right","100px"],["type","submit",1,"btn","btn-info","mr-4",2,"background","rgb(228, 28, 28)","border","none",3,"disabled","click"],[1,"btn","btn-info",2,"background","#637381","border","none",3,"routerLink"],[2,"color","rgb(253, 122, 122)","font-size","small","font-style","italic",3,"hidden"],["style","\n                                        color: rgb(253, 122, 122);\n                                        font-size: small;\n                                        font-style: italic;\n                                      ",4,"ngIf"],[2,"color","rgb(253, 122, 122)","font-size","small","font-style","italic"],[2,"font-size","smaller","color","rgb(253, 122, 122)","font-style","italic",3,"hidden"]],template:function(i,n){1&i&&(t._UZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.TgZ(3,"i",3),t._uU(4,"arrow_back"),t.qZA(),t.qZA(),t.TgZ(5,"h5"),t._uU(6,"\xa0Criteria Details"),t.qZA(),t.qZA(),t.TgZ(7,"div",4),t.TgZ(8,"div",5),t.TgZ(9,"div",6),t.TgZ(10,"div",7),t.TgZ(11,"div",8),t.TgZ(12,"h3"),t._uU(13),t.qZA(),t.qZA(),t.TgZ(14,"form",9),t.TgZ(15,"div",10),t.TgZ(16,"div",11),t.TgZ(17,"div",12),t.TgZ(18,"label",13),t._uU(19,"Criteria"),t.qZA(),t.TgZ(20,"div",14),t._UZ(21,"input",15),t.YNc(22,I,4,2,"div",16),t.qZA(),t.qZA(),t.qZA(),t.TgZ(23,"div",11),t.TgZ(24,"div",12),t.TgZ(25,"label",17),t._uU(26,"Status"),t.qZA(),t.TgZ(27,"div",14),t._UZ(28,"p-dropdown",18),t.YNc(29,Y,3,1,"div",16),t.qZA(),t.qZA(),t.qZA(),t.TgZ(30,"div",11),t.TgZ(31,"div",19),t.TgZ(32,"button",20),t.NdJ("click",function(){return n.submit()}),t._uU(33,"Submit"),t.qZA(),t.TgZ(34,"button",21),t._uU(35,"Cancel"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&i&&(t.xp6(2),t.Q6J("routerLink",t.DdM(8,Z)),t.xp6(11),t.hij("",n.title," Rating Criteria"),t.xp6(1),t.Q6J("formGroup",n.criteriaForm),t.xp6(8),t.Q6J("ngIf",!n.criteriaForm.controls.ratingCriteria.valid&&(n.criteriaForm.controls.ratingCriteria.touched||n.criteriaForm.controls.ratingCriteria.dirty)),t.xp6(6),t.Q6J("options",n.statusList),t.xp6(1),t.Q6J("ngIf",!n.criteriaForm.controls.status.valid&&n.criteriaForm.controls.status.touched),t.xp6(3),t.Q6J("disabled",!n.criteriaForm.valid),t.xp6(2),t.Q6J("routerLink",t.DdM(9,Z)))},directives:[d.rH,l._Y,l.JL,l.sg,l.Fj,l.JJ,l.u,u.O5,N.Lt],styles:['[_nghost-%COMP%]  .statusDropdown{width:100%}[_nghost-%COMP%]  label.starlabel:after{content:"*";color:#e41c1c}  .p-dropdown{border:1px solid lightgray}.button-heading-container[_ngcontent-%COMP%]{display:flex;align-items:center}.back-button[_ngcontent-%COMP%]{background:#e41c1c;color:#fff;border:none;border-radius:5px;margin-left:10px;width:40px}  .back-button:hover{background-color:#f08080!important}  .p-dropdown .p-dropdown-label{background:white;color:#000}']}),e})()}];let z=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[u.ez,d.Bz.forChild(Q)]]}),e})();var B=r(529),H=r(6526),G=r(9224),X=r(9114),$=r(3407);let K=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[u.ez,B.m,H.q4,G.QW,p.U$,$.A,X.D,g.Is,h.ot,z]]}),e})()}}]);