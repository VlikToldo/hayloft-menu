"use strict";(self.webpackChunkhayloft_menu=self.webpackChunkhayloft_menu||[]).push([[403],{2403:function(e,n,t){t.r(n),t.d(n,{default:function(){return C}});var r=t(1413),a=t(4165),i=t(3433),s=t(5861),c=t(9439),o=t(2791),l=t(6144),u=t(7839),d=t(9140),m=t(3360),f=t(7689),h={cardBody:"kitchen-item_cardBody__+emBm",Card:"kitchen-item_Card__eJ5np",imgContainer:"kitchen-item_imgContainer__Dh+vd",imgProduct:"kitchen-item_imgProduct__HHdef",title:"kitchen-item_title__UAtFw",spanText:"kitchen-item_spanText__i2YWR",text:"kitchen-item_text__TuWxV",btnDetailes:"kitchen-item_btnDetailes__4Z5r9"},v=t(184),x=function(e){var n=e.name,t=(e.id,e.ingredients),r=(0,f.s0)();return(0,v.jsx)("li",{className:h.listItem,children:(0,v.jsxs)(d.Z,{className:h.Card,children:[(0,v.jsx)("div",{className:h.imgContainer,children:(0,v.jsx)("img",{className:h.imgProduct,src:"https://klike.net/uploads/posts/2019-06/1559545617_2.jpg",alt:"\u041f\u0440\u043e\u0434\u0443\u043a\u0442"})}),(0,v.jsxs)(d.Z.Body,{className:h.cardBody,children:[(0,v.jsx)(d.Z.Title,{className:h.title,children:n}),(0,v.jsx)("span",{className:h.spanText,children:"\u0421\u043a\u043b\u0430\u0434: "}),(0,v.jsx)(d.Z.Text,{className:h.text,children:t}),(0,v.jsx)(m.Z,{onClick:function(){r("/menu/more-info")},className:h.btnDetailes,size:"sm",children:"\u041f\u043e\u0432\u043d\u0430 \u0456\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u044f"})]})]})})},p=t(909),Z=t(7884),_="kitchen-list_listCehGroupBox__EpJvn",b="kitchen-list_cehGroupBox__rsw-t",g="kitchen-list_listBox__Z-UTh",k="kitchen-list_learnListBox__HZinn",j="kitchen-list_titleCeh__6iagA",N="kitchen-list_buttonGroup__UIUnu",y="kitchen-list_toggleButton__+HSuT",C=function(){var e=(0,o.useState)([]),n=(0,c.Z)(e,2),t=n[0],d=n[1],m=(0,o.useState)({learnItem:!1,cardItem:!0}),f=(0,c.Z)(m,2),h=f[0],C=f[1],w=(0,o.useState)("1"),B=(0,c.Z)(w,2),I=B[0],P=B[1],T=h.cardItem?g:k;(0,o.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,Z.hb)();case 3:n=e.sent,d((0,i.Z)(n)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[d]);var R=function(e){var n={};return e.forEach((function(e){var t=e.ceh;n[t]||(n[t]=[]),n[t].push(e)})),n}(t);return(0,v.jsxs)("div",{children:[(0,v.jsx)(l.Z,{className:N,children:[{name:"\u041a\u0430\u0440\u0442\u043a\u0430",value:"1"},{name:"\u0421\u043f\u0438\u0441\u043e\u043a",value:"2"}].map((function(e,n){return(0,v.jsx)(u.Z,{className:y,id:"radio-".concat(n),type:"radio",variant:"primary",name:"radio",value:e.value,checked:I===e.value,onChange:function(e){return function(e){h.learnItem?C({learnItem:!1,cardItem:!0}):C({learnItem:!0,cardItem:!1}),P(e.currentTarget.value)}(e)},children:e.name},n)}))}),(0,v.jsx)("ul",{className:_,children:function(e){return Object.keys(e).map((function(n){return function(e,n){return(0,v.jsxs)("div",{className:b,children:[(0,v.jsx)("h2",{className:j,children:e}),(0,v.jsx)("ul",{className:T,children:n.map((function(e){return(0,v.jsxs)(v.Fragment,{children:[h.cardItem&&(0,v.jsx)(x,(0,r.Z)({},e),e._id),h.learnItem&&(0,v.jsx)(p.Z,(0,r.Z)({},e),e._id)]})}))})]},e)}(n,e[n])}))}(R)})]})}},909:function(e,n,t){var r=t(9140),a=t(7689),i=t(184);n.Z=function(e){var n=e.name,t=(e.id,e.ingredients),s=(0,a.s0)();return(0,i.jsx)("li",{onClick:function(){s("/menu/more-info")},children:(0,i.jsxs)(r.Z,{children:[(0,i.jsx)(r.Z.Header,{children:n}),(0,i.jsx)(r.Z.Body,{children:(0,i.jsx)("blockquote",{className:"blockquote mb-0",children:(0,i.jsx)("p",{children:t})})})]})})}},7884:function(e,n,t){t.d(n,{hb:function(){return s},zq:function(){return c}});var r=t(4165),a=t(5861),i=t(1243).Z.create({baseURL:"https://backend-loft.onrender.com/api/kitchen"}),s=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var n,t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.get("");case 2:return n=e.sent,t=n.data,console.log(t),e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),c=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var t,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.post("/",n);case 2:return t=e.sent,a=t.data,console.log(a),e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},6144:function(e,n,t){var r=t(1413),a=t(5987),i=t(1694),s=t.n(i),c=t(2791),o=t(162),l=t(184),u=["bsPrefix","size","vertical","className","role","as"],d=c.forwardRef((function(e,n){var t=e.bsPrefix,i=e.size,c=e.vertical,d=void 0!==c&&c,m=e.className,f=e.role,h=void 0===f?"group":f,v=e.as,x=void 0===v?"div":v,p=(0,a.Z)(e,u),Z=(0,o.vE)(t,"btn-group"),_=Z;return d&&(_="".concat(Z,"-vertical")),(0,l.jsx)(x,(0,r.Z)((0,r.Z)({},p),{},{ref:n,role:h,className:s()(m,_,i&&"".concat(Z,"-").concat(i))}))}));d.displayName="ButtonGroup",n.Z=d},9140:function(e,n,t){t.d(n,{Z:function(){return P}});var r=t(1413),a=t(5987),i=t(1694),s=t.n(i),c=t(2791),o=t(162),l=t(6543),u=t(7472),d=t(184),m=["bsPrefix","className","variant","as"],f=c.forwardRef((function(e,n){var t=e.bsPrefix,i=e.className,c=e.variant,l=e.as,u=void 0===l?"img":l,f=(0,a.Z)(e,m),h=(0,o.vE)(t,"card-img");return(0,d.jsx)(u,(0,r.Z)({ref:n,className:s()(c?"".concat(h,"-").concat(c):h,i)},f))}));f.displayName="CardImg";var h=f,v=t(6040),x=["bsPrefix","className","as"],p=c.forwardRef((function(e,n){var t=e.bsPrefix,i=e.className,l=e.as,u=void 0===l?"div":l,m=(0,a.Z)(e,x),f=(0,o.vE)(t,"card-header"),h=(0,c.useMemo)((function(){return{cardHeaderBsPrefix:f}}),[f]);return(0,d.jsx)(v.Z.Provider,{value:h,children:(0,d.jsx)(u,(0,r.Z)((0,r.Z)({ref:n},m),{},{className:s()(i,f)}))})}));p.displayName="CardHeader";var Z=p,_=["bsPrefix","className","bg","text","border","body","children","as"],b=(0,u.Z)("h5"),g=(0,u.Z)("h6"),k=(0,l.Z)("card-body"),j=(0,l.Z)("card-title",{Component:b}),N=(0,l.Z)("card-subtitle",{Component:g}),y=(0,l.Z)("card-link",{Component:"a"}),C=(0,l.Z)("card-text",{Component:"p"}),w=(0,l.Z)("card-footer"),B=(0,l.Z)("card-img-overlay"),I=c.forwardRef((function(e,n){var t=e.bsPrefix,i=e.className,c=e.bg,l=e.text,u=e.border,m=e.body,f=void 0!==m&&m,h=e.children,v=e.as,x=void 0===v?"div":v,p=(0,a.Z)(e,_),Z=(0,o.vE)(t,"card");return(0,d.jsx)(x,(0,r.Z)((0,r.Z)({ref:n},p),{},{className:s()(i,Z,c&&"bg-".concat(c),l&&"text-".concat(l),u&&"border-".concat(u)),children:f?(0,d.jsx)(k,{children:h}):h}))}));I.displayName="Card";var P=Object.assign(I,{Img:h,Title:j,Subtitle:N,Body:k,Link:y,Text:C,Header:Z,Footer:w,ImgOverlay:B})},7839:function(e,n,t){var r=t(1413),a=t(5987),i=t(1694),s=t.n(i),c=t(2791),o=t(162),l=t(3360),u=t(184),d=["bsPrefix","name","className","checked","type","onChange","value","disabled","id","inputRef"],m=function(){},f=c.forwardRef((function(e,n){var t=e.bsPrefix,i=e.name,c=e.className,f=e.checked,h=e.type,v=e.onChange,x=e.value,p=e.disabled,Z=e.id,_=e.inputRef,b=(0,a.Z)(e,d);return t=(0,o.vE)(t,"btn-check"),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("input",{className:t,name:i,type:h,value:x,ref:_,autoComplete:"off",checked:!!f,disabled:!!p,onChange:v||m,id:Z}),(0,u.jsx)(l.Z,(0,r.Z)((0,r.Z)({},b),{},{ref:n,className:s()(c,p&&"disabled"),type:void 0,role:void 0,as:"label",htmlFor:Z}))]})}));f.displayName="ToggleButton",n.Z=f}}]);
//# sourceMappingURL=403.f149dd5f.chunk.js.map