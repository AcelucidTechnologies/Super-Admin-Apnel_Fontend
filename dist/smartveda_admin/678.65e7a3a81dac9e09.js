"use strict";(self.webpackChunkAdmin_Panel=self.webpackChunkAdmin_Panel||[]).push([[678],{6678:(te,w,n)=>{n.r(w),n.d(w,{ReviewerModule:()=>ee});var Z=n(9808),C=n(1976),u=n(1083),b=n(574),q=n(4327),_=n(3583),S=n(2983),y=n.n(S),e=n(5e3),m=n(8966),x=n(7423);let M=(()=>{class i{constructor(){}ngOnInit(){}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-lead-view"]],decls:10,vars:1,consts:[["mat-dialog-title",""],[1,"mat-typography"],["align","end"],["mat-button","",1,"dialog1","mr-2",3,"mat-dialog-close"],["mat-button","","mat-dialog-close","",1,"dialog2"]],template:function(t,o){1&t&&(e.TgZ(0,"h2",0),e._uU(1,"Delete Reviewer's Details"),e.qZA(),e.TgZ(2,"mat-dialog-content",1),e.TgZ(3,"h3"),e._uU(4,"Do you want to delete this Record?"),e.qZA(),e.qZA(),e.TgZ(5,"mat-dialog-actions",2),e.TgZ(6,"button",3),e._uU(7,"Yes"),e.qZA(),e.TgZ(8,"button",4),e._uU(9,"Cancel"),e.qZA(),e.qZA()),2&t&&(e.xp6(6),e.Q6J("mat-dialog-close",!0))},directives:[m.uh,m.xY,m.H8,x.lW,m.ZT],styles:["mat-dialog-content[_ngcontent-%COMP%]{width:600px}[_nghost-%COMP%]  .dialog1{background:#e41c1c;color:#fff;border-radius:5px;outline:none}.dialog2[_ngcontent-%COMP%]{color:#fff;background:#637381;border-radius:5px;outline:none}.mat-dialog-title[_ngcontent-%COMP%], .mat-dialog-content[_ngcontent-%COMP%]{text-align:center}.mat-dialog-actions[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),i})();var p=n(520),f=(n(2340),n(9646));const c=[{sno:1,name:"Rahul",email:"rahul@gmail.com",rating:5,firstRating:"2023-04-24",status:"Active"},{sno:2,name:"Rohan",email:"rohan@gmail.com",rating:5,firstRating:"2023-02-21",status:"Active"},{sno:3,name:"Mukul",email:"mukul@gmail.com",rating:5,firstRating:"2023-01-15",status:"Inactive"},{sno:4,name:"Mohit",email:"mohit@gmail.com",rating:5,firstRating:"2023-04-09",status:"Active"},{sno:5,name:"Rohit",email:"rohit@gmail.com",rating:5,firstRating:"2023-04-14",status:"Inactive"}];let T=(()=>{class i{constructor(t){this.http=t}getReviewerList(){const t=localStorage.getItem("token")||"";return(new p.WM).set("x-access-token",t),(0,f.of)(c)}getReviewerDetails(t){const o=localStorage.getItem("token")||"";(new p.WM).set("x-access-token",o),console.log(c);let l=c.filter(g=>g.sno==t);return(0,f.of)(l)}submitReviewerDetail(t){const o=localStorage.getItem("token")||"";(new p.WM).set("x-access-token",o),t.sno=c.length+1;let l=new Date;return t.firstRating=l.toISOString().split("T")[0],t.rating="4",c.push(t),(0,f.of)(c)}submitEditedDetails(t,o){const r=localStorage.getItem("token")||"";return(new p.WM).set("x-access-token",r),c.map(g=>{g.sno==o&&(g.name=t.name,g.email=t.email,g.status=t.status)}),(0,f.of)(c)}deleteReviewerDetails(t){const o=localStorage.getItem("token")||"";(new p.WM).set("x-access-token",o);let l=c.splice(c.findIndex(g=>g.name==t),1);return(0,f.of)(l)}}return i.\u0275fac=function(t){return new(t||i)(e.LFG(p.eN))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var O=n(2888),U=n(845),h=n(4851),D=n(9783),P=n(1424),E=n(4119);const F=["dt"];function k(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"div",12),e.TgZ(1,"div",13),e.TgZ(2,"div",14),e._UZ(3,"img",15),e.TgZ(4,"input",16,17),e.NdJ("input",function(r){return e.CHM(t),e.oxw().applyFilterGlobal(r,"contains")}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(6,"div"),e.TgZ(7,"button",18),e.NdJ("click",function(){return e.CHM(t),e.oxw().exportPdf()}),e._UZ(8,"img",19),e.qZA(),e.TgZ(9,"button",20),e.NdJ("click",function(){return e.CHM(t),e.oxw().exportExcel()}),e._UZ(10,"img",21),e.qZA(),e.qZA(),e.qZA()}}function N(i,a){1&i&&(e.TgZ(0,"tr"),e.TgZ(1,"th",22),e.TgZ(2,"div",23),e._uU(3," Name "),e._UZ(4,"p-sortIcon",24),e.qZA(),e.qZA(),e.TgZ(5,"th",25),e.TgZ(6,"div",23),e._uU(7,"\nEmail "),e._UZ(8,"p-sortIcon",26),e.qZA(),e.qZA(),e.TgZ(9,"th",27),e.TgZ(10,"div",23),e._uU(11," Rating "),e._UZ(12,"p-sortIcon",28),e.qZA(),e.qZA(),e.TgZ(13,"th",29),e.TgZ(14,"div",23),e._uU(15," First Rating "),e._UZ(16,"p-sortIcon",30),e.qZA(),e.qZA(),e.TgZ(17,"th",31),e.TgZ(18,"div",23),e._uU(19," Status "),e._UZ(20,"p-sortIcon",32),e.qZA(),e.qZA(),e.TgZ(21,"th",33),e._uU(22,"Action"),e.qZA(),e.qZA())}const A=function(){return["/reviewer/reviewerform"]},I=function(i){return{serialno:i}};function J(i,a){if(1&i){const t=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA(),e.TgZ(11,"td"),e.TgZ(12,"a",34),e._UZ(13,"img",35),e.qZA(),e.TgZ(14,"a",36),e.NdJ("click",function(){const s=e.CHM(t).$implicit;return e.oxw().openDialog(s.name)}),e._UZ(15,"img",37),e.qZA(),e.qZA(),e.qZA()}if(2&i){const t=a.$implicit;e.xp6(2),e.Oqu(t.name),e.xp6(2),e.Oqu(t.email),e.xp6(2),e.Oqu(t.rating),e.xp6(2),e.Oqu(t.firstRating),e.xp6(2),e.Oqu(t.status),e.xp6(3),e.Q6J("routerLink",e.DdM(7,A))("queryParams",e.VKq(8,I,t.sno))}}function L(i,a){1&i&&(e.TgZ(0,"tr"),e.TgZ(1,"td",38),e._uU(2,"No records to show"),e.qZA(),e.qZA())}const Y=function(){return["name"]};let j=(()=>{class i{constructor(t,o,r){this.reviewerService=t,this.dialog=o,this.permissionService=r,this.sidebarSpacing="contracted",this.statusList=["Active","Inactive"],this.permissionService.getModulePermission().subscribe(s=>{this.accessPermission=s[0].ReviewerList,console.log(this.accessPermission)}),this.getReviewerData()}ngOnInit(){this.cols=[{headers:"Name",field:"name"},{headers:"Email",field:"email"},{headers:"Rating",field:"rating"},{headers:"First Rating",field:"firstRating"},{headers:"status",field:"status"}],this.exportColumns=this.cols.map(t=>({title:t.headers,dataKey:t.field}))}getReviewerData(){this.reviewerService.getReviewerList().subscribe(t=>{this.reviewerData=t})}openDialog(t){this.dialog.open(M).afterClosed().subscribe(r=>{1==r&&this.deleteReviewDetails(t)})}deleteReviewDetails(t){this.reviewerService.deleteReviewerDetails(t).subscribe(o=>{o&&this.getReviewerData()})}exportExcel(){const o={Sheets:{data:b.utils.json_to_sheet(this.reviewerData)},SheetNames:["data"]},r=b.write(o,{bookType:"xlsx",type:"array"});this.saveAsExcelFile(r,"reviewers")}saveAsExcelFile(t,o){const l=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});q.saveAs(l,o+"_export_"+(new Date).getTime()+".xlsx")}exportPdf(){this.reviewerDetails=this.reviewerData,console.log(this.reviewerDetails);const t=new _.jsPDF("l","pt");y()(t,{columns:this.exportColumns,body:this.reviewerDetails}),t.save("reviewers.pdf")}onToggleSidebar(t){this.sidebarSpacing="open"===t?"contracted":"expanded"}applyFilterGlobal(t,o){this.dt.filterGlobal(t,o)}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(T),e.Y36(m.uw),e.Y36(O.y))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-reviewer"]],viewQuery:function(t,o){if(1&t&&e.Gf(F,5),2&t){let r;e.iGM(r=e.CRH())&&(o.dt=r.first)}},decls:14,vars:11,consts:[[1,"container","page-heading"],[1,"row","mb-2","mt-2"],[1,"col-6"],[1,"col-6","text-right"],[1,"p-input-icon-right","ml-5"],["pButton","","type","button","label"," + Add Reviewer",1,"add-button-rating",3,"routerLink","disabled"],["id","customerTable","responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","styleClass","p-datatable-striped",3,"columns","paginator","rows","showCurrentPageReport","value","responsive","globalFilterFields"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"d-flex","justify-content-between"],[1,"d-flex","align-items-center","p-0"],[1,"input-container"],["src","../../../assets/images/search-white.svg",1,"input-container-img"],["pInputText","","type","text","placeholder","Search...",3,"input"],["search",""],["pButton","","type","button","pTooltip","Pdf","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/pdf.svg","alt","Button Image"],["pButton","","type","button","pTooltip","Excel","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/excel.svg","alt","Button Image"],["pSortableColumn","name"],[1,"flex","justify-content-between","align-items-center","head1"],["field","name"],["pSortableColumn","email"],["field","email"],["pSortableColumn","rating"],["field","rating"],["pSortableColumn","firstRating"],["field","firstRating"],["pSortableColumn","status"],["field","status"],[1,"text-center"],["pTooltip","Edit Reviewer","tooltipPosition","bottom",2,"margin-right","15px","cursor","pointer"],["src","../../../../assets/images/edit.svg","alt","img",3,"routerLink","queryParams"],["pTooltip","Delete Reviewer","tooltipPosition","bottom","href","javascript:void(0);",1,"me-3","confirm-text",3,"click"],["src","../../../../assets/images/delete.svg","alt","img"],["colspan","12",1,"text-danger"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"h4"),e._uU(4,"Reviewer List"),e.qZA(),e.qZA(),e.TgZ(5,"div",3),e.TgZ(6,"span",4),e._UZ(7,"button",5),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(8,"p-table",6,7),e.YNc(10,k,11,0,"ng-template",8),e.YNc(11,N,23,0,"ng-template",9),e.YNc(12,J,16,10,"ng-template",10),e.YNc(13,L,3,0,"ng-template",11),e.qZA()),2&t&&(e.xp6(7),e.Q6J("routerLink",e.DdM(9,A))("disabled",!o.accessPermission.add),e.xp6(1),e.Q6J("columns",o.cols)("paginator",!0)("rows",10)("showCurrentPageReport",!0)("value",o.reviewerData)("responsive",!0)("globalFilterFields",e.DdM(10,Y)))},directives:[U.Hq,u.rH,h.iA,D.jx,P.o,E.u,h.lQ,h.fz],styles:['[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button:before{content:"Filter";margin-right:10px}[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button{width:100px;height:40px;border-radius:3px;font-size:large;margin:1px 5px 1px 1px;padding:15px 20px;border:1px solid #ced4da}.page-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;letter-spacing:1.2px;word-spacing:.1rem}.add-button-rating[_ngcontent-%COMP%]{background-color:#f52e2e;color:#fff;border:none}.add-button-rating[_ngcontent-%COMP%]:hover{background-color:#f08080;color:#fff;border:none}.custom-image[_ngcontent-%COMP%], .custom-image[_ngcontent-%COMP%]:hover{background:none;border:none}.input-container[_ngcontent-%COMP%]{position:relative;border:.5px solid rgba(145,158,171,.32)!important}.input-container-img[_ngcontent-%COMP%]{position:absolute;left:10px;top:50%;transform:translateY(-50%);width:20px;height:20px;cursor:pointer}.input-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{padding-left:30px;font-size:.875rem}.custom-image[_ngcontent-%COMP%]{background:none;border:none}[_nghost-%COMP%]  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight{background-color:#e41c1c;margin-bottom:10px;margin-top:10px;border-radius:5px}  .p-paginator{background:white!important;border:none!important}.head1[_ngcontent-%COMP%]{color:#000;text-align:center}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{border:none!important;border-bottom:1px solid #d7c6c6!important;background-color:#fff!important;color:#000!important;justify-content:center}  .edit-delete-button{background-color:#fff!important;border:none!important}  .p-datatable .p-datatable-header{background:white;border:none}']}),i})();var d=n(3075),Q=n(4036);function z(i,a){if(1&i&&(e.TgZ(0,"div"),e.TgZ(1,"div",25),e._uU(2,"Name is required"),e.qZA(),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.reviewerForm.controls.name.errors.required)}}function B(i,a){if(1&i&&(e.TgZ(0,"div"),e.TgZ(1,"div",25),e._uU(2,"Email is required"),e.qZA(),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.reviewerForm.controls.email.errors.required)}}function H(i,a){if(1&i&&(e.TgZ(0,"div"),e.TgZ(1,"div",25),e._uU(2,"Status is required"),e.qZA(),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.reviewerForm.controls.reviewerStatus.errors.required)}}const R=function(){return["/reviewer/reviewerlist"]},G=[{path:"reviewerlist",component:j},{path:"reviewerform",component:(()=>{class i{constructor(t,o,r,s){this.reviewerService=t,this.fb=o,this.route=r,this.activatedRoute=s,this.sidebarSpacing="contracted",this.statusList=["Active","Inactive"],this.reviewerForm=this.fb.group({name:["",[d.kI.required]],email:["",[d.kI.required]],reviewerStatus:["",[d.kI.required]]}),this.activatedRoute.queryParamMap.subscribe(l=>{this.id=parseInt(l.get("serialno")),this.id&&null!=this.id?(this.title="Edit",this.change="Update",this.getReviewerDetail()):(this.title="Add",this.change="Submit")})}ngOnInit(){}getReviewerDetail(){this.reviewerService.getReviewerDetails(this.id).subscribe(t=>{this.reviewerForm.patchValue({name:t[0].name,email:t[0].email,reviewerStatus:t[0].status})})}submit(){let t={name:this.reviewerForm.controls.name.value,email:this.reviewerForm.controls.email.value,status:this.reviewerForm.controls.reviewerStatus.value};this.id?this.submitEditedDetails(t):this.submitDetails(t)}submitEditedDetails(t){let o=Object.assign({},t);this.reviewerService.submitEditedDetails(o,this.id).subscribe(r=>{r&&this.route.navigate(["/reviewer/reviewerlist"])})}submitDetails(t){let o=Object.assign({},t);this.reviewerService.submitReviewerDetail(o).subscribe(r=>{r&&this.route.navigate(["/reviewer/reviewerlist"])})}onToggleSidebar(t){this.sidebarSpacing="open"===t?"contracted":"expanded"}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(T),e.Y36(d.qu),e.Y36(u.F0),e.Y36(u.gz))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-add-edit-reviewer"]],decls:43,vars:12,consts:[[2,"height","700px","margin-bottom","100px"],[1,"page-heading"],[1,"button-heading-container"],[1,"mb-2","p-1","back-button",3,"routerLink"],[1,"material-icons"],[1,"d-flex","justify-content-center"],[1,"card",2,"width","1000px","height","500px"],[1,"p-5"],[1,"card-body","h-100","pl-4",2,"width","800px","margin","auto"],[1,"mt-3","mb-5"],[3,"formGroup"],[1,"form-row","ml-3","mt-4"],[1,"col-1"],["for","reviewerName",1,"text-center","starlabel","mb-4"],[1,"col-10"],["type","text","id","reviewerName","formControlName","name","placeholder","enter name..",1,"form-control"],[4,"ngIf"],["for","reviewerEmail",1,"text-center","starlabel","mb-4"],["type","text","id","reviewerEmail","formControlName","email","placeholder","enter email..",1,"form-control"],["for","status",1,"text-center","starlabel","mb-4"],["styleClass","statusDropdown","placeholder","Select status","formControlName","reviewerStatus",3,"options"],[1,"row"],[1,"d-flex","justify-content-end","col-11","mt-4"],["type","submit",1,"btn","btn-info","mr-3",2,"background","rgb(228, 28, 28)","border","none",3,"disabled","click"],[1,"btn","btn-info",2,"background","#637381","border","none",3,"routerLink"],[2,"font-size","smaller","color","rgb(253, 122, 122)","font-style","italic",3,"hidden"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e._UZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"button",3),e.TgZ(4,"i",4),e._uU(5,"arrow_back"),e.qZA(),e.qZA(),e.TgZ(6,"h5"),e._uU(7,"\xa0Reviewer Details"),e.qZA(),e.qZA(),e.TgZ(8,"div",5),e.TgZ(9,"div",6),e.TgZ(10,"div",7),e.TgZ(11,"div",8),e.TgZ(12,"div",9),e.TgZ(13,"h4"),e._uU(14),e.qZA(),e.qZA(),e.TgZ(15,"form",10),e.TgZ(16,"div",11),e.TgZ(17,"div",12),e.TgZ(18,"label",13),e._uU(19,"Name"),e.qZA(),e.qZA(),e.TgZ(20,"div",14),e._UZ(21,"input",15),e.YNc(22,z,3,1,"div",16),e.qZA(),e.qZA(),e.TgZ(23,"div",11),e.TgZ(24,"div",12),e.TgZ(25,"label",17),e._uU(26,"Email"),e.qZA(),e.qZA(),e.TgZ(27,"div",14),e._UZ(28,"input",18),e.YNc(29,B,3,1,"div",16),e.qZA(),e.qZA(),e.TgZ(30,"div",11),e.TgZ(31,"div",12),e.TgZ(32,"label",19),e._uU(33,"Status"),e.qZA(),e.qZA(),e.TgZ(34,"div",14),e._UZ(35,"p-dropdown",20),e.YNc(36,H,3,1,"div",16),e.qZA(),e.qZA(),e.TgZ(37,"div",21),e.TgZ(38,"div",22),e.TgZ(39,"button",23),e.NdJ("click",function(){return o.submit()}),e._uU(40),e.qZA(),e.TgZ(41,"button",24),e._uU(42,"Cancel"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(3),e.Q6J("routerLink",e.DdM(10,R)),e.xp6(11),e.hij("",o.title," Reviewer"),e.xp6(1),e.Q6J("formGroup",o.reviewerForm),e.xp6(7),e.Q6J("ngIf",!o.reviewerForm.controls.name.valid&&o.reviewerForm.controls.name.touched),e.xp6(7),e.Q6J("ngIf",!o.reviewerForm.controls.email.valid&&o.reviewerForm.controls.email.touched),e.xp6(6),e.Q6J("options",o.statusList),e.xp6(1),e.Q6J("ngIf",!o.reviewerForm.controls.reviewerStatus.valid&&o.reviewerForm.controls.reviewerStatus.touched),e.xp6(3),e.Q6J("disabled",!o.reviewerForm.valid),e.xp6(1),e.Oqu(o.change),e.xp6(1),e.Q6J("routerLink",e.DdM(11,R)))},directives:[u.rH,d._Y,d.JL,d.sg,d.Fj,d.JJ,d.u,Z.O5,Q.Lt],styles:['[_nghost-%COMP%]  .statusDropdown{width:100%}[_nghost-%COMP%]  label.starlabel:after{content:"*";color:#e41c1c}.button-heading-container[_ngcontent-%COMP%]{display:flex;align-items:center}.back-button[_ngcontent-%COMP%]{background:#e41c1c;color:#fff;border:none;border-radius:5px;margin-left:80px;width:40px}  .back-button:hover{background-color:#f08080!important}  .p-dropdown{border:1px solid lightgray}']}),i})()}];let V=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[Z.ez,u.Bz.forChild(G)]]}),i})();var $=n(6526),W=n(9224),X=n(9114),K=n(3407);let ee=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[Z.ez,C.m,V,$.q4,W.QW,h.U$,K.A,X.D,m.Is,x.ot]]}),i})()}}]);