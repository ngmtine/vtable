import"./index-CuX8Uz3M.js";import{g as r,o,a as c}from"./data-BPnHUmLj.js";const d=()=>`
<tr class="header-row">
    <th class="cell">ID</th>
    <th class="cell">Name</th>
    <th class="cell">Age</th>
    <th class="cell">Address</th>
</tr>
`,i=t=>`
<tr class="${c(t.id)}">
    <td class="cell">${t.id}</td>
    <td class="cell">${t.name}</td>
    <td class="cell">${t.age}</td>
    <td class="cell">${t.address}</td>
</tr>
`,h=()=>`
<tr>
    <td class="cell" colspan="4" style="text-align: center;">Footer Content</td>
</tr>
`,g=t=>{const l=r(1e5);let e=window.innerHeight-100;const a=30,s=new o({recordList:l,containerHeight:e,rowHeight:a,uniqueKey:"id",headerRenderer:d,bodyRenderer:i,footerRenderer:h,extraItemCount:40});s.mount(t),window.addEventListener("resize",()=>{e=window.innerHeight-100,s.containerHeight=e,s.tableContainer.style.height=`${e}px`,s.renderRows()})},n=document.getElementById("root");n&&g(n);
//# sourceMappingURL=example-vanilla-FwjLHOVz.js.map
