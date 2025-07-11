(() => {
    const css = `
body.cf-theme * {
    transition: none;
}

body.cf-theme .blue-box {
    border: 2px solid #3f3f46 !important;
    background: #18181b;
    overflow: hidden;
}

body.cf-theme .brown-box {
    background-color: #ffe986;
    border: 2px solid #ffd956 !important;
    color: #3f3f46 !important;
}

body.cf-theme .brown-box * {
    text-decoration: none;
}

body.cf-theme .jGrowl-notification,
body.cf-theme .jGrowl-closer {
    background-color: #ffe986;
    border: 2px solid #ffd956 !important;
    color: #3f3f46 !important;

}


body.cf-theme .edit-info-box>div>table>tbody>tr.reloadable.reloadable-SummaryBoxCacheablePartFrame-header2c924e3088204ee77ba681f72be3444357932fca>td:nth-child(2)>span>form>input {
    outline: none;
    height: 20px;
    color: #d9d9d9 !important;
    padding: 1px 4px;
    background: #2a2a2a;
    border-radius: 4px;
    border: 1.5px solid #515151;
}

body.cf-theme .edit-info-box>div>table>tbody>tr.reloadable.reloadable-SummaryBoxCacheablePartFrame-header2c924e3088204ee77ba681f72be3444357932fca>td:nth-child(2)>div.notes {
    color: #3493ff !important;
}

body.cf-theme .edit-info-box>div>table>tbody>tr.reloadable.reloadable-SummaryBoxCacheablePartFrame-header1baa06b4c8bc2d63f9db4d4cc86a2e2b12a7e893>td:nth-child(2)>span:nth-child(1) {
    color: #006FEE !important;
}

body.cf-theme .edit-info-box>div>table>tbody>tr.reloadable.reloadable-SummaryBoxCacheablePartFrame-header74262ed0c73b6b27e77207d8d97acab26fca633e>td:nth-child(2)>span>a {
    border: 2px solid #3f3f46 !important;
    padding: 4px;
    font-weight: 600;
    border-radius: 5px;
    color: #006FEE !important;
}

body.cf-theme .edit-info-box>div>table>tbody>tr.reloadable.reloadable-SummaryBoxCacheablePartFrame-header74262ed0c73b6b27e77207d8d97acab26fca633e>td:nth-child(2)>span>a.contest-problem-index-active {
    background-color: #ffe986;
    border: 2px solid #ffd956 !important;
}

body.cf-theme .edit-info-box>div>table>tbody>tr.reloadable.reloadable-SummaryBoxCacheablePartFrame-header74262ed0c73b6b27e77207d8d97acab26fca633e>td:nth-child(2)>span>a.has-uncommitted-changes {
    background-color: #ff8686;
    border: 2px solid #ff5656 !important;
}

body.cf-theme>div:nth-child(17)>div:nth-child(3)>form>table>tbody>tr>td:nth-child(2)>div.field-notice {
    padding-top: 10px !important;
}

body.cf-theme>div>table>tbody>tr>td>div>form>table>tbody>tr>td input,
body.cf-theme input.ac_input,
body.cf-theme>div:nth-child(21)>table>tbody>tr>td:nth-child(1)>div>div:nth-child(4)>table>tbody>tr>td:nth-child(2)>div>form>input:nth-child(1),
body.cf-theme>div>table>tbody>tr>td>form>table>tbody>tr>td>div>input,
body.cf-theme #russianName,
body.cf-theme>div:nth-child(22)>table>tbody>tr>td.statements>div.editAndPreviewBox.statementBox>form>div:nth-child(1)>label>input[type=text],
body.cf-theme>div:nth-child(18)>table>tbody>tr>td:nth-child(1)>form>div>table>tbody:nth-child(5)>tr:nth-child(7)>td>div>input.ignoreConfirmExitIfModified,
body.cf-theme>div:nth-child(22)>table>tbody>tr>td.tests>div:nth-child(3)>form>div>table>tbody>tr:nth-child(2)>td:nth-child(2)>input,
body.cf-theme>div:nth-child(17)>div:nth-child(3)>form>table>tbody>tr:nth-child(2n + 1)>td:nth-child(2)>input,
body.cf-theme>div:nth-child(17)>div:nth-child(4)>form>table>tbody>tr:nth-child(1)>td:nth-child(2)>#name,
body.cf-theme #searchInput {
    outline: none;
    height: 20px;
    color: #d9d9d9 !important;
    padding: 1px 4px;
    background: #2a2a2a;
    border-radius: 4px;
    border: 1.5px solid #515151;
}

body.cf-theme>div:nth-child(18)>table>tbody>tr>td:nth-child(1)>form>div>table>tbody:nth-child(5)>tr:nth-child(7)>td>div>input.ignoreConfirmExitIfModified {
    margin-top: 10px;
}

body.cf-theme textarea {
    box-sizing: border-box;
    outline: none;
    color: #d9d9d9 !important;
    padding: 5px 7px;
    background: #2a2a2a;
    border-radius: 4px;
    border: 1.5px solid #515151;
}

body.cf-theme textarea::-webkit-scrollbar {
    width: 3px;
}

body.cf-theme textarea::-webkit-scrollbar-track {
    background: transparent;
}

body.cf-theme textarea::-webkit-scrollbar-thumb {
    background-color: #6a6a6a;
    border-radius: 20px;
}

body.cf-theme .editAndPreviewContentItem.statementPreview.previewWindow {
    overflow: unset !important;
}

body.cf-theme .ace-chrome .ace_marker-layer .ace_selection {
    background: rgb(0, 85, 196) !important;
    ;
}

body.cf-theme .ace_keyword.ace_command.ace_script {
    color: rgb(255, 8, 219);
}

body.cf-theme .ace_numeric {
    color: rgb(0, 0, 255) !important;
}

body.cf-theme .ace_line {
    color: rgb(255, 255, 255);
}

body.cf-theme .ace_scroller {
    background-color: #18181b;
}

body.cf-theme .ace_active-line {
    background: rgb(109, 109, 109) !important;
    ;
    color: white;
}

body.cf-theme #script-ace {
    outline: none !important;
}

body.cf-theme .ace_content {
    box-sizing: border-box;
    outline: none;
    color: #d9d9d9 !important;
    /*     padding: 5px 7px; */
    background: #2a2a2a;
    border-radius: 4px;
    border: 1.5px solid #515151;
}


body.cf-theme>div:nth-child(22)>table>tbody>tr>td.statements>div.editAndPreviewBox.statementBox {
    background: black;
}

body.cf-theme .previewWindow {
    border: 2px solid #3f3f46 !important;
    background: #18181b !important;
    border-radius: 10px;
}

body.cf-theme .previewWindow::-webkit-scrollbar {
    width: 3px;
}

body.cf-theme .previewWindow::-webkit-scrollbar-track {
    background: transparent;
}

body.cf-theme .previewWindow::-webkit-scrollbar-thumb {
    background-color: #6a6a6a;
    border-radius: 20px;
}

body.cf-theme>div:nth-child(21)>table>tbody>tr>td:nth-child(1)>div>form:nth-child(2)>table>tbody>tr:nth-child(9)>td:nth-child(2)>span>label {
    margin-bottom: 20px;
}

body.cf-theme .around {
    border: none;
}



body.cf-theme .blue-box * {
    text-decoration: none;
}

body.cf-theme>div>div.color-box.blue-box>div>div.menu>span>a {
    text-decoration: none;
    font-size: 12px;
}

body.cf-theme>div>table>tbody>tr>td>table>caption {
    margin-bottom: 10px;
}

body.cf-theme>div>table>tbody>tr>td>table>thead>tr>th,
body.cf-theme>div:nth-child(18)>table>tbody>tr>td:nth-child(1)>table>tbody>tr:nth-child(3)>td>#testsTable>thead>tr>th,
body.cf-theme>div:nth-child(22)>table>tbody>tr>td.tests>div:nth-child(3)>table>tbody>tr:nth-child(4)>td>table:nth-child(2)>thead>tr>th,
body.cf-theme>div:nth-child(17)>table>tbody>tr>td:nth-child(1)>table>tbody>tr:nth-child(2)>td>table.grid>thead>tr>th,
body.cf-theme>div:nth-child(17)>table>tbody>tr>td:nth-child(1)>table.grid.tablesorter>thead>tr>th {
    border: 2px solid #3f3f46 !important;
    background-color: #27272a !important;
    color: #006FEE !important;
}

body.cf-theme #body-problems>tr>td {
    border: 2px solid #3f3f46 !important;
    background-color: #18181b !important;
}

body.cf-theme #body-problems>tr.invalidRow>td {
    background-color: #620000 !important;
}

body.cf-theme #body-problems>tr>td>a {
    text-decoration: none;
}

body.cf-theme .grid:not(.disableTrHoverHighlight) tbody tr:hover:not(:only-child) td {
    background-color: #27272a !important;
}

body.cf-theme>div:nth-child(18)>table>tbody>tr>td:nth-child(1)>table.grid.tablesorter.supportsAdvanced.checkboxGrid>tbody>tr>td,
body.cf-theme>div:nth-child(18)>table>tbody>tr>td:nth-child(1)>table.compile-verdicts.grid.tablesorter>tbody>tr>td,
body.cf-theme>div:nth-child(18)>table>tbody>tr>td:nth-child(1)>table.grid.tablesorter.checkboxGrid>tbody>tr>td,
body.cf-theme>div:nth-child(18)>table>tbody>tr>td:nth-child(1)>table>tbody>tr:nth-child(3)>td>#testsTable>tbody>tr>td,
body.cf-theme>div:nth-child(22)>table>tbody>tr>td.tests>div:nth-child(3)>table>tbody>tr:nth-child(4)>td>table:nth-child(2)>tbody>tr>td,
body.cf-theme>div:nth-child(17)>table>tbody>tr>td:nth-child(1)>table>tbody>tr:nth-child(2)>td>table.grid>tbody>tr>td,
body.cf-theme>div:nth-child(17)>table>tbody>tr>td:nth-child(1)>table.grid.tablesorter>tbody>tr>td,
body.cf-theme>div:nth-child(22)>table>tbody>tr>td.statements>table.grid.tablesorter>tbody>tr>td {
    border: 2px solid #3f3f46 !important;
    background-color: #18181b !important;
}

body.cf-theme #judgeForm>form>table>tbody>tr>td>table>thead>tr>th,
body.cf-theme>div:nth-child(17)>table>tbody>tr>td:nth-child(1)>table>tbody>tr>th,
body.cf-theme>div:nth-child(17)>table>tbody>tr>td:nth-child(1)>table>tbody>tr>td>table>thead>tr>th,
body.cf-theme>div:nth-child(17)>div:nth-child(3)>table>tbody>tr>td>table>thead>tr>th {
    border: 2px solid #3f3f46 !important;
    background-color: #27272a !important;
    color: #006FEE !important;
}

body.cf-theme #judgeForm>form>table>tbody>tr>td>table>tbody>tr>td,
body.cf-theme>div:nth-child(17)>div:nth-child(3)>table>tbody>tr>td>table>tbody>tr>td {
    border: 2px solid #3f3f46 !important;
    background-color: #18181b !important;
}

body.cf-theme>div:nth-child(17)>table>tbody>tr>td:nth-child(1)>table:nth-child(2)>tbody>tr>td:nth-child(2)>div>form>button:nth-child(6),
body.cf-theme>div:nth-child(17)>table>tbody>tr>td:nth-child(1)>table:nth-child(2)>tbody>tr>td:nth-child(2)>div>form>button:nth-child(7) {
    color: #006FEE !important;
}

body.cf-theme>div:nth-child(22)>table>tbody>tr>td.tests>div:nth-child(3)>table>tbody>tr:nth-child(4)>td>table.grid.checkboxGrid>tbody>tr>td:nth-child(2)>pre {
    background-color: unset !important;
}

body.cf-theme a {
    text-decoration: none;
}

body.cf-theme>div:nth-child(18)>table>tbody>tr>td:nth-child(1)>form>input[type=submit]:nth-child(1) {
    width: 210px;
    font-size: 14px !important;
}

body.cf-theme #fileUpload {
    cursor: pointer;
}

body.cf-theme #fileCreate {
    cursor: pointer;
    border: none;
    outline: none;
    margin: 0;
    border-radius: 4px;
    color: #e0e0e0 !important;
    background: #707070;
    height: 23px;
    margin-left: 10px;
}

body.cf-theme #fileCreate:hover {
    background: #a4a4a4;
}

body.cf-theme .prettyprint .pun,
body.cf-theme .prettyprint .opn,
body.cf-theme .prettyprint .clo {
    color: #ff0;
}

body.cf-theme .prettyprint .pln {
    color: #fff;
}

body.cf-theme .prettyprint .kwd {
    color: #0087ff;
}

body.cf-theme .prettyprint .typ {
    color: #f0f;
}

body.cf-theme>div>div.manual>div>p>code,
body.cf-theme>div>div.manual>div>table>tbody>tr>td>pre {
    border: 2px solid #3f3f46 !important;
    background-color: #27272a !important;
    border-radius: 6px;
}

body.cf-theme>div>div.manual>div>table>tbody>tr>td {
    border: 2px solid #27272a !important;
}

body.cf-theme select {
    cursor: pointer;
    outline: none;
    height: 30px;
    color: #d9d9d9 !important;
    padding: 5px 5px;
    background: #2a2a2a;
    border-radius: 4px;
    margin-top: 5px;
    border: 1px solid #515151;
    margin-bottom: 5px;
}

body.cf-theme input[type=checkbox] {
    cursor: pointer;
}

body.cf-theme input[type=submit] {
    cursor: pointer;
    border: none;
    outline: none;
    margin: 0;
    border-radius: 4px;
    color: #e0e0e0 !important;
    background: #0254b0;
    height: 23px;
}

body.cf-theme input[type=submit]:hover {
    background: #0079ff;
}

body.cf-theme #top-messagebox {
    color: #3f3f46;
}


body.cf-theme>div:nth-child(21)>table>tbody>tr>td:nth-child(1)>div>div:nth-child(3)>div>hr {
    color: #3f3f46 !important;
}

body.cf-theme sup,
body.cf-theme .drafts-button.drafts-online {
    display: none;
}
`;
    
    const style = document.createElement("style");
    style.textContent = css;
    document.documentElement.appendChild(style);
})();