import"./index-CuX8Uz3M.js";import{g as a,o as i,a as s}from"./data-CGD6comi.js";const g=()=>`
<tr>
    <td>ID</td>
    <td>Name</td>
    <td>Age</td>
    <td>Address</td>
</tr>
`,c=t=>`
<tr class="${s(t.id)}">
    <td>${t.id}</td>
    <td>${t.name}</td>
    <td>${t.age}</td>
    <td>${t.address}</td>
</tr>
`,l=()=>`
<tr>
    <td colspan="4" style="text-align: center;">Footer Content</td>
</tr>
`,m=t=>{const r=a(1e5);let e=window.innerHeight-100;const o=30,n=new i({recordList:r,containerHeight:e,rowHeight:o,uniqueKey:"id",headerRenderer:g,bodyRenderer:c,footerRenderer:l,extraItemCount:40});n.mount(t),window.addEventListener("resize",()=>{e=window.innerHeight-100,n.containerHeight=e,n.tableContainer.style.height=`${e}px`,n.renderRows()})},d=document.getElementById("root");d&&m(d);
//# sourceMappingURL=example-vanilla-C36H0b7Y.js.map
