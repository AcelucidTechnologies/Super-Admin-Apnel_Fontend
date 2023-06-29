"use strict";(self.webpackChunkAdmin_Panel=self.webpackChunkAdmin_Panel||[]).push([[220],{7220:(me,_,c)=>{c.r(_),c.d(_,{DocumentModule:()=>se});var m=c(9808),d=c(1083),a=c(3075),e=c(5e3),p=c(8441),h=c(7650),v=c(1561),b=c(4107),q=c(508);function D(n,r){if(1&n&&(e.TgZ(0,"div"),e.TgZ(1,"div",29),e._uU(2," File is required "),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.selectForm.controls.image.errors.required)}}function C(n,r){if(1&n&&(e.TgZ(0,"div"),e.TgZ(1,"div",29),e._uU(2," File name is required "),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.selectForm.controls.fileName.errors.required)}}function F(n,r){if(1&n&&(e.TgZ(0,"mat-option",30),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.Q6J("value",t.employeeFullName),e.xp6(1),e.Oqu(t.employeeFullName)}}function N(n,r){if(1&n&&(e.TgZ(0,"div"),e.TgZ(1,"div",29),e._uU(2," employee is required "),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.selectForm.controls.employee.errors.required)}}function w(n,r){if(1&n&&(e.TgZ(0,"div"),e.TgZ(1,"div",29),e._uU(2," folder name is required "),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.selectForm.controls.folderName.errors.required)}}function M(n,r){if(1&n&&(e.TgZ(0,"div"),e.TgZ(1,"div",29),e._uU(2," fileDescription is required "),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.selectForm.controls.fileDescription.errors.required)}}const U=function(){return["/documents/document-list"]};let k=(()=>{class n{constructor(t,o,i,l,s){this.ngxLoader=t,this.fb=o,this.toastr=i,this.leaveservice=l,this.route=s,this.employeeList=[],this.imageChangedEvent="",this.selectForm=this.fb.group({username:localStorage.getItem("email"),image:["",[a.kI.required]],fileName:["",[a.kI.required]],employee:["",[a.kI.required]],folderName:["",[a.kI.required]],fileDescription:["",[a.kI.required]],toview:this.fb.group({reportingManager:[!1],employee:[!1]}),toDownload:this.fb.group({reportingManager:[!1],employee:[!1]})})}getMinimumDate(){const t=new Date;return t.setDate(t.getDate()),t.toISOString().split("T")[0]}ngOnInit(){this.getAllEmail()}getAllEmail(){this.leaveservice.getEmail().subscribe(t=>{this.employeeList=t,this.ngxLoader.stop(),console.log("email"+JSON.stringify(this.employeeList))})}fileChangeEvent(t){this.imageChangedEvent=t,this.Image=t.target.files[0]}submit(){this.selectForm.valid&&(this.payload={username:localStorage.getItem("email"),image:this.Image,fileName:this.selectForm.controls.fileName.value,employee:this.selectForm.controls.employee.value,folderName:this.selectForm.controls.folderName.value,fileDescription:this.selectForm.controls.fileDescription.value,toview:{employee:this.selectForm.get("toview.employee").value,reportingManager:this.selectForm.get("toview.reportingManager").value},toDownload:{employee:this.selectForm.get("toDownload.employee").value,reportingManager:this.selectForm.get("toDownload.reportingManager").value}}),this.ngxLoader.start(),this.submitDetails(this.payload),console.log("submit form value payload 24 ===>"+JSON.stringify(this.payload))}submitDetails(t){let o=Object.assign({},t);this.leaveservice.createDocument(o).subscribe(i=>{i?(this.toastr.showSuccess("Document added successfully","Document add"),this.ngxLoader.stop(),this.route.navigate(["/documents/document-list"])):(console.log("error"),this.toastr.showError("Somthing wrong Please check","Error occured"))})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(p.LA),e.Y36(a.qu),e.Y36(h.$),e.Y36(v.e),e.Y36(d.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-add-document"]],decls:87,vars:10,consts:[[1,"button-heading-container"],[1,"mb-2","back-button",3,"routerLink"],[1,"material-icons"],[1,"card","pl-4","pr-4","pb-3","pt-5"],[3,"formGroup"],[1,"row","mb-4"],[1,"col-6"],[1,"row"],[1,"col-4"],[1,"starlabel"],[1,"col-8"],["formControlName","image","placeholder","Enter name","type","file",1,"form-control","custom-placeholder","input-padding",3,"change"],[4,"ngIf"],["formControlName","fileName","placeholder","Enter file name","type","text",1,"form-control","custom-placeholder","input-padding"],["placeholder","appliedTo","formControlName","employee","multiple",""],[3,"value",4,"ngFor","ngForOf"],["formControlName","folderName","placeholder","Enter folder name","type","text",1,"form-control","custom-placeholder","input-padding"],[1,"col-2"],[1,"col-10"],["name","editor1","placeholder","Enter file details","formControlName","fileDescription",1,"form-control","custom-placeholder",2,"width","100%","height","100px"],["formGroupName","toview"],["type","checkbox","formControlName","employee"],[2,"padding-left","5px"],["type","checkbox","formControlName","reportingManager"],["formGroupName","toDownload"],[1,"row","mb-5","mt-4"],[1,"d-flex","justify-content-end","col-11","mt-4"],["type","submit",1,"btn","btn-info","mr-3",2,"background","rgb(228, 28, 28)","border","none",3,"disabled","click"],[1,"btn","btn-info",2,"background","#637381","border","none"],[2,"color","rgb(253, 122, 122)","font-size","small","font-style","italic",3,"hidden"],[3,"value"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"button",1),e.TgZ(2,"i",2),e._uU(3,"arrow_back"),e.qZA(),e.qZA(),e.TgZ(4,"h5"),e._uU(5,"\xa0Add Document"),e.qZA(),e.qZA(),e.TgZ(6,"div",3),e.TgZ(7,"form",4),e.TgZ(8,"div",5),e.TgZ(9,"div",6),e.TgZ(10,"div",7),e.TgZ(11,"div",8),e.TgZ(12,"label",9),e._uU(13,"File Browse"),e.qZA(),e.qZA(),e.TgZ(14,"div",10),e.TgZ(15,"input",11),e.NdJ("change",function(l){return o.fileChangeEvent(l)}),e.qZA(),e.YNc(16,D,3,1,"div",12),e.qZA(),e.qZA(),e.qZA(),e.TgZ(17,"div",6),e.TgZ(18,"div",7),e.TgZ(19,"div",8),e.TgZ(20,"label",9),e._uU(21,"File Name"),e.qZA(),e.qZA(),e.TgZ(22,"div",10),e._UZ(23,"input",13),e.YNc(24,C,3,1,"div",12),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(25,"div",5),e.TgZ(26,"div",6),e.TgZ(27,"div",7),e.TgZ(28,"div",8),e.TgZ(29,"label",9),e._uU(30,"Employee"),e.qZA(),e.qZA(),e.TgZ(31,"div",10),e.TgZ(32,"mat-select",14),e.YNc(33,F,2,2,"mat-option",15),e.qZA(),e.YNc(34,N,3,1,"div",12),e.qZA(),e.qZA(),e.qZA(),e.TgZ(35,"div",6),e.TgZ(36,"div",7),e.TgZ(37,"div",8),e.TgZ(38,"label",9),e._uU(39,"Folder Name"),e.qZA(),e.qZA(),e.TgZ(40,"div",10),e._UZ(41,"input",16),e.YNc(42,w,3,1,"div",12),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(43,"div",5),e.TgZ(44,"div",17),e.TgZ(45,"label",9),e._uU(46,"File Description"),e.qZA(),e.qZA(),e.TgZ(47,"div",18),e._UZ(48,"textarea",19),e.YNc(49,M,3,1,"div",12),e.qZA(),e.qZA(),e.TgZ(50,"div",5),e.TgZ(51,"div",17),e.TgZ(52,"label"),e._uU(53,"File Permission"),e.qZA(),e.qZA(),e.TgZ(54,"div",18),e.TgZ(55,"div",20),e.TgZ(56,"div",7),e.TgZ(57,"div",17),e.TgZ(58,"b"),e._uU(59,"To View"),e.qZA(),e.qZA(),e.TgZ(60,"div",17),e._UZ(61,"input",21),e.TgZ(62,"label",22),e._uU(63,"Employee"),e.qZA(),e.qZA(),e.TgZ(64,"div",8),e._UZ(65,"input",23),e.TgZ(66,"label",22),e._uU(67,"Reporting Manager"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(68,"div",24),e.TgZ(69,"div",7),e.TgZ(70,"div",17),e.TgZ(71,"b"),e._uU(72,"To Download"),e.qZA(),e.qZA(),e.TgZ(73,"div",17),e._UZ(74,"input",21),e.TgZ(75,"label",22),e._uU(76,"Employee"),e.qZA(),e.qZA(),e.TgZ(77,"div",8),e._UZ(78,"input",23),e.TgZ(79,"label",22),e._uU(80,"Reporting Manager"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(81,"div",25),e.TgZ(82,"div",26),e.TgZ(83,"button",27),e.NdJ("click",function(){return o.submit()}),e._uU(84,"Submit"),e.qZA(),e.TgZ(85,"button",28),e._uU(86,"Cancel"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(1),e.Q6J("routerLink",e.DdM(9,U)),e.xp6(6),e.Q6J("formGroup",o.selectForm),e.xp6(9),e.Q6J("ngIf",!o.selectForm.controls.image.valid&&(o.selectForm.controls.image.touched||o.selectForm.controls.image.dirty)),e.xp6(8),e.Q6J("ngIf",!o.selectForm.controls.fileName.valid&&(o.selectForm.controls.fileName.touched||o.selectForm.controls.fileName.dirty)),e.xp6(9),e.Q6J("ngForOf",o.employeeList),e.xp6(1),e.Q6J("ngIf",!o.selectForm.controls.employee.valid&&(o.selectForm.controls.employee.touched||o.selectForm.controls.employee.dirty)),e.xp6(8),e.Q6J("ngIf",!o.selectForm.controls.folderName.valid&&(o.selectForm.controls.folderName.touched||o.selectForm.controls.folderName.dirty)),e.xp6(7),e.Q6J("ngIf",!o.selectForm.controls.fileDescription.valid&&(o.selectForm.controls.fileDescription.touched||o.selectForm.controls.fileDescription.dirty)),e.xp6(34),e.Q6J("disabled",!o.selectForm.valid))},directives:[d.rH,a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u,m.O5,b.gD,m.sg,q.ey,a.x0,a.Wl],styles:['.back-button[_ngcontent-%COMP%]{background:#e41c1c;color:#fff;border:none;padding:5px;border-radius:5px;width:40px}  .back-button:hover{background-color:#f08080!important}.button-heading-container[_ngcontent-%COMP%]{display:flex;align-items:center}label.starlabel[_ngcontent-%COMP%]:after{content:"*";color:#e41c1c}.custom-placeholder[_ngcontent-%COMP%]::placeholder{color:#000}.checkbox-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center}.checkbox-wrapper[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{margin-right:5px;margin-bottom:4px}.mat-select[_ngcontent-%COMP%]{display:inline-block;width:100%;outline:none;border:1px solid lightgrey;height:40px;padding:5px 10px;color:#000}  .mat-select-placeholder{color:#000!important}.form-control[_ngcontent-%COMP%]{color:#000}']}),n})();var g=c(8966),x=c(7423);let y=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-dialog-document"]],decls:10,vars:1,consts:[["mat-dialog-title",""],[1,"mat-typography"],["align","end"],["mat-button","",1,"dialog1","mr-2",3,"mat-dialog-close"],["mat-button","","mat-dialog-close","",1,"dialog2"]],template:function(t,o){1&t&&(e.TgZ(0,"h2",0),e._uU(1,"Delete Document Details"),e.qZA(),e.TgZ(2,"mat-dialog-content",1),e.TgZ(3,"h3"),e._uU(4,"Do you want to delete this Record?"),e.qZA(),e.qZA(),e.TgZ(5,"mat-dialog-actions",2),e.TgZ(6,"button",3),e._uU(7,"Yes"),e.qZA(),e.TgZ(8,"button",4),e._uU(9,"Cancel"),e.qZA(),e.qZA()),2&t&&(e.xp6(6),e.Q6J("mat-dialog-close",!0))},directives:[g.uh,g.xY,g.H8,x.lW,g.ZT],styles:["mat-dialog-content[_ngcontent-%COMP%]{width:600px}[_nghost-%COMP%]  .dialog1{background:#e41c1c;color:#fff;border-radius:5px;outline:none}.dialog2[_ngcontent-%COMP%]{color:#fff;background:#637381;border-radius:5px;outline:none}.mat-dialog-title[_ngcontent-%COMP%], .mat-dialog-content[_ngcontent-%COMP%]{text-align:center}.mat-dialog-actions[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),n})();var O=c(3583),Z=c(574),P=c(2983),L=c.n(P),E=c(520),J=c(845),T=c(4851),I=c(9783),S=c(1424),Y=c(4119);const Q=["dt"];function j(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"div",13),e.TgZ(1,"div",14),e.TgZ(2,"div",15),e._UZ(3,"img",16),e.TgZ(4,"input",17,18),e.NdJ("input",function(i){return e.CHM(t),e.oxw().applyFilterGlobal(i,"contains")}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(6,"div"),e.TgZ(7,"button",19),e.NdJ("click",function(){return e.CHM(t),e.oxw().exportPdf()}),e._UZ(8,"img",20),e.qZA(),e.TgZ(9,"button",21),e.NdJ("click",function(){return e.CHM(t),e.oxw().exportExcel()}),e._UZ(10,"img",22),e.qZA(),e.qZA(),e.qZA()}}function R(n,r){1&n&&(e.TgZ(0,"tr"),e.TgZ(1,"th"),e.TgZ(2,"div",23),e._uU(3," S.No. "),e.qZA(),e.qZA(),e.TgZ(4,"th",24),e.TgZ(5,"div",23),e._uU(6," Folder Name "),e._UZ(7,"p-sortIcon",25),e.qZA(),e.qZA(),e.TgZ(8,"th",26),e.TgZ(9,"div",23),e._uU(10," File "),e._UZ(11,"p-sortIcon",27),e.qZA(),e.qZA(),e.TgZ(12,"th",28),e.TgZ(13,"div",23),e._uU(14," Modified At "),e._UZ(15,"p-sortIcon",29),e.qZA(),e.qZA(),e.TgZ(16,"th",30),e._uU(17,"Action"),e.qZA(),e.qZA())}const B=function(){return["/documents/edit-document"]},G=function(n){return{id:n}};function $(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td"),e.TgZ(2,"span",31),e._uU(3,"Sr.no"),e.qZA(),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td",32),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.ALo(11,"date"),e.qZA(),e.TgZ(12,"td"),e.TgZ(13,"div",33),e.TgZ(14,"a",34),e.NdJ("click",function(){const l=e.CHM(t).$implicit;return e.oxw().downloadFile(l.image)}),e._UZ(15,"img",35),e.qZA(),e.TgZ(16,"a",36),e._UZ(17,"img",37),e.qZA(),e.TgZ(18,"a",38),e.NdJ("click",function(){const l=e.CHM(t).$implicit;return e.oxw().openDialog(l)}),e._UZ(19,"img",39),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=r.$implicit,o=r.rowIndex;e.xp6(4),e.hij(" ",o+1," "),e.xp6(2),e.Oqu(t.folderName),e.xp6(2),e.Oqu(t.image),e.xp6(2),e.Oqu(e.xi3(11,6,t.updatedAt,"MM/dd/yyyy")),e.xp6(7),e.Q6J("routerLink",e.DdM(9,B))("queryParams",e.VKq(10,G,t._id))}}function z(n,r){1&n&&(e.TgZ(0,"tr"),e.TgZ(1,"td",40),e._uU(2,"No records to show"),e.qZA(),e.qZA())}const H=function(){return["/documents/add-document"]},K=function(){return["folderName","image","toDownload","toview","addedBy","createdAt","updatedAt"]};function X(n,r){if(1&n&&(e.TgZ(0,"div"),e.TgZ(1,"div",29),e._uU(2," File name is required "),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.selectForm.controls.fileName.errors.required)}}function W(n,r){if(1&n&&(e.TgZ(0,"mat-option",30),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.Q6J("value",t.employeeFullName),e.xp6(1),e.Oqu(t.employeeFullName)}}function ee(n,r){if(1&n&&(e.TgZ(0,"div"),e.TgZ(1,"div",29),e._uU(2," employee is required "),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.selectForm.controls.employee.errors.required)}}function te(n,r){if(1&n&&(e.TgZ(0,"div"),e.TgZ(1,"div",29),e._uU(2," folder name is required "),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.selectForm.controls.folderName.errors.required)}}function oe(n,r){if(1&n&&(e.TgZ(0,"div"),e.TgZ(1,"div",29),e._uU(2," fileDescription is required "),e.qZA(),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("hidden",!t.selectForm.controls.fileDescription.errors.required)}}const ne=function(){return["/documents/document-list"]},ie=[{path:"document-list",component:(()=>{class n{constructor(t,o,i,l,s){this.leaveService=t,this.toastr=o,this.ngxLoader=i,this.http=l,this.dialog=s,this.docuemntData=[],this.sidebarSpacing="contracted",this.statusList=["Active","Inactive"],this.fgsType=p.aS.squareLoader}ngOnInit(){this.fgsType=p.aS.squareLoader,this.ngxLoader.start(),this.getDocumentData()}getDocumentData(){this.leaveService.getDocumentList().subscribe(t=>{this.docuemntData=t,this.ngxLoader.stop()})}openDialog(t){this.dialog.open(y).afterClosed().subscribe(i=>{1==i&&this.deleteDocumentDetails(t)})}deleteDocumentDetails(t){this.leaveService.deleteDocument(t._id).subscribe(o=>{o&&(this.toastr.showSuccess("Document deleted successfully","Document deleted"),this.getDocumentData())})}exportExcel(){const t=new m.uU("en-US"),o=this.docuemntData.map((A,de)=>({"S.No.":de+1,"Folder Name":A.folderName,File:A.image,ModifiedTime:t.transform(A.updatedAt,"MM/dd/yyyy")})),i=Z.utils.book_new(),l=Z.utils.json_to_sheet(o);Z.utils.book_append_sheet(i,l,"Sheet1");const s=this.workbookToBlob(i),f=URL.createObjectURL(s),u=document.createElement("a");u.href=f,u.download="table_data.xlsx",u.click(),URL.revokeObjectURL(f)}workbookToBlob(t){const o=Z.write(t,{bookType:"xlsx",type:"array"});return new Blob([o],{type:"application/octet-stream"})}exportPdf(){this.documentDetails=this.docuemntData.map((l,s)=>Object.assign({sno:s+1},l));const t=new O.jsPDF("l","pt"),o=this.documentDetails.map(l=>Object.assign(Object.assign({},l),{createdAt:this.formatDate(l.createdAt),updatedAt:this.formatDate(l.updatedAt)}));L()(t,{columns:[{title:"S No.",dataKey:"sno"},{title:"Folder Name",dataKey:"folderName"},{title:"File ",dataKey:"image"},{title:"ModifiedTime",dataKey:"updatedAt"}],body:o}),t.save("Document List.pdf")}formatDate(t){const o=new Date(t);return`${String(o.getDate()).padStart(2,"0")}/${String(o.getMonth()+1).padStart(2,"0")}/${o.getFullYear()}`}onToggleSidebar(t){this.sidebarSpacing="open"===t?"contracted":"expanded"}applyFilterGlobal(t,o){const i=t.target.value;!i||/^\s*$/.test(i)?this.dt.filterGlobal("",o):this.dt.filterGlobal(i.trim(),o)}downloadFile(t){const o=t.split(".").pop().toLowerCase();let i,l;"xlsx"===o||"xls"===o?(i="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",l=".xlsx"):"pdf"===o?(i="application/pdf",l=".pdf"):(i="image/"+o,l="."+o);const s=document.createElement("a");s.href=t,s.target="_blank",s.download="file"+l,s.type=i,document.body.appendChild(s),s.click(),document.body.removeChild(s)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(v.e),e.Y36(h.$),e.Y36(p.LA),e.Y36(E.eN),e.Y36(g.uw))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-document-list"]],viewQuery:function(t,o){if(1&t&&e.Gf(Q,5),2&t){let i;e.iGM(i=e.CRH())&&(o.dt=i.first)}},decls:15,vars:12,consts:[[1,"page-heading"],[1,"row","mb-2","mt-2"],[1,"col-6"],[1,"col-6","text-right"],[1,"p-input-icon-right","ml-5"],["pButton","","type","button","label"," + Add documents",1,"add-button-rating",3,"routerLink"],["id","customerTable","responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","styleClass","p-datatable-striped",3,"columns","paginator","rows","showCurrentPageReport","value","responsive","globalFilterFields"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[3,"fgsColor","fgsType"],[1,"d-flex","justify-content-between"],[1,"d-flex","align-items-center","p-0"],[1,"input-container"],["src","../../../assets/images/search-white.svg",1,"input-container-img"],["pInputText","","type","text","placeholder","Search...",3,"input"],["search",""],["pButton","","type","button","pTooltip","Pdf","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/pdf.svg","alt","Button Image"],["pButton","","type","button","pTooltip","Excel","tooltipPosition","bottom",1,"custom-image",3,"click"],["src","../../../../assets/images/excel.svg","alt","Button Image"],[1,"flex","justify-content-between","align-items-center","head1"],["pSortableColumn","folderName"],["field","folderName"],["pSortableColumn","image"],["field","image"],["pSortableColumn","updatedAt"],["field","updatedAt"],[1,"text-center"],[1,"p-column-title"],[1,"image-cell"],[2,"display","flex","align-items","center"],["pTooltip","Download File","tooltipPosition","bottom",2,"margin-right","15px","cursor","pointer",3,"click"],["src","../../../../assets/images/download.png","alt","img",2,"height","28px","width","30px"],["pTooltip","Edit Document","tooltipPosition","bottom",2,"margin-right","15px","cursor","pointer"],["src","../../../../assets/images/edit.svg","alt","img",3,"routerLink","queryParams"],["pTooltip","Delete Document","tooltipPosition","bottom","href","javascript:void(0);",1,"me-3","confirm-text",3,"click"],["src","../../../../assets/images/delete.svg","alt","img"],["colspan","12",1,"text-danger"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"h4"),e._uU(4,"Document List"),e.qZA(),e.qZA(),e.TgZ(5,"div",3),e.TgZ(6,"span",4),e._UZ(7,"button",5),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(8,"p-table",6,7),e.YNc(10,j,11,0,"ng-template",8),e.YNc(11,R,18,0,"ng-template",9),e.YNc(12,$,20,12,"ng-template",10),e.YNc(13,z,3,0,"ng-template",11),e.qZA(),e._UZ(14,"ngx-ui-loader",12)),2&t&&(e.xp6(7),e.Q6J("routerLink",e.DdM(10,H)),e.xp6(1),e.Q6J("columns",o.cols)("paginator",!0)("rows",7)("showCurrentPageReport",!0)("value",o.docuemntData)("responsive",!0)("globalFilterFields",e.DdM(11,K)),e.xp6(6),e.Q6J("fgsColor","#000000")("fgsType",o.fgsType))},directives:[J.Hq,d.rH,T.iA,I.jx,S.o,Y.u,T.lQ,T.fz,p.Eo],pipes:[m.uU],styles:['[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button:before{content:"Filter";margin-right:10px}[_nghost-%COMP%]  .captionFilter p-columnFilter .p-column-filter>button{width:100px;height:40px;border-radius:3px;font-size:large;margin:1px 5px 1px 1px;padding:15px 20px;border:1px solid #ced4da}.page-heading[_ngcontent-%COMP%]{padding:0}.page-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;letter-spacing:1.2px;word-spacing:.1rem}.add-button-rating[_ngcontent-%COMP%]{background-color:#f52e2e;color:#fff;border:none}.add-button-rating[_ngcontent-%COMP%]:hover{background-color:#f08080;color:#fff;border:none}.custom-image[_ngcontent-%COMP%], .custom-image[_ngcontent-%COMP%]:hover{background:none;border:none}.input-container[_ngcontent-%COMP%]{position:relative;border:.5px solid rgba(145,158,171,.32)!important}.input-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{padding-left:30px;font-size:.875rem}.custom-image[_ngcontent-%COMP%]{background:none;border:none}[_nghost-%COMP%]  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight{background-color:#e41c1c;margin-bottom:10px;margin-top:10px;border-radius:5px}  .p-paginator{background:white!important;border:none!important}.head1[_ngcontent-%COMP%]{color:#000;text-align:center}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{border:none!important;border-bottom:1px solid #d7c6c6!important;background-color:#fff!important;color:#000!important;justify-content:center}  .edit-delete-button{background-color:#fff!important;border:none!important}  .p-datatable .p-datatable-header{background:white;border:none}[_nghost-%COMP%]  .p-datatable .p-sortable-column .p-sortable-column-icon{color:#848484}[_nghost-%COMP%]  .p-datatable .p-sortable-column.p-highlight:hover .p-sortable-column-icon{color:#848484}.input-container-img[_ngcontent-%COMP%]{position:absolute;left:10px;top:50%;transform:translateY(-50%);width:20px;height:20px;cursor:pointer}.input-container[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{padding-left:30px;font-size:.875rem;height:37px}.image-cell[_ngcontent-%COMP%]{max-width:300px;word-wrap:break-word}']}),n})()},{path:"document-delete",component:y},{path:"add-document",component:k},{path:"edit-document",component:(()=>{class n{constructor(t,o,i,l,s,f){this.ngxLoader=t,this.fb=o,this.toastr=i,this.leaveservice=l,this.activatedRoute=s,this.route=f,this.imageChangedEvent="",this.employeeList=[],this.imageData=null,this.activatedRoute.queryParamMap.subscribe(u=>{this.id=u.get("id")}),this.selectForm=this.fb.group({username:localStorage.getItem("email"),image:[""],fileName:["",[a.kI.required]],employee:["",[a.kI.required]],folderName:["",[a.kI.required]],fileDescription:["",[a.kI.required]],toview:this.fb.group({employee:[!1],reportingManager:[!1]}),toDownload:this.fb.group({employee:[!1],reportingManager:[!1]})})}getMinimumDate(){const t=new Date;return t.setDate(t.getDate()),t.toISOString().split("T")[0]}ngOnInit(){this.getEditByIDDetail(),this.getAllEmail()}getAllEmail(){this.leaveservice.getEmail().subscribe(t=>{this.employeeList=t,this.ngxLoader.stop()})}fileChangeEvent(t){this.imageChangedEvent=t,this.imageData=t.target.files[0],this.Image=t.target.files[0]}getEditByIDDetail(){this.leaveservice.getDocumentById(this.id).subscribe(t=>{console.log("500==>"+JSON.stringify(t)),this.selectForm.patchValue({fileName:t.fileName,employee:t.employee,givenDate:t.givenDate,fileDescription:t.fileDescription,folderName:t.folderName,toview:{employee:t.toview.employee,reportingManager:t.toview.reportingManager},toDownload:{employee:t.toDownload.employee,reportingManager:t.toDownload.reportingManager}}),console.log("patched value for document"+JSON.stringify(this.selectForm.value))})}submit(){this.ngxLoader.start(),this.selectForm.valid&&(this.payload={username:localStorage.getItem("email"),image:this.Image,fileName:this.selectForm.controls.fileName.value,employee:this.selectForm.controls.employee.value,folderName:this.selectForm.controls.folderName.value,fileDescription:this.selectForm.controls.fileDescription.value,toview:{employee:this.selectForm.get("toview.employee").value,reportingManager:this.selectForm.get("toview.reportingManager").value},toDownload:{employee:this.selectForm.get("toDownload.employee").value,reportingManager:this.selectForm.get("toDownload.reportingManager").value}}),this.leaveservice.editDocumentList(this.payload,this.id).subscribe(t=>{this.assetlist=t,t&&(this.ngxLoader.start(),this.toastr.showSuccess("Document edited successfully","Document edited")),this.route.navigate(["/documents/document-list"])})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(p.LA),e.Y36(a.qu),e.Y36(h.$),e.Y36(v.e),e.Y36(d.gz),e.Y36(d.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-edit-document"]],decls:86,vars:9,consts:[[1,"button-heading-container"],[1,"mb-2","back-button",3,"routerLink"],[1,"material-icons"],[1,"card","pl-4","pr-4","pb-3","pt-5"],[3,"formGroup"],[1,"row","mb-4"],[1,"col-6"],[1,"row"],[1,"col-4"],[1,"col-8"],["formControlName","image","placeholder","Enter name","type","file",1,"form-control","custom-placeholder","input-padding",3,"change"],[1,"starlabel"],["formControlName","fileName","placeholder","Enter file name","type","text",1,"form-control","custom-placeholder","input-padding"],[4,"ngIf"],["placeholder","appliedTo","formControlName","employee","multiple",""],[3,"value",4,"ngFor","ngForOf"],["formControlName","folderName","placeholder","Enter Folder name","type","text",1,"form-control","custom-placeholder","input-padding"],[1,"col-2"],[1,"col-10"],["name","editor1","placeholder","Enter file details","formControlName","fileDescription",1,"form-control","custom-placeholder",2,"width","100%","height","100px"],["formGroupName","toview"],["type","checkbox","formControlName","employee"],[2,"padding-left","5px"],["type","checkbox","formControlName","reportingManager"],["formGroupName","toDownload"],[1,"row","mb-5","mt-4"],[1,"d-flex","justify-content-end","col-11","mt-4"],["type","submit",1,"btn","btn-info","mr-3",2,"background","rgb(228, 28, 28)","border","none",3,"disabled","click"],[1,"btn","btn-info",2,"background","#637381","border","none"],[2,"color","rgb(253, 122, 122)","font-size","small","font-style","italic",3,"hidden"],[3,"value"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"button",1),e.TgZ(2,"i",2),e._uU(3,"arrow_back"),e.qZA(),e.qZA(),e.TgZ(4,"h5"),e._uU(5,"\xa0Edit Document"),e.qZA(),e.qZA(),e.TgZ(6,"div",3),e.TgZ(7,"form",4),e.TgZ(8,"div",5),e.TgZ(9,"div",6),e.TgZ(10,"div",7),e.TgZ(11,"div",8),e.TgZ(12,"label"),e._uU(13,"New File Browse"),e.qZA(),e.qZA(),e.TgZ(14,"div",9),e.TgZ(15,"input",10),e.NdJ("change",function(l){return o.fileChangeEvent(l)}),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(16,"div",6),e.TgZ(17,"div",7),e.TgZ(18,"div",8),e.TgZ(19,"label",11),e._uU(20,"File Name"),e.qZA(),e.qZA(),e.TgZ(21,"div",9),e._UZ(22,"input",12),e.YNc(23,X,3,1,"div",13),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(24,"div",5),e.TgZ(25,"div",6),e.TgZ(26,"div",7),e.TgZ(27,"div",8),e.TgZ(28,"label",11),e._uU(29,"Employee"),e.qZA(),e.qZA(),e.TgZ(30,"div",9),e.TgZ(31,"mat-select",14),e.YNc(32,W,2,2,"mat-option",15),e.qZA(),e.YNc(33,ee,3,1,"div",13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(34,"div",6),e.TgZ(35,"div",7),e.TgZ(36,"div",8),e.TgZ(37,"label",11),e._uU(38,"Folder Name"),e.qZA(),e.qZA(),e.TgZ(39,"div",9),e._UZ(40,"input",16),e.YNc(41,te,3,1,"div",13),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(42,"div",5),e.TgZ(43,"div",17),e.TgZ(44,"label",11),e._uU(45,"File Description"),e.qZA(),e.qZA(),e.TgZ(46,"div",18),e._UZ(47,"textarea",19),e.YNc(48,oe,3,1,"div",13),e.qZA(),e.qZA(),e.TgZ(49,"div",5),e.TgZ(50,"div",17),e.TgZ(51,"label"),e._uU(52,"File Permission"),e.qZA(),e.qZA(),e.TgZ(53,"div",18),e.TgZ(54,"div",20),e.TgZ(55,"div",7),e.TgZ(56,"div",17),e.TgZ(57,"b"),e._uU(58,"To View"),e.qZA(),e.qZA(),e.TgZ(59,"div",17),e._UZ(60,"input",21),e.TgZ(61,"label",22),e._uU(62,"Employee"),e.qZA(),e.qZA(),e.TgZ(63,"div",8),e._UZ(64,"input",23),e.TgZ(65,"label",22),e._uU(66,"Reporting Manager"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(67,"div",24),e.TgZ(68,"div",7),e.TgZ(69,"div",17),e.TgZ(70,"b"),e._uU(71,"To Download"),e.qZA(),e.qZA(),e.TgZ(72,"div",17),e._UZ(73,"input",21),e.TgZ(74,"label",22),e._uU(75,"Employee"),e.qZA(),e.qZA(),e.TgZ(76,"div",8),e._UZ(77,"input",23),e.TgZ(78,"label",22),e._uU(79,"Reporting Manager"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(80,"div",25),e.TgZ(81,"div",26),e.TgZ(82,"button",27),e.NdJ("click",function(){return o.submit()}),e._uU(83,"Submit"),e.qZA(),e.TgZ(84,"button",28),e._uU(85,"Cancel"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(1),e.Q6J("routerLink",e.DdM(8,ne)),e.xp6(6),e.Q6J("formGroup",o.selectForm),e.xp6(16),e.Q6J("ngIf",!o.selectForm.controls.fileName.valid&&(o.selectForm.controls.fileName.touched||o.selectForm.controls.fileName.dirty)),e.xp6(9),e.Q6J("ngForOf",o.employeeList),e.xp6(1),e.Q6J("ngIf",!o.selectForm.controls.employee.valid&&(o.selectForm.controls.employee.touched||o.selectForm.controls.employee.dirty)),e.xp6(8),e.Q6J("ngIf",!o.selectForm.controls.folderName.valid&&(o.selectForm.controls.folderName.touched||o.selectForm.controls.folderName.dirty)),e.xp6(7),e.Q6J("ngIf",!o.selectForm.controls.fileDescription.valid&&(o.selectForm.controls.fileDescription.touched||o.selectForm.controls.fileDescription.dirty)),e.xp6(34),e.Q6J("disabled",!o.selectForm.valid))},directives:[d.rH,a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u,m.O5,b.gD,m.sg,q.ey,a.x0,a.Wl],styles:['.back-button[_ngcontent-%COMP%]{background:#e41c1c;color:#fff;border:none;padding:5px;border-radius:5px;width:40px}  .back-button:hover{background-color:#f08080!important}.button-heading-container[_ngcontent-%COMP%]{display:flex;align-items:center}label.starlabel[_ngcontent-%COMP%]:after{content:"*";color:#e41c1c}.custom-placeholder[_ngcontent-%COMP%]::placeholder{color:#000}.checkbox-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center}.checkbox-wrapper[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]{margin-right:5px;margin-bottom:4px}.mat-select[_ngcontent-%COMP%]{display:inline-block;width:100%;outline:none;border:1px solid lightgrey;height:40px;padding:5px 10px;color:#000}  .mat-select-placeholder{color:#000!important}.form-control[_ngcontent-%COMP%]{color:#000}']}),n})()}];let re=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[d.Bz.forChild(ie)],d.Bz]}),n})();var le=c(4834),ae=c(529),ce=c(7322);let se=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[m.ez,re,p.Js,g.Is,x.ot,ae.m,a.u5,le.t,b.LD,ce.lN]]}),n})()}}]);