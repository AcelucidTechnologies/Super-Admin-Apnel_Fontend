"use strict";(self.webpackChunkAdmin_Panel=self.webpackChunkAdmin_Panel||[]).push([[188],{7741:(E,y,p)=>{p.d(y,{c:()=>O});var s=p(520),l=p(9646),w=p(2076),i=p(2340);let m=[{id:2,name:"Electronics",image:"test image",hyperlink:"www.goolge.com",position:"head"},{id:3,name:"Mobiles, Tablets & More",image:"test2 image",hyperlink:"www.goolge.com",position:"head"},{id:4,name:"Men's Fashion & Accessories",image:"test4 image",hyperlink:"www.goolge.com",position:"head"},{id:5,name:"Women's Fashion & Accessories",image:"test5 image",hyperlink:"www.goolge.com",position:"head"},{id:6,name:"testig",image:"test6 image",hyperlink:"www.goolge.com",position:"left"},{id:7,name:"testing ck",image:"test7 image",hyperlink:"www.goolge.com",position:"left"},{name:"testing ck",image:"test8 image",hyperlink:"www.goolge.com",position:"left",id:8}],d=[{id:2,name:"Football",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"1",name:"Sports & Fitness"}},{id:4,name:"Fitness Accessories",image:"test2 image",hyperlink:"www.goolge.com",parent_category:{id:1,name:"Sports & Fitness"}},{id:5,name:"Strength Training",image:"test3 image",hyperlink:"www.goolge.com",parent_category:{id:1,name:"Sports & Fitness"}},{id:6,name:"Televisions",image:"test4 image",hyperlink:"www.goolge.com",parent_category:{id:2,name:"Electronics"}},{id:7,name:"Headphones",image:"test5 image",hyperlink:"www.goolge.com",parent_category:{id:2,name:"Electronics"}},{id:8,name:"Home Entertainment Systems",image:"test6 image",hyperlink:"www.goolge.com",parent_category:{id:2,name:"Electronics"}},{id:9,name:"Cameras and DSLR Cameras",image:"test9 image",hyperlink:"www.goolge.com",parent_category:{id:2,name:"Electronics"}},{id:10,name:"Musical Instruments & professionals Audio",image:"test10 image",hyperlink:"www.goolge.com",parent_category:{id:2,name:"Electronics"}},{id:11,name:"Gaming Consoles",image:"test11 image",hyperlink:"www.goolge.com",parent_category:{id:2,name:"Electronics"}},{id:12,name:"Mobiles & Smart Phones",image:"test12 image",hyperlink:"www.goolge.com",parent_category:{id:3,name:"Mobiles, Tablets & More"}},{id:13,name:"Cases and Covers",image:"test13 image",hyperlink:"www.goolge.com",parent_category:{id:3,name:"Mobiles, Tablets & More"}},{id:14,name:"Screen Protectors",image:"test14 image",hyperlink:"www.goolge.com",parent_category:{id:3,name:"Mobiles, Tablets & More"}},{id:15,name:"Power Banks",image:"test16 image",hyperlink:"www.goolge.com",parent_category:{id:3,name:"Mobiles, Tablets & More"}},{id:16,name:"Tablets",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"3",name:"Mobiles, Tablets & More"}},{id:17,name:"Smart watches and Wearables",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"3",name:"Mobiles, Tablets & More"}},{id:18,name:"Clothings",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"4",name:"Men's Fashion & Accessories"}},{id:19,name:"T-shirts and Polos",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"4",name:"Men's Fashion & Accessories"}},{id:20,name:"Shirts",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"4",name:"Men's Fashion & Accessories"}},{id:21,name:"Jeans",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"4",name:"Men's Fashion & Accessories"}},{id:22,name:"Innerware",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"4",name:"Men's Fashion & Accessories"}},{id:23,name:"Watches",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"4",name:"Men's Fashion & Accessories"}},{id:24,name:"Sunglasses",image:"test image",hyperlink:"www.goolge.com",parent_category:{id:"4",name:"Men's Fashion & Accessories"}},{name:"hb sjb sbj bjsb jhs`",image:"bh djshgbhjsdnjsb",hyperlink:"B JBJSB SJB",parent_category:{id:"145",name:"hjcb shs bhb"},id:25}],h=[{id:1,name:"Rohan kumar",email:"jbdvd@gmail.com",phone:"6592555999",funding:"$54488",address:{city:"DDn",street:"Neharu",landmark:"jumpStart",state:"Uttarakhand",zip:"54488",country:"India"}},{id:2,name:"Rakesh",email:"rakseh45@gmail.com",phone:"693655496587",funding:"$487878",address:{city:"Delhi",street:"sector45",landmark:"kailash tower",state:"Delhi",zip:"58796",country:"India"}},{id:3,name:" mohan",email:"mohan@gmail.com",phone:"685974155",funding:"$4577",address:{city:"DDN",street:"main road",landmark:"kailsh tower",state:"uttarakhand",zip:"65988",country:" India"}},{id:4,name:"Rohan kumar",email:"rohan@mail.com",phone:"321232132",funding:"$321323",address:{city:"DDN",street:"main road",landmark:"kailsh tower",state:"uttarakhand",zip:"65988",country:" India"}}];const c=[{id:1,url:"www.google.com",sortby:"5",image:"dummy 1",description:"qwertyuiop"},{id:2,url:"www.facebook.com",sortby:"3",image:"dummy 2",description:"asdfghjkl"},{id:3,url:"www.stackoverflow",sortby:"1",image:"dummy 3",description:"zxcvbnm"}],g=[{id:1,image:"dummy 1",product:"clothes",category:"shirt"},{id:2,image:"dummy 2",product:"clothes",category:"Tshirt"},{id:3,image:"dummy 3",product:"clothes",category:"denim"},{id:4,image:"dummy 4",product:"Mobile",category:"Apple"},{id:5,image:"dummy 5",product:"Shoes",category:"campus"},{id:6,image:"dummy 6",product:"Shoes",category:"nike"}];var S=p(5e3);let O=(()=>{class u{constructor(e){this.http=e}getCategoryList(){const e=localStorage.getItem("token")||"";return(new s.WM).set("x-access-token",e),(0,l.of)(m)}getCategoryById(e){const t=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",t);let r=m.findIndex(a=>a.id==e);return(0,l.of)(m[r])}addCategory(e){const t=localStorage.getItem("token")||"";return(new s.WM).set("x-access-token",t),e.id=m.length+1,m.push(e),(0,l.of)(e)}editCategory(e,t){const n=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",n);let a=m.findIndex(k=>k.id==t);return m[a]=e,(0,l.of)(e)}deleteCategory(e){const t=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",t);let r=m.map(a=>a);return m.splice(m.findIndex(a=>a.id==e),1),(0,l.of)(r)}getSubCategoryList(){(0,w.D)(d);const t=localStorage.getItem("token")||"";return(new s.WM).set("x-access-token",t),(0,l.of)(d)}getSubCategoryListById(e){const t=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",t);let r=d.findIndex(a=>a.id==e);return(0,l.of)(d[r])}addSubCategory(e){const t=localStorage.getItem("token")||"";return(new s.WM).set("x-access-token",t),e.id=d.length+1,d.push(e),(0,l.of)(e)}editSubCategory(e,t){const n=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",n);let a=d.findIndex(k=>k.id==t);return d[a]=e,(0,l.of)(e)}deleteSubCategory(e){const t=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",t);let r=d.map(a=>a);return m.splice(d.findIndex(a=>a.id==e),1),(0,l.of)(r)}getSponsorList(){const e=localStorage.getItem("token")||"";return(new s.WM).set("x-access-token",e),(0,l.of)(h)}getSponsorDetailsById(e){const t=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",t);let r=h.findIndex(a=>a.id===e);return(0,l.of)(h[r])}addSponsor(e){const t=localStorage.getItem("token")||"";return(new s.WM).set("x-access-token",t),e.id=h.length+1,h.push(e),(0,l.of)(e)}editSponsor(e,t){const n=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",n);let a=h.findIndex(k=>k.id==t);return h[a]=e,(0,l.of)(e)}deleteSponsor(e){const t=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",t);let r=h.map(a=>a);return h.splice(h.findIndex(a=>a.id==e),1),(0,l.of)(r)}addSpecialBanner(e){const t=localStorage.getItem("token")||"";console.log("add admin todkemn"+t);let n=(new s.WM).set("x-access-token",t);const o=new FormData;return o.append("bannerName",e.bannerName),o.append("bannerDescription",e.bannerDescription),o.append("bannerOrder",e.bannerOrder),o.append("image",e.image),console.log("add special banner"+o),this.http.post(`${i.N.JSON_SERVER}/createBannerSpecial`,o,{headers:n})}getSpecialBannerList(e){const t=localStorage.getItem("token")||"",n=localStorage.getItem("email");let o=(new s.WM).set("x-access-token",t);return this.http.get(`${i.N.JSON_SERVER}/getBannerSpecial?username=${n}`,{headers:o})}getPostById(e){return this.http.get(`https://jsonplaceholder.typicode.com/posts/${e}`)}getBannerById(e){const t=localStorage.getItem("token")||"";let n=(new s.WM).set("x-access-token",t);return this.http.get(`${i.N.JSON_SERVER}/getBannerById?id=${e}`,{headers:n})}deleteSpecialBanner(e){const t=localStorage.getItem("token")||"";let n=(new s.WM).set("x-access-token",t);return this.http.delete(`${i.N.JSON_SERVER}/deleteBannerSpecial?id=${e}`,{headers:n})}editSpecialBanner(e,t){const n=localStorage.getItem("token")||"";let o=(new s.WM).set("x-access-token",n);const r=`${i.N.JSON_SERVER}/updateBannerSpecial?id=${t}`,a=new FormData;return a.append("username",e.username),a.append("bannerName",e.bannerName),a.append("bannerDescription",e.bannerDescription),a.append("bannerOrder",e.bannerOrder),a.append("image",e.image),this.http.put(r,a,{headers:o})}getFeatureList(){const e=localStorage.getItem("token")||"",t=localStorage.getItem("email");let n=(new s.WM).set("x-access-token",e);return this.http.get(`${i.N.JSON_SERVER}/getFeatureProduct?username=${t}`,{headers:n})}addFeatureProduct(e){const t=localStorage.getItem("token")||"";let n=(new s.WM).set("x-access-token",t);const o=`${i.N.JSON_SERVER}/createFeatureProduct`,r=new FormData;return r.append("productName",e.productName),r.append("productQuantity",e.productQuantity),r.append("productModel",e.productModel),r.append("productPrice",e.productPrice),r.append("image",e.image),this.http.post(o,r,{headers:n})}editFeature(e,t){const n=localStorage.getItem("token")||"";let o=(new s.WM).set("x-access-token",n);return this.http.put(`${i.N.JSON_SERVER}/updateFeatureProduct?id=${t}`,e,{headers:o})}getFeatureById(e){const t=localStorage.getItem("token")||"";let n=(new s.WM).set("x-access-token",t);return this.http.get(`${i.N.JSON_SERVER}/getFeatureProductById?id=${e}`,{headers:n})}deleteProduct(e){const t=localStorage.getItem("token")||"";let n=(new s.WM).set("x-access-token",t);return this.http.delete(`${i.N.JSON_SERVER}/deleteFeatureProduct?id=${e}`,{headers:n})}getSliderList(){const e=localStorage.getItem("token")||"",t=localStorage.getItem("email")||"";let n=(new s.WM).set("x-access-token",e);return this.http.get(`${i.N.JSON_SERVER}/getSlider?username=${t}`,{headers:n})}addSlider(e){const t=localStorage.getItem("token")||"";let n=(new s.WM).set("x-access-token",t);return this.http.post(`${i.N.JSON_SERVER}/createSlider`,e,{headers:n})}editSlider(e,t){const n=localStorage.getItem("token")||"";let o=(new s.WM).set("x-access-token",n);return this.http.put(`${i.N.JSON_SERVER}/category/${t}`,e,{headers:o})}deleteSlider(e){const t=localStorage.getItem("token")||"";let n=(new s.WM).set("x-access-token",t);return this.http.delete(`${i.N.JSON_SERVER}/deleteSlider?id=${e}`,{headers:n})}getSliderById(e){const t=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",t);let r=c.findIndex(a=>a.id==e);return(0,l.of)(c[r])}getOfferList(){const e=localStorage.getItem("token")||"";let t=(new s.WM).set("x-access-token",e);return this.http.get(`${i.N.JSON_SERVER}/getSpecialProduct`,{headers:t})}addOffer(e){const t=localStorage.getItem("token")||"";return(new s.WM).set("x-access-token",t),e.id=g.length+1,g.push(e),(0,l.of)(e)}editOffer(e,t){const n=localStorage.getItem("token")||"";let o=(new s.WM).set("x-access-token",n);return this.http.put(`${i.N.JSON_SERVER}/category/${t}`,{headers:o})}deleteOffer(e){const t=localStorage.getItem("token")||"";(new s.WM).set("x-access-token",t);let r=g.map(a=>a);return g.splice(g.findIndex(a=>a.id==e),1),(0,l.of)(r)}getOfferById(e){const t=localStorage.getItem("token")||"";let n=(new s.WM).set("x-access-token",t);const o=`${i.N.JSON_SERVER}/slider/${e}`;return g.findIndex(a=>a.id==e),this.http.get(o,{headers:n})}}return u.\u0275fac=function(e){return new(e||u)(S.LFG(s.eN))},u.\u0275prov=S.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()},7673:(E,y,p)=>{p.d(y,{v:()=>m});var s=p(5439),w=p(5e3),i=p(520);let m=(()=>{class d{constructor(c){this.http=c}generateRandomNo(){return`ASNO/${(new Date).valueOf()}`}generateRandomeOrderId(){return`${(new Date).valueOf()}`}getCurrentDate(){return`${(new Date).toLocaleDateString()}`}convertDate(c){return s(c).format("YYYY-MM-DD")}convertTime(c){return s(c).format("HH:mm")}fileReadAndDetails(c){var g=c.target.files;console.log(c.target.files);var S=new FileReader;return S.readAsDataURL(c.target.files[0]),S.onload=O=>{this.URLBase64=O.target.result},{fileData:g,URLBase64:this.URLBase64}}getCountries(){return this.http.get("https://trial.mobiscroll.com/content/countries.json")}getConfig(c,g){return{customConfig:"/assets/js/ckeditor/ckeditor-config.js",height:c,wordcount:{showParagraphs:!1,showWordCount:!1,showCharCount:!0,maxCharCount:g}}}}return d.\u0275fac=function(c){return new(c||d)(w.LFG(i.eN))},d.\u0275prov=w.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()}}]);