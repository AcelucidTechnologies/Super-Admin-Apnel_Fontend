"use strict";(self.webpackChunkAdmin_Panel=self.webpackChunkAdmin_Panel||[]).push([[147],{6147:(tt,b,r)=>{r.r(b),r.d(b,{SettingRatingModule:()=>K});var C=r(9808),m=r(1083),Z=r(574),S=r(4327),_=r(3583),y=r(2983),M=r.n(y),t=r(5e3),p=r(8966),v=r(7423);let P=(()=>{class i{constructor(){}ngOnInit(){}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-lead-view"]],decls:10,vars:1,consts:[["mat-dialog-title",""],[1,"mat-typography"],["align","end"],["mat-button","",1,"dialog1","mr-2",3,"mat-dialog-close"],["mat-button","","mat-dialog-close","",1,"dialog2"]],template:function(e,n){1&e&&(t.TgZ(0,"h2",0),t._uU(1,"Delete Rating Criteria Detail"),t.qZA(),t.TgZ(2,"mat-dialog-content",1),t.TgZ(3,"h3"),t._uU(4,"Do you want to delete this Record?"),t.qZA(),t.qZA(),t.TgZ(5,"mat-dialog-actions",2),t.TgZ(6,"button",3),t._uU(7,"Yes"),t.qZA(),t.TgZ(8,"button",4),t._uU(9,"Cancel"),t.qZA(),t.qZA()),2&e&&(t.xp6(6),t.Q6J("mat-dialog-close",!0))},directives:[p.uh,p.xY,p.H8,v.lW,p.ZT],styles:["mat-dialog-content[_ngcontent-%COMP%]{width:600px}[_nghost-%COMP%]  .dialog1{background:#e41c1c;color:#fff;border-radius:5px;outline:none}.dialog2[_ngcontent-%COMP%]{color:#fff;background:#637381;border-radius:5px;outline:none}.mat-dialog-title[_ngcontent-%COMP%], .mat-dialog-content[_ngcontent-%COMP%]{text-align:center}.mat-dialog-actions[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),i})();var u=r(520),h=(r(2340),r(9646));const l=[{sno:1,ratingCriteria:"Food Quality",status:"Active"},{sno:2,ratingCriteria:"Cleaniness",status:"Active"},{sno:3,ratingCriteria:"Ambiance",status:"Inactive"},{sno:4,ratingCriteria:"Staff",status:"Inactive"}];let x=(()=>{class i{constructor(e){this.http=e}getCriteriaList(){const e=localStorage.getItem("token")||"";return(new u.WM).set("x-access-token",e),(0,h.of)(l)}getCriteriaDetails(e){const n=localStorage.getItem("token")||"";(new u.WM).set("x-access-token",n),console.log(l);let g=l.filter(d=>d.sno==e);return(0,h.of)(g)}submitCriteriaDetail(e){const n=localStorage.getItem("token")||"";return(new u.WM).set("x-access-token",n),e.sno=l.length+1,l.push(e),console.log(l),(0,h.of)(l)}submitEditedCriteriaDetail(e,n){const o=localStorage.getItem("token")||"";return(new u.WM).set("x-access-token",o),l.map(d=>{d.sno==n&&(d.ratingCriteria=e.ratingCriteria,d.status=e.status)}),(0,h.of)(l)}deleteCriteriaDetails(e){const n=localStorage.getItem("token")||"";(new u.WM).set("x-access-token",n);let g=l.splice(l.findIndex(d=>d.ratingCriteria==e),1);return(0,h.of)(g)}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(u.eN))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var q=r(2888),O=r(845),T=r(4851),D=r(9783),k=r(1424),F=r(4119);const E=["dt"];function U(i,a){if(1&i){const e=t.EpF();t.TgZ(0,"div",12),t.TgZ(1,"div",13),t._UZ(2,"img",14),t.TgZ(3,"div",15),t.NdJ("click",function(){t.CHM(e);const o=t.MAs(6);return t.oxw().applyFilterGlobal(o.value,"contains")}),t._UZ(4,"img",16),t.TgZ(5,"input",17,18),t.NdJ("input",function(o){return t.CHM(e),t.oxw().applyFilterGlobal(o,"contains")}),t.qZA(),t.qZA(),t.qZA(),t.TgZ(7,"div"),t.TgZ(8,"button",19),t.NdJ("click",function(){return t.CHM(e),t.oxw().exportPdf()}),t._UZ(9,"img",20),t.qZA(),t.TgZ(10,"button",21),t.NdJ("click",function(){return t.CHM(e),t.oxw().exportExcel()}),t._UZ(11,"img",22),t.qZA(),t.TgZ(12,"button",23),t._UZ(13,"img",24),t.qZA(),t.qZA(),t.qZA()}}function w(i,a){1&i&&(t.TgZ(0,"tr"),t.TgZ(1,"th",25),t._uU(2,"Rating Criteria"),t.qZA(),t.TgZ(3,"th",25),t._uU(4,"Status"),t.qZA(),t.TgZ(5,"th",25),t._uU(6,"Actions"),t.qZA(),t.qZA())}const A=function(){return["/ratesettings/ratingcriteriaform"]},N=function(i){return{serialno:i}};function J(i,a){if(1&i){const e=t.EpF();t.TgZ(0,"tr"),t.TgZ(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t.TgZ(6,"div"),t.TgZ(7,"a",26),t._UZ(8,"img",27),t.qZA(),t.TgZ(9,"a",28),t.NdJ("click",function(){const s=t.CHM(e).$implicit;return t.oxw().openDialog(s.ratingCriteria)}),t._UZ(10,"img",29),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&i){const e=a.$implicit;t.xp6(2),t.Oqu(e.ratingCriteria),t.xp6(2),t.Oqu(e.status),t.xp6(4),t.Q6J("routerLink",t.DdM(4,A))("queryParams",t.VKq(5,N,e.sno))}}function I(i,a){1&i&&(t.TgZ(0,"tr"),t.TgZ(1,"td",30),t._uU(2,"No Records to Show"),t.qZA(),t.qZA())}const L=function(){return["ratingCriteria"]};let j=(()=>{class i{constructor(e,n,o){this.ratingCriteriaService=e,this.dialog=n,this.permissionService=o,this.sidebarSpacing="contracted",this.statusList=["Active","Inactive"],this.permissionService.getModulePermission().subscribe(s=>{this.accessPermission=s[0].RatingSetting,console.log(this.accessPermission),this.getCriteriaList()})}ngOnInit(){this.cols=[{field:"ratingCriteria",headers:"Rating Criteria"},{field:"status",headers:"Status"}],this.exportColumns=this.cols.map(e=>({title:e.headers,dataKey:e.field})),console.log(this.exportColumns)}onToggleSidebar(e){this.sidebarSpacing="open"===e?"contracted":"expanded"}getCriteriaList(){this.ratingCriteriaService.getCriteriaList().subscribe(e=>{this.ratingSettingData=e})}openDialog(e){this.dialog.open(P).afterClosed().subscribe(o=>{1==o&&this.deleteCriteriaDetail(e)})}deleteCriteriaDetail(e){this.ratingCriteriaService.deleteCriteriaDetails(e).subscribe(n=>{n&&this.getCriteriaList()})}exportExcel(){const n={Sheets:{data:Z.utils.json_to_sheet(this.ratingSettingData)},SheetNames:["data"]},o=Z.write(n,{bookType:"xlsx",type:"array"});this.saveAsExcelFile(o,"ratingCriterias")}saveAsExcelFile(e,n){const g=new Blob([e],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});S.saveAs(g,n+"_export_"+(new Date).getTime()+".xlsx")}exportPdf(){this.ratingData=this.ratingSettingData;const e=new _.jsPDF("l","pt");M()(e,{columns:this.exportColumns,body:this.ratingData}),e.save("ratingCriteria.pdf")}applyFilterGlobal(e,n){this.dt.filterGlobal(e,n)}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(x),t.Y36(p.uw),t.Y36(q.y))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-rating-criteria"]],viewQuery:function(e,n){if(1&e&&t.Gf(E,5),2&e){let o;t.iGM(o=t.CRH())&&(n.dt=o.first)}},decls:14,vars:11,consts:[[1,"container","page-heading"],[1,"row","mb-2","mt-2"],[1,"col-6"],[1,"col-6","text-right"],[1,"p-input-icon-right","ml-5"],["pButton","","type","button","label"," + Add Criteria",1,"add-button-rating",3,"routerLink","disabled"],["id","customerTable","responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","styleClass","p-datatable-striped",3,"columns","paginator","rows","showCurrentPageReport","value","responsive","globalFilterFields"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"d-flex","justify-content-between"],[1,"d-flex","align-items-center","p-0"],["src","../assets/images/icons/filter.svg","alt","img",1,"filter",2,"margin-right","5px"],[1,"input-container",3,"click"],["src","../../../assets/images/search-white.svg",1,"input-container-img"],["pInputText","","type","text","placeholder","Search...",3,"input"],["search",""],["pButton","","type","button","pTooltip","Pdf","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/pdf.svg","alt","Button Image"],["pButton","","type","button","pTooltip","Excel","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/excel.svg","alt","Button Image"],["pButton","","pTooltip","print","tooltipPosition","bottom",1,"custom-image"],["src","../../../../assets/images/printer.svg","alt","Button Image"],[1,"text-center"],["pTooltip","Edit Criteria","tooltipPosition","bottom",2,"margin-right","15px","cursor","pointer"],["src","../../../../assets/images/edit.svg","alt","img",3,"routerLink","queryParams"],["pTooltip","Delete Criteria","tooltipPosition","bottom","href","javascript:void(0);",1,"me-3","confirm-text",3,"click"],["src","../../../../assets/images/delete.svg","alt","img"],["colspan","12",1,"text-danger"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"h4"),t._uU(4,"Rating Criteria List"),t.qZA(),t.qZA(),t.TgZ(5,"div",3),t.TgZ(6,"span",4),t._UZ(7,"button",5),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(8,"p-table",6,7),t.YNc(10,U,14,0,"ng-template",8),t.YNc(11,w,7,0,"ng-template",9),t.YNc(12,J,11,7,"ng-template",10),t.YNc(13,I,3,0,"ng-template",11),t.qZA()),2&e&&(t.xp6(7),t.Q6J("routerLink",t.DdM(9,A))("disabled",!n.accessPermission.add),t.xp6(1),t.Q6J("columns",n.cols)("paginator",!0)("rows",10)("showCurrentPageReport",!0)("value",n.ratingSettingData)("responsive",!0)("globalFilterFields",t.DdM(10,L)))},directives:[O.Hq,m.rH,T.iA,D.jx,k.o,F.u],styles:['[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button:before{content:"Filter";margin-right:10px}[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button{width:100px;height:40.5px;border-radius:3px;font-size:large;margin:1px 5px 1px 1px;padding:15px 20px;border:1px solid #ced4da}.page-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;letter-spacing:1.2px;word-spacing:.1rem}.add-button-rating[_ngcontent-%COMP%]{background-color:#f52e2e;color:#fff;border:none}.add-button-rating[_ngcontent-%COMP%]:hover{background-color:#f08080;color:#fff;border:none}.custom-image[_ngcontent-%COMP%], .custom-image[_ngcontent-%COMP%]:hover{background:none;border:none}.input-container[_ngcontent-%COMP%]{position:relative;border:.5px solid rgba(145,158,171,.32)!important}.input-container-img[_ngcontent-%COMP%]{position:absolute;left:10px;top:50%;transform:translateY(-50%);width:20px;height:20px;cursor:pointer}.input-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{padding-left:30px;font-size:.875rem}.custom-image[_ngcontent-%COMP%]{background:none;border:none}[_nghost-%COMP%]  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight{background-color:#e41c1c;margin-bottom:10px;margin-top:10px;border-radius:5px}  .p-paginator{background:white!important;border:none!important}.head1[_ngcontent-%COMP%]{color:#000;text-align:center}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{border:none!important;border-bottom:1px solid #d7c6c6!important;background-color:#fff!important;color:#000!important;justify-content:center}  .edit-delete-button{background-color:#fff!important;border:none!important}  .p-datatable .p-datatable-header{background:white;border:none}']}),i})();var c=r(3075),Y=r(4036);function Q(i,a){if(1&i&&(t.TgZ(0,"div"),t.TgZ(1,"div",22),t._uU(2,"Criteria is required"),t.qZA(),t.qZA()),2&i){const e=t.oxw();t.xp6(1),t.Q6J("hidden",!e.criteriaForm.controls.name.errors.required)}}function B(i,a){if(1&i&&(t.TgZ(0,"div"),t.TgZ(1,"div",23),t._uU(2,"Status is required"),t.qZA(),t.qZA()),2&i){const e=t.oxw();t.xp6(1),t.Q6J("hidden",!e.criteriaForm.controls.status.errors.required)}}const R=function(){return["/ratesettings/ratingcriterialist"]},z=[{path:"ratingcriterialist",component:j},{path:"ratingcriteriaform",component:(()=>{class i{constructor(e,n,o,s){this.ratingCriteriaService=e,this.fb=n,this.route=o,this.activatedRoute=s,this.sidebarSpacing="contracted",this.statusList=["Active","Inactive"],this.criteriaForm=n.group({name:["",[c.kI.required]],status:["",[c.kI.required]]}),this.activatedRoute.queryParamMap.subscribe(g=>{this.id=parseInt(g.get("serialno")),this.id?(this.title="Edit",this.getRatingCriteriaDetail()):this.title="Add"})}ngOnInit(){}onToggleSidebar(e){this.sidebarSpacing="open"===e?"contracted":"expanded"}getRatingCriteriaDetail(){this.ratingCriteriaService.getCriteriaDetails(this.id).subscribe(e=>{console.log(e[0].ratingCriteria),this.criteriaForm.patchValue({name:e[0].ratingCriteria,status:e[0].status})})}submit(){let e={ratingCriteria:this.criteriaForm.controls.name.value,status:this.criteriaForm.controls.status.value};this.id?this.submitEditedDetails(e):this.submitDetails(e)}submitEditedDetails(e){let n=Object.assign({},e);this.ratingCriteriaService.submitEditedCriteriaDetail(n,this.id).subscribe(o=>{o&&this.route.navigate(["/ratesettings/ratingcriterialist"])})}submitDetails(e){let n=Object.assign({},e);this.ratingCriteriaService.submitCriteriaDetail(n).subscribe(o=>{o&&this.route.navigate(["/ratesettings/ratingcriterialist"])})}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(x),t.Y36(c.qu),t.Y36(m.F0),t.Y36(m.gz))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-add-edit-rating-criteria"]],decls:36,vars:10,consts:[[1,"page-heading"],[1,"button-heading-container"],[1,"mb-2","p-1","back-button",3,"routerLink"],[1,"material-icons"],[1,"d-flex","justify-content-center"],[1,"card",2,"width","1000px","height","500px"],[1,"p-5"],[1,"card-body"],[1,"mt-2","mb-3",2,"padding-left","90px"],[1,"d-flex","justify-content-center",3,"formGroup"],[1,"w-100"],[1,"row","mt-5"],[1,"form-group","col-12","d-flex","justify-content-center"],["for","criteriaName",1,"col-2","col-form-label","starlabel"],[1,"col-8"],["type","text","id","criteriaName","formControlName","name",1,"form-control"],[4,"ngIf"],["for","status",1,"col-2","col-form-label","starlabel"],["styleClass","statusDropdown","placeholder","Select status","formControlName","status",3,"options"],[1,"form-group","col-12","d-flex","justify-content-end",2,"padding-right","100px"],["type","submit",1,"btn","btn-info","mr-4",2,"background","rgb(228, 28, 28)","border","none",3,"disabled","click"],[1,"btn","btn-info",2,"background","#637381","border","none",3,"routerLink"],[2,"font-size","smaller","color","rgb(253, 122, 122)","font-style","italic","display","block",3,"hidden"],[2,"font-size","smaller","color","rgb(253, 122, 122)","font-style","italic",3,"hidden"]],template:function(e,n){1&e&&(t._UZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"button",2),t.TgZ(3,"i",3),t._uU(4,"arrow_back"),t.qZA(),t.qZA(),t.TgZ(5,"h5"),t._uU(6,"\xa0Criteria Details"),t.qZA(),t.qZA(),t.TgZ(7,"div",4),t.TgZ(8,"div",5),t.TgZ(9,"div",6),t.TgZ(10,"div",7),t.TgZ(11,"div",8),t.TgZ(12,"h3"),t._uU(13),t.qZA(),t.qZA(),t.TgZ(14,"form",9),t.TgZ(15,"div",10),t.TgZ(16,"div",11),t.TgZ(17,"div",12),t.TgZ(18,"label",13),t._uU(19,"Criteria"),t.qZA(),t.TgZ(20,"div",14),t._UZ(21,"input",15),t.YNc(22,Q,3,1,"div",16),t.qZA(),t.qZA(),t.qZA(),t.TgZ(23,"div",11),t.TgZ(24,"div",12),t.TgZ(25,"label",17),t._uU(26,"Status"),t.qZA(),t.TgZ(27,"div",14),t._UZ(28,"p-dropdown",18),t.YNc(29,B,3,1,"div",16),t.qZA(),t.qZA(),t.qZA(),t.TgZ(30,"div",11),t.TgZ(31,"div",19),t.TgZ(32,"button",20),t.NdJ("click",function(){return n.submit()}),t._uU(33,"Submit"),t.qZA(),t.TgZ(34,"button",21),t._uU(35,"Cancel"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(2),t.Q6J("routerLink",t.DdM(8,R)),t.xp6(11),t.hij("",n.title," Rating Criteria"),t.xp6(1),t.Q6J("formGroup",n.criteriaForm),t.xp6(8),t.Q6J("ngIf",!n.criteriaForm.controls.name.valid&&n.criteriaForm.controls.name.touched),t.xp6(6),t.Q6J("options",n.statusList),t.xp6(1),t.Q6J("ngIf",!n.criteriaForm.controls.status.valid&&n.criteriaForm.controls.status.touched),t.xp6(3),t.Q6J("disabled",!n.criteriaForm.valid),t.xp6(2),t.Q6J("routerLink",t.DdM(9,R)))},directives:[m.rH,c._Y,c.JL,c.sg,c.Fj,c.JJ,c.u,C.O5,Y.Lt],styles:['[_nghost-%COMP%]  .statusDropdown{width:100%}[_nghost-%COMP%]  label.starlabel:after{content:"*";color:#e41c1c}  .p-dropdown{border:1px solid lightgray}.button-heading-container[_ngcontent-%COMP%]{display:flex;align-items:center}.back-button[_ngcontent-%COMP%]{background:#e41c1c;color:#fff;border:none;border-radius:5px;margin-left:80px;width:40px}  .back-button:hover{background-color:#f08080!important}']}),i})()}];let H=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[C.ez,m.Bz.forChild(z)]]}),i})();var G=r(1976),V=r(6526),$=r(9224),W=r(9114),X=r(3407);let K=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[C.ez,G.m,V.q4,$.QW,T.U$,X.A,W.D,p.Is,v.ot,H]]}),i})()}}]);