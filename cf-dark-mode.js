(() => {
    const css = `
body.cf-theme #tooltip {
    background: #27272a !important;
    border: 1px solid #3f3f46 !important;
    opacity: 1 !important;
    padding: 5px !important;
}

body.cf-theme #pageContent > div.contestList > div.contests-table > div.datatable > div:nth-child(6) > table > tbody > tr > td.state[style="background-color: rgb(221, 238, 255);"] {
    background: #a3d2ff !important;
}
body.cf-theme #pageContent > div.contestList > div.contests-table > div.datatable > div:nth-child(6) > table > tbody > tr > td.state[style="background-color: rgb(212, 237, 201);"] {
    background: #b2ff9f  !important;
}

body.cf-theme #pageContent > div.contestList > div.contests-table > div.datatable > div:nth-child(6) > table > tbody > tr > td.state[style="background-color: rgb(221, 238, 255);"] .notice,
body.cf-theme #pageContent > div.contestList > div.contests-table > div.datatable > div:nth-child(6) > table > tbody > tr > td.state[style="background-color: rgb(212, 237, 201);"] .notice {
    color: #393939 !important;
}

body.cf-theme #header>div.lang-chooser>div:nth-child(2)>a:nth-child(1):hover {
    filter: none !important;
}

body.cf-theme .CodeforcesContestInformationFrame td:has(.currentProblem) {
    background-color: #2d4464 !important;
}

body.cf-theme .datatable {
    box-sizing: border-box;
    background: #27272a !important;
}

body.cf-theme .page-index.active {
    border-radius: 5px;
}

body.cf-theme ._EduCourseAboutSidebarFrame_name {
    color: #0052ff;
    border-bottom: 1px solid #3f3f46;
}

body.cf-theme .eduCoursePath,
body.cf-theme .eduLessonPath,
body.cf-theme .eduStepPath {
    color: #548bff !important;
}


body.cf-theme .bordertable th {
    background: #27272a !important;
    color: #d7d7d7;
    border: 1px solid #3f3f46 !important;
}

body.cf-theme .bordertable td {
    background: #18181b !important;
    color: #d7d7d7;
    border: 1px solid #3f3f46 !important;
}

body.cf-theme a[name=comments] {
    color: #548bff !important;
}

body.cf-theme ._name,
body.cf-theme .caption {
    color: #548bff;
}


body.cf-theme .format-humantime,
body.cf-theme ._catalogBlogEntry ._name i[class^="icon-"] {
    color: #d7d7d7 !important;
}

body.cf-theme #pageContent>div>div.datatable>div:nth-child(6)>table,
body.cf-theme #pageContent>div>div.datatable>div:nth-child(6)>table {
    background: #27272a !important;
}

body.cf-theme .datatable .dark {
    background: #27272a !important;
}

body.cf-theme #facebox>div>div>div>div>div>div:nth-child(6)>table {
    background: #27272a !important;
}

body.cf-theme div.ttypography .MathJax {
    color: #fff !important;
}


body.cf-theme table>thead>tr>th {
    border: 2px solid #3f3f46 !important;
    background-color: #27272a !important;
    color: #006FEE !important;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(6)>table {

    background-color: #3f3f46 !important;
}

body.cf-theme a {
    text-decoration: none;
    transition: filter 0.3s;
}

body.cf-theme a:hover {
    filter: brightness(150%);
}

body.cf-theme {
    background: #111;
    color: #ECEDEE;
}

body.cf-theme .roundbox {
    border: 2px solid #3f3f46;
    background: #18181b;
    border-radius: var(--border-radius);
}

body.cf-theme #body>div.roundbox.menu-box.borderTopRound.borderBottomRound>div>ul>li.current>a {
    color: #ECEDEE;
}

body.cf-theme .menu-box div ul li a {
    color: #aeaeb5;
}

body.cf-theme .menu-box div ul li a:hover {
    color: #ECEDEE;
}

body.cf-theme #sidebar>div:nth-child(1)>div:nth-child(2)>div>span.contest-state-phase {
    color: #3994ff;
}


body.cf-theme a:link {
    color: #4ea0ff;
}

body.cf-theme a:visited {
    color: #9c69ff;
}

body.cf-theme .menu-box .search,
body.cf-theme .roundbox .roundbox-lt,
body.cf-theme .roundbox .roundbox-rt,
body.cf-theme .roundbox .roundbox-lb,
body.cf-theme .roundbox .roundbox-rb,
body.cf-theme .lt,
body.cf-theme .rt,
body.cf-theme .lb,
body.cf-theme .rb,
body.cf-theme .ilt,
body.cf-theme .irt {
    visibility: hidden;
    height: 0;
    width: 0;
}

body.cf-theme #pageContent>div:nth-child(3)>div>div.info>ul>li:nth-child(7)>span {
    color: #17c964 !important;
}

body.cf-theme #pageContent>div:nth-child(3)>div>div.info>div>div:nth-child(3)>div {
    font-weight: 700;
    color: #ECEDEE !important;
}

body.cf-theme #pageContent>div:nth-child(3)>div>div.info>div>div:nth-child(3)>div>a {
    font-weight: 500;
}



body.cf-theme #pageContent>div.second-level-menu>ul>li>a {
    color: #a1a1aa !important;
}

body.cf-theme #pageContent>div.second-level-menu>ul>li.selectedLava>a {
    color: #ECEDEE !important;
}

body.cf-theme #pageContent>div.second-level-menu>ul>li>a:hover {
    color: #ECEDEE !important;
}

body.cf-theme #pageContent>div.second-level-menu>ul>li.backLava {
    background: #52525b;
    border-radius: 4px;
}

body.cf-theme #pageContent>div.second-level-menu>ul>li.backLava>div.leftLava {
    background: transparent;
}

body.cf-theme .second-level-menu-list {
    overflow: visible;
}


body.cf-theme #sidebar>div>div.caption.titled {
    border-bottom: 2px solid #3f3f46;
    color: #006FEE;
}

body.cf-theme #sidebar>div>table>tbody {
    border-color: #3f3f46;
}

body.cf-theme .roundbox .rtable td,
body.cf-theme .roundbox .rtable th {
    border-color: #3f3f46;
}

body.cf-theme #pageContent>div:nth-child(3)>div>div.title-photo>div {
    border: 2px solid #3f3f46 !important;
    border-radius: var(--border-radius);
}

body.cf-theme #sidebar>div>table>tbody>tr:nth-child(2n)>td {
    background-color: #27272a;
}

body.cf-theme #sidebar>div>table>tbody>tr:nth-child(2n + 1)>td {
    background-color: #18181b;
}

body.cf-theme #sidebar>div>table>tbody>tr {
    height: 30px;
}

body.cf-theme #sidebar>div>div.bottom-links {
    background-color: #18181b;
    border-top: 2px solid #3f3f46 !important;
}

body.cf-theme #sidebar>div {
    overflow: hidden;
}

body.cf-theme #sidebar>div:nth-child(10)>form>div:nth-child(2)>label {
    padding-right: 0 !important;
}

body.cf-theme #sidebar>div:nth-child(10)>form>div:nth-child(2)>label>input {
    width: 180px !important;
}

body.cf-theme #sidebar>div:nth-child(10)>form>div:nth-child(3)>input[type=submit] {
    cursor: pointer;
    border: none;
    outline: none;
    margin: 0;
    border-radius: 4px;
    color: #e8e8e8 !important;
    background: #0254b0;
}

body.cf-theme #sidebar>div:nth-child(10)>form>div:nth-child(3)>input[type=submit]:hover {
    background: #0079ff;
}


body.cf-theme #sidebar>div>form>div:nth-child(2)>label>input {
    outline: none;
    height: 20px;
    color: #d9d9d9 !important;
    padding: 2px 4px;
    background: #2a2a2a;
    border-radius: 4px;
    border: 1px solid #515151;
}

*::-webkit-scrollbar {
    width: 5px !important;
}

*::-webkit-scrollbar-track {
    background: transparent !important;
}

*::-webkit-scrollbar-thumb {
    background-color: #535353 !important;
    border-radius: 20px !important;
}

body.cf-theme>div.button-up {
    visibility: hidden;
    height: 0;
}


/* Header */
/* Notification */
body.cf-theme #header>div.lang-chooser>div:nth-child(1)>div>div.header-bell__img {
    opacity: 0.8;
    height: 18px;
    width: 18px;
    margin-bottom: 1px;
    background-size: cover;
    background-image: url("https://codeforces.com/predownloaded/dc/d2/dcd2185fc03f77db707e0ac862d89badd28aeb21.png");
}

/* Logo */
body.cf-theme #header>div:nth-child(1)>a {
    height: 65px;
    display: flex;
    background-size: cover;
    filter: none;
    background-image: url("https://codeforces.com/predownloaded/d6/a5/d6a5b8dde8c991cad611845e242bb31dd57b8dfa.png");
}

body.cf-theme #header>div:nth-child(1)>a>img {
    visibility: hidden;
}

/* Footer */
body.cf-theme #footer>div.footer-logo-div>* {
    margin-bottom: 20px;
}

body.cf-theme #footer>div.footer-logo-div>a:nth-child(1) {
    display: flex;
    background-size: contain;
    height: 60px;
    width: 60px;
    margin-right: 30px;
    background-image: url("https://codeforces.com/predownloaded/d0/db/d0dbaa1a7b5467170009bb8b87bdee479e092a6e.png");
}

body.cf-theme #footer>div.footer-logo-div>a:nth-child(1)>img,
body.cf-theme #footer>div.footer-logo-div>a.itmo-logo>img {
    display: none;
}

body.cf-theme #footer>div.footer-logo-div>a.itmo-logo {
    display: flex;
    height: 50px;
    width: 180px;
    background-size: 100% 100%;
    background-image: url("https://codeforces.com/predownloaded/d0/d6/d0d6643d7ecef83014e0e9476e5e95166876ddfe.png");
}



/*  */

body.cf-theme #pageContent>div>div>div.content>div,
body.cf-theme #pageContent>div>div>div.content>div>h2 {
    color: #e8e8e8 !important;
}

body.cf-theme #pageContent>div:nth-child(1)>div>div.content>div>a {
    color: #e8e8e8 !important;
}

body.cf-theme #pageContent>div>div>div.title>a>p {
    color: #1b85ff !important;
}

body.cf-theme #pageContent>div>div>div.content>div>p>a {
    border-radius: 5px;
    padding: 2px;
}

body.cf-theme #pageContent>div>div>div.content>div>p>a:link {
    color: #1b85ff !important;
}

body.cf-theme #pageContent>div>div>div.content>div>p>a:visited {
    color: #9c69ff !important;
}

body.cf-theme #pageContent>div>div>div.content>div>p>a:hover {
    background: rgba(109, 144, 255, .32);
}

body.cf-theme #header>div.lang-chooser>div:nth-child(2)>a:nth-child(1):visited {
    color: #1b85ff !important;
}

body.cf-theme #sidebar>div:nth-child(5)>div.personal-sidebar>div:nth-child(2)>ul.nav-links>li>a:visited {
    color: #1b85ff !important;
}

body.cf-theme #sidebar>div:nth-child(5)>div.personal-sidebar>div:nth-child(2)>ul.nav-links>li>a,
body.cf-theme #header>div.lang-chooser>div:nth-child(2)>a,
body.cf-theme #sidebar>div:nth-child(1)>div:nth-child(2)>div>a,
body.cf-theme #sidebar>div>div.bottom-links>table>tbody>tr>td>a,
body.cf-theme #sidebar>div>table>tbody>tr>td>a,
body.cf-theme #pageContent>div>div>div.roundbox.meta.borderTopRound.borderBottomRound>div.right-meta>ul>li>a {
    text-decoration: none;
}


body.cf-theme #pageContent>div>div.has-topic-id.topic {
    border: 2px solid #3f3f46;
    background: #18181b;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
}

body.cf-theme #pageContent>div>div.has-topic-id.topic>div.info {
    padding-bottom: 21px;
}

body.cf-theme #pageContent>div>div.has-topic-id.topic>div.content>div,
body.cf-theme #pageContent>div>div.has-topic-id.topic>div.content {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

body.cf-theme #pageContent>div>div.has-topic-id.topic>div:nth-child(4) {
    padding-top: 12px;
}

body.cf-theme #pageContent>div>div.has-topic-id.topic>div {
    padding-left: 15px;
    padding-right: 15px;
    border: none;
}

body.cf-theme #pageContent>div>div.has-topic-id.topic>div:nth-last-child(3) {
    padding-left: 0px;
    padding-right: 0px;
}

body.cf-theme #pageContent>div>div.has-topic-id.topic>div:nth-last-child(4) {
    padding-bottom: 15px;
}

body.cf-theme #pageContent>div>div.has-topic-id.topic>div.title {
    padding-top: 15px;
}

body.cf-theme #pageContent>div>div.has-topic-id.topic>div.roundbox.meta.borderTopRound.borderBottomRound {
    border-top: 2px solid #3f3f46;
    background: #27272a;
    margin: 0px;
    margin-top: 6px;
    padding-bottom: 3px;
    padding-top: 3px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody {
    border-color: #3f3f46;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody>tr:nth-child(2n)>td {
    background-color: #27272a;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody>tr:nth-child(2n + 1)>td {
    background-color: #18181b;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody>tr:nth-child(1) {
    background-color: #18181b;
}

body.cf-theme #pageContent>div.contestList>div.datatable {
    border: 2px solid #3f3f46;
    background: #18181b;
    background-color: #18181b !important;
    padding-bottom: 0 !important;
    border-radius: var(--border-radius);
}

body.cf-theme #pageContent>div.contestList>div.datatable>div {
    padding: 0;
    margin: 0 !important;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody td,
body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody th {
    border-color: #3f3f46;
    padding-top: 9px;
}

body.cf-theme #pageContent>div:nth-child(3)>div>div.title-photo>div {
    border: 2px solid #3f3f46 !important;
    border-radius: var(--border-radius);
}

body.cf-theme #pageContent>div.contestList>div.datatable>div:nth-child(5) {
    background: transparent;
    color: #3196fc;
    padding: 10px !important;
    border-bottom: 2px solid #3f3f46 !important;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody>tr>td>a.red-link {
    background-color: #f00;
    color: #efefef !important;
    text-decoration: none;
    border-radius: 3px;
    padding-bottom: 3px;
    padding-left: 7px;
    padding-right: 7px;
    margin-left: 12px;
    margin-right: 12px;
    padding-top: 3px
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody>tr>td>a.red-link:hover {
    background-color: #f55;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody>tr>td>* {
    position: unset;
    display: block;
    padding-top: 3px;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody>tr>td>span.welldone {
    color: #17c964 !important;
}

body.cf-theme #pageContent>div.contestList>div.datatable {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    overflow: hidden;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>div {
    visibility: hidden;
    height: 0;
    width: 0;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody>tr>td:nth-child(2)>a {
    background: #f000;
    font-weight: 700;
    padding: 1px;
}

body.cf-theme #pageContent>div.contestList>div.datatable>div>table>tbody>tr>td:nth-child(2)>br {
    display: none;
}




body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody {
    border-color: #3f3f46;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody>tr:nth-child(2n)>td {
    background-color: #27272a !important;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody>tr:nth-child(2n + 1)>td {
    background-color: #18181b !important;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody>tr:nth-child(1) {
    background-color: #18181b !important;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable {
    border: 2px solid #3f3f46;
    background: #18181b;
    background-color: #18181b !important;
    padding-bottom: 0 !important;
    border-radius: var(--border-radius);
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div {
    padding: 0;
    margin: 0 !important;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody td,
body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody th {
    border-color: #3f3f46;
    padding-top: 9px;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div:nth-child(5) {
    background: transparent;
    color: #3196fc;
    padding: 10px !important;
    border-bottom: 2px solid #3f3f46 !important;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody>tr>td>a.red-link {
    background-color: #f00;
    color: #efefef !important;
    text-decoration: none;
    border-radius: 3px;
    padding-bottom: 3px;
    padding-left: 7px;
    padding-right: 7px;
    margin-left: 12px;
    margin-right: 12px;
    padding-top: 3px
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody>tr>td>a.red-link:hover {
    background-color: #f55;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody>tr>td>* {
    position: unset;
    display: block;
    padding-top: 3px;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody>tr>td>span.welldone {
    color: #17c964 !important;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    overflow: hidden;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>div {
    visibility: hidden;
    height: 0;
    width: 0;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody>tr>td:nth-child(2)>a {
    background: #f000;
    font-weight: 700;
    padding: 1px;
}

body.cf-theme #pageContent>div.contestList>div.contests-table>div.datatable>div>table>tbody>tr>td>br {
    display: none;
}

body.cf-theme #past-contests-filter-form>div>input[type=submit] {
    cursor: pointer;
    border: none;
    outline: none;
    margin: 5px;
    margin-top: 0 !important;
    border-radius: 5px;
    padding-left: 10px !important;
    padding-right: 10px !important;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    color: #e8e8e8 !important;
    background: #0254b0;
}

body.cf-theme #past-contests-filter-form>div>input[type=submit]:hover {
    background: #0079ff;
}


body.cf-theme #past-contests-filter-form>div>div>div.optWrapper {
    border: 2px solid #3f3f46;
    background: #18181b !important;
    border-radius: var(--border-radius);
}

body.cf-theme #past-contests-filter-form>div>div>div.optWrapper>ul>li:hover {
    background: #3b3b3d !important;
}

body.cf-theme #past-contests-filter-form>div>div>div.optWrapper>ul>li {
    border-bottom: 1px solid #3f3f46;
}

body.cf-theme #filterSubstring {
    outline: none;
    height: 24px;
    color: #d9d9d9 !important;
    padding: 5px 5px;
    background: #2a2a2a;
    border-radius: 4px;
    margin-top: 5px;
    border: 1px solid #515151;
    margin-bottom: 5px;
}

body.cf-theme #past-contests-filter-form>div>div>p.CaptionCont.SelectBox {
    border: 1px solid #515151 !important;
    background: #18181b !important;
    cursor: pointer;
    border-radius: 5px;
}

body.cf-theme #past-contests-filter-form>div>div>p.CaptionCont.SelectBox>* {
    cursor: pointer;
}

body.cf-theme #past-contests-filter-form>div>div>p.CaptionCont.SelectBox>label>i {
    background-size: cover;
    background-image: url(https://codeforces.com/predownloaded/08/77/08775a3efeec7cef192328fda955e52040c7d18b.png);
}

body.cf-theme #past-contests-filter-form>div>div>div>ul>li.opt.selected>span>i {
    background-color: #0079ff;
}

body.cf-theme #past-contests-filter-form>div>label {
    color: #4569b4;
}




body.cf-theme .problems>tbody {
    border-color: #3f3f46;
}

body.cf-theme .problems>tbody>tr:nth-child(2n)>td {
    background-color: #27272a;
}

body.cf-theme .problems>tbody>tr:nth-child(2n + 1)>td {
    background-color: #18181b;
}

body.cf-theme .problems>tbody>tr:nth-child(1) {
    background-color: #18181b;
}

body.cf-theme #pageContent>div.datatable {
    border: 1px solid #3f3f46;
    background: #18181b;
    background-color: #18181b !important;
    padding-bottom: 0 !important;
    border-radius: var(--border-radius);
}

body.cf-theme #pageContent>div.datatable>div {
    padding: 0;
    margin: 0 !important;
}

body.cf-theme .problems>tbody td,
body.cf-theme .problems>tbody th {
    border-color: #3f3f46;
    padding-top: 9px;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(5) {
    background: transparent;
    color: #3196fc;
    padding: 10px !important;
    border-bottom: 1px solid #3f3f46 !important;
}

body.cf-theme .problems>tbody>tr>td>a.red-link {
    background-color: #f00;
    color: #efefef !important;
    text-decoration: none;
    border-radius: 3px;
    padding-bottom: 3px;
    padding-left: 7px;
    padding-right: 7px;
    margin-left: 12px;
    margin-right: 12px;
    padding-top: 3px
}

body.cf-theme .problems>tbody>tr>td>a.red-link:hover {
    background-color: #f55;
}

body.cf-theme .problems>tbody>tr>td>* {
    /*     position: unset; */
    /*     display: block; */
    padding-top: 3px;
}

body.cf-theme .problems>tbody>tr>td>span.welldone {
    color: #17c964 !important;
}

body.cf-theme #pageContent>div.datatable {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    overflow: hidden;
}

body.cf-theme .problems>tbody>tr>td:nth-child(2)>a {
    background: #f000;
    font-weight: 700;
    padding: 1px;
}

body.cf-theme .problems>tbody>tr>td:nth-child(2)>br {
    display: none;
}

body.cf-theme .problems {
    border-collapse: unset;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(6)>table.problems>tbody>tr.accepted-problem:nth-child(2n)>td.left {
    border-left: 6px solid #0fa450 !important;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(6)>table.problems>tbody>tr.accepted-problem:nth-child(2n)>td.act {
    background-color: #0fa450 !important;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(6)>table.problems>tbody>tr.accepted-problem:nth-child(2n + 1)>td.left {
    border-left: 6px solid #0e8c45 !important;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(6)>table.problems>tbody>tr.accepted-problem:nth-child(2n + 1)>td.act {
    background-color: #0e8c45 !important;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(6)>table.problems>tbody>tr.rejected-problem:nth-child(2n)>td.left {
    border-left: 6px solid #8f0004 !important;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(6)>table.problems>tbody>tr.rejected-problem:nth-child(2n)>td.act {
    background-color: #8f0004 !important;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(6)>table.problemstbody>tr.rejected-problem:nth-child(2n + 1)>td.left {
    border-left: 6px solid #7e0004 !important;
}

body.cf-theme #pageContent>div.datatable>div:nth-child(6)>table.problems>tbody>tr.rejected-problem:nth-child(2n + 1)>td.act {
    background-color: #7e0004 !important;
}

body.cf-theme table.problems>tbody>tr.accepted-problem:nth-child(2n)>td.left {
    border-left: 6px solid #0fa450 !important;
}

body.cf-theme table.problems>tbody>tr.accepted-problem:nth-child(2n)>td.act {
    background-color: #0fa450 !important;
}

body.cf-theme table.problems>tbody>tr.accepted-problem:nth-child(2n + 1)>td.left {
    border-left: 6px solid #0e8c45 !important;
}

body.cf-theme table.problems>tbody>tr.accepted-problem:nth-child(2n + 1)>td.act {
    background-color: #0e8c45 !important;
}

body.cf-theme table.problems>tbody>tr.rejected-problem:nth-child(2n)>td.left {
    border-left: 6px solid #8f0004 !important;
}

body.cf-theme table.problems>tbody>tr.rejected-problem:nth-child(2n)>td.act {
    background-color: #8f0004 !important;
}

body.cf-theme table.problemstbody>tr.rejected-problem:nth-child(2n + 1)>td.left {
    border-left: 6px solid #7e0004 !important;
}

body.cf-theme table.problems>tbody>tr.rejected-problem:nth-child(2n + 1)>td.act {
    background-color: #7e0004 !important;
}

body.cf-theme #pageContent>div.datatable>div>table>tbody>tr>td>div>div>a {
    text-decoration: none;
}

body.cf-theme #pageContent>div.datatable>div>table>tbody>tr>td>a {
    text-decoration: none;
}

body.cf-theme #pageContent>div.datatable>div>table>tbody>tr>td>div>div.notice {
    color: #c9c9c9 !important;
}



body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody {
    border-color: #3f3f46;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody>tr:nth-child(2n)>td {
    background-color: #27272a;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody>tr:nth-child(2n + 1)>td {
    background-color: #18181b;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody>tr:nth-child(1) {
    background-color: #18181b;
}

body.cf-theme #pageContent>div>div.datatable {
    border: 2px solid #3f3f46;
    background: #18181b;
    background-color: #18181b !important;
    padding-bottom: 0 !important;
    border-radius: var(--border-radius);
}

body.cf-theme #pageContent>div>div.datatable>div {
    padding: 0;
    margin: 0 !important;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody td,
body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody th {
    border-color: #3f3f46;
    padding-top: 9px;
}

body.cf-theme #pageContent>div>div.datatable>div:nth-child(5) {
    background: transparent;
    color: #3196fc;
    padding: 10px !important;
    border-bottom: 2px solid #3f3f46 !important;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody>tr>td>a.red-link {
    background-color: #f00;
    color: #efefef !important;
    text-decoration: none;
    border-radius: 3px;
    padding-bottom: 3px;
    padding-left: 7px;
    padding-right: 7px;
    margin-left: 12px;
    margin-right: 12px;
    padding-top: 3px
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody>tr>td>a.red-link:hover {
    background-color: #f55;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody>tr>td>* {
    /*     position: unset; */
    /*     display: block; */
    padding-top: 3px;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody>tr>td>span.welldone {
    color: #17c964 !important;
}

body.cf-theme #pageContent>div>div.datatable {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    overflow: hidden;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody>tr>td:nth-child(2)>a {
    background: #f000;
    font-weight: 700;
    padding: 1px;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table>tbody>tr>td:nth-child(2)>br {
    display: none;
}

body.cf-theme #pageContent>div>div.datatable>div>table.problem-questions-table {
    border-collapse: unset;
}

body.cf-theme #pageContent>div>div.datatable>div>table>tbody>tr>td>div>div>a {
    text-decoration: none;
}

body.cf-theme #pageContent>div>div.datatable>div>table>tbody>tr>td>a {
    text-decoration: none;
}

body.cf-theme #pageContent>div>div.datatable>div>table>tbody>tr>td>div>div.notice {
    color: #c9c9c9 !important;
}









/* 

Page contest

*/

/* Statement */
body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div>div>div>div>pre {
    background: #27272a;
}

body.cf-theme .problem-statement .test-example-line-even {
    background-color: #3f3f46 !important;
}

body.cf-theme .problem-statement .test-example-line-odd {
    background-color: #0000 !important;
}

body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div>div>div>div>pre * {
    color: #fffd00 !important;
    font-size: 14px;
    height: 18px;
    display: flex;
    align-items: center;
}

body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div>div>div>div>pre {
    color: #fffd00 !important;
}

body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div * {
    color: #ECEDEE !important;
}

body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div img {
    background-color: #7c7c7c !important;
}

/* Code fragment in statement*/ 

body.cf-theme #pageContent > div.problemindexholder > div.ttypography  pre.lstlisting {
    background: #27272a;
    border-radius: 5px;
    margin: 0 0 15px 0 !important;
    border: 1px solid #3f3f46 !important;
}

body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div .prettyprint .pun,
body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div .prettyprint .opn,
body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div .prettyprint .clo {
    color: #ff6f00 !important;
}

body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div .prettyprint .pln {
    color: #fff !important;
}

body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div .prettyprint .kwd {
    color: #0087ff !important;
}

body.cf-theme #pageContent>div.problemindexholder>div.ttypography>div .prettyprint .typ {
    color: #f0f !important;
}

/* All problems */

body.cf-theme .compact-problemset .problem-frames .problemindexholder>div.ttypography>div>div>div>div>pre {
    background: #27272a;
}

body.cf-theme .problem-statement .test-example-line-even {
    background-color: #3f3f46 !important;
}

body.cf-theme .problem-statement .test-example-line-odd {
    background-color: #0000 !important;
}

body.cf-theme .compact-problemset .problem-frames .problemindexholder>div.ttypography>div .title,
body.cf-theme .compact-problemset .problem-frames .problemindexholder>div.ttypography>div .section-title {
    color: rgb(157, 238, 255) !important;
}

body.cf-theme .compact-problemset .problem-frames .problemindexholder>div.ttypography>div>div>div>div>pre * {
    color: #fffd00 !important;
    font-size: 14px;
    height: 18px;
    display: flex;
    align-items: center;
}

body.cf-theme .compact-problemset .problem-frames .problemindexholder>div.ttypography>div>div>div>div>pre {
    color: #fffd00 !important;
}

body.cf-theme .compact-problemset .problem-frames .problemindexholder>div.ttypography>div * {
    color: #ECEDEE !important;
}

body.cf-theme .compact-problemset .problem-frames .problemindexholder>div.ttypography>div img {
    background-color: #7c7c7c !important;
}




/* Sidebar */
body.cf-theme #sidebar>div.roundbox.sidebox.sidebar-menu.borderTopRound>ul>li {
    border: 2px solid #3f3f46;
    background: #18181b;
    border-radius: 5px;
}

body.cf-theme #sidebar>div.roundbox.sidebox.sidebar-menu.borderTopRound>ul>li * {
    color: #ECEDEE !important;
}

body.cf-theme #sidebar>div.roundbox.sidebox.sidebar-menu.borderTopRound>ul>li img {
    border-radius: 3px;
    margin-right: 2px;
}

body.cf-theme #sidebar>div.roundbox.sidebox.sidebar-menu.borderTopRound>ul>li .resource-locale {
    color: #979797 !important;
}

body.cf-theme div:has(> .tag-box) {
    border: 2px solid #3f3f46;
    background-color: #18181b !important;
}

body.cf-theme #sidebar>div:nth-child(12)>div:nth-child(2)>div.roundbox.borderTopRound.borderBottomRound>span>img {
    border-radius: 3px;
}

body.cf-theme #sidebar>div:nth-child(1)>table>tbody>tr:nth-child(1) * {
    color: #ECEDEE !important;
}

body.cf-theme #sidebar>div:nth-child(1)>table>tbody>tr:nth-child(2) * {
    color: #0079ff !important;
}

body.cf-theme #sidebar>div:nth-child(1)>table>tbody>tr:nth-child(3) * {
    color: #7c7c7c !important;
}

/* Submit */

body.cf-theme #editor {
    border: 1px solid #3f3f46 !important;
    box-sizing: border-box;
}

body.cf-theme #editor>div.ace_gutter>div.ace_layer.ace_gutter-layer.ace_folding-enabled {
    color: #e2e2e2 !important;
    background: #2a2a2a;
}

body.cf-theme .ace-chrome .ace_marker-layer .ace_selection {
    background: rgb(0, 85, 196) !important;
    ;
}

body.cf-theme .ace-chrome .ace_storage,
body.cf-theme .ace-chrome .ace_keyword,
body.cf-theme .ace-chrome .ace_meta.ace_tag {
    color: rgb(255, 8, 219) !important;
}

body.cf-theme .ace-chrome .ace_support.ace_function {
    color: rgb(31, 217, 255) !important;
}

body.cf-theme .ace_line {
    color: #d9d9d9;
}

body.cf-theme .ace_scroller {
    background-color: #18181b;
}

body.cf-theme .ace_active-line {
    background: rgb(71, 71, 71) !important;
    ;
    color: white;
}

body.cf-theme .ace_cursor {
    color: white !important;
    ;
}

body.cf-theme .ace_scrollbar {
    background: #2a2a2a;
}

body.cf-theme #editor {
    background: #2a2a2a;
}

body.cf-theme #script-ace {
    outline: none !important;
}

body.cf-theme .ace_content {
    box-sizing: border-box;
    outline: none;
    color: #d9d9d9 !important;
    background: #2a2a2a;
    border-radius: 4px;
    border: 1.5px solid #515151;
}

/* My submitions */

body.cf-theme #program-source-text-copy {
    cursor: pointer;
    color: #4ea0ff;
    text-decoration: none;
}

body.cf-theme .highlighted-row td {
    background-color: #18181b !important;
}

body.cf-theme #pageContent>div {
    overflow: hidden;
}

body.cf-theme #pageContent>div>div:nth-child(6)>table>tbody>tr>th {
    border: 1px solid #3f3f46 !important;
    background-color: #18181b !important;
}

body.cf-theme #pageContent>div>div:nth-child(6)>table>tbody>tr>td {
    border: 1px solid #3f3f46;
    background-color: #18181b;
}

body.cf-theme #pageContent>div>div:nth-child(6)>table>tbody>tr:nth-last-child(1)>td {
    border-bottom: none !important;
}

body.cf-theme #pageContent>div>div:nth-child(6)>table>tbody>tr:nth-child(1)>th {
    border-top: none !important;
}

body.cf-theme #pageContent>div>div:nth-child(6)>table>tbody>tr>th:nth-last-child(1),
body.cf-theme #pageContent>div>div:nth-child(6)>table>tbody>tr>td:nth-last-child(1) {
    border-right: none !important;
}

body.cf-theme #pageContent>div>div:nth-child(6)>table>tbody>tr>th:nth-child(1),
body.cf-theme #pageContent>div>div:nth-child(6)>table>tbody>tr>td:nth-child(1) {
    border-left: none !important;
}

body.cf-theme #pageContent>div>div:nth-child(6)>table.problems>tbody>tr>td,
body.cf-theme #pageContent>div>div:nth-child(6)>table.problems>tbody>tr>th {
    border: 1px solid #3f3f46 !important;
}

body.cf-theme #pageContent>div:nth-child(10)>div.datatable {
    box-sizing: border-box;
}

body.cf-theme .verdict-rejected,
body.cf-theme .verdict-unsuccessful-challenge,
body.cf-theme .cell-rejected {
    color: #4fa3ff !important;
}

body.cf-theme .verdict-accepted,
body.cf-theme .cell-accepted,
body.cf-theme .cell-passed-system-test {
    color: #00ff6e !important;
}


/* Launching a viral app */

body.cf-theme textarea.terms {
    background-color: #ffff3e;
    color: black !important;
    font-size: 1.2rem;
}


/* Test Package page */

/* The colors of the code editor */
body.cf-theme .prettyprint .com {
    color: #f00;
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
    color: #00c7ff;
}

body.cf-theme .prettyprint .typ {
    color: #f0f;
}

body.cf-theme .prettyprint .str {
    color: #0f0;
}

body.cf-theme .prettyprint .lit {
    color: #0ff;
}

body.cf-theme .ace-chrome .ace_constant.ace_numeric {
    color: #007bff !important;
}

body.cf-theme .ace-chrome .ace_string {
    color: #4cff73 !important;
}


/* Colors for verdicts on each test */

body.cf-theme #pageContent>div.tests-placeholder>div>div>div.text>pre,
body.cf-theme #pageContent div.file.input-view>div.text>pre,
body.cf-theme #pageContent div.file.output-view>div.text>pre,
body.cf-theme #pageContent div.file.answer-view>div.text>pre,
body.cf-theme #pageContent div.file.checker-comment-view>div.text>pre {
    background: #303030 !important;
    color: #fffd00 !important;
}

body.cf-theme .verdict_type.welldone {
    color: #00ff6e;
}

body.cf-theme #pageContent > div > a:has(>i.icon-caret-right),
body.cf-theme #pageContent > div > a:has(>i.icon-caret-down) {
    color: white !important;
}

/* popup block */
body.cf-theme .popup,
body.cf-theme .popup>.content,
body.cf-theme .popup>.close {
    background: #303030 !important;
}

body.cf-theme #facebox>div>div>div>pre>code>ol {
    background: #393939 !important;
}

body.cf-theme #facebox>div>div>div>div.test-for-popup>div>div>pre {
    background: #303030 !important;
    color: #fffd00 !important;
    padding: 5px;
    line-height: 15px;
}


/* Position page */
body.cf-theme .page-index.active {
    color: #fff;
}

/* The group's page */

body.cf-theme .groupName {
    color: #fff !important;
}

body.cf-theme td:has(>.groupName)+td+td>span {
    color: #008fff !important;
}




/* Favourites */
body.cf-theme #pageContent>div:nth-child(2)>div div:nth-child(6)>table>tbody>tr:has(>.top)>th,
body.cf-theme #pageContent>div:nth-child(2)>div div:nth-child(6)>table>tbody>tr[data-contestid]:nth-child(2n+1)>td,
body.cf-theme #pageContent>div.roundbox.borderTopRound.borderBottomRound>div>div>div.datatable>div:nth-child(6)>table>tbody>tr {
    border: 1px solid #3f3f46;
    background-color: #18181b !important;
}

body.cf-theme #pageContent>div:nth-child(2)>div div:nth-child(6)>table>tbody>tr>td,
body.cf-theme #pageContent>div.roundbox.borderTopRound.borderBottomRound>div>div>div.datatable>div:nth-child(6)>table>tbody>tr>td,
body.cf-theme #pageContent>div.roundbox.borderTopRound.borderBottomRound>div>div>div.datatable>div:nth-child(6)>table>tbody>tr>th {
    border: 1px solid #3f3f46;
}

/* API */

body.cf-theme div.alert-info {
    text-shadow: none;
    color: #c1eaff;
    background-color: #0af;
    border-color: #23daff;
}

body.cf-theme div.ttypography h1,
body.cf-theme div.ttypography h2,
body.cf-theme div.ttypography h3,
body.cf-theme div.ttypography h4 {
    color: #c1eaff;
}

body.cf-theme .ttypography {
    color: white !important;
}

/* address */

body.cf-theme .highlight-blue {
    border: 1px solid #7f9ddc;
    background-color: #001831 !important;
}

body.cf-theme .highlight-blue .caption.titled {
    border-bottom: 2px solid #7f9ddc !important;
}


/* Blogs */

body.cf-theme .collapsible-topic.collapsed .content .collapsible-topic-options:before {
    background-image: linear-gradient(#fff0, #18181b);
    bottom: calc(100% + 10px);
    height: 60px;
}

body.cf-theme .spoiler-content {
    border: 1px solid #0070e1;
    background-color: #00264d;
}

body.cf-theme .spoiler-content a {
    color: #c3dfff !important;
}

body.cf-theme .spoiler-content a:hover {
    background: #5581b3 !important;
}

body.cf-theme #pageContent>div:nth-child(2)>div:nth-child(1)>h3>a {
    filter: invert(1) hue-rotate(180deg);
}

body.cf-theme #pageContent>div:nth-child(2)>div:nth-child(1)>h3>a:hover {
    filter: invert(0.6) hue-rotate(180deg);
}

body.cf-theme textarea {
    overflow: unset !important;
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



/* Teams */

body.cf-theme #pageContent>div.teamlist>div>div>div>table>tbody>tr:nth-child(1)>th.top,
body.cf-theme #pageContent>div.teamlist>div>div>table>tbody>tr:nth-child(1)>th.top {
    border: 1px solid #464646;
    background-color: #202020 !important;
}

body.cf-theme #pageContent>div.teamlist>div>div>div>table>tbody>tr:nth-child(2n + 1)>td,
body.cf-theme #pageContent>div.teamlist>div>div>table>tbody>tr:nth-child(2n + 1)>td {
    border: 1px solid #464646;
    background-color: #202020 !important;
}

body.cf-theme #pageContent>div.teamlist>div>div>div>table>tbody>tr:nth-child(2n)>td,
body.cf-theme #pageContent>div.teamlist>div>div>table>tbody>tr:nth-child(2n)>td {
    border: 1px solid #464646;
}

body.cf-theme .teamlist .datatable {
    border: 1px solid #464646;
    border-radius: 7px;
}



/* Comments */
body.cf-theme .comments label.show-archived,
body.cf-theme .comments label.show-archived * {
    color: white !important;
}

body.cf-theme .comment-table {
    border: none;
}

body.cf-theme .comment-table.highlight-blue {
    outline: 1px solid #34559b !important;
    border-radius: 10px;
}

body.cf-theme div.ttypography .tt {
    border: 1px solid #464646;
    background-color: #202020 !important;
    /*     border: 1px solid #fff; */
    /*     background-color: #ccc; */
}

body.cf-theme div.ttypography pre,
body.cf-theme div.ttypography code {
    color: #ffcaca;
    margin: 5px !important;
    line-height: 25px;
    /*     color: #db0000; */
}

body.cf-theme .comment-table {
    /*     border-radius: 15px; */
    box-sizing: border-box;
    width: 99%;
}

body.cf-theme .comment-table.highlight {
    /*     border: 1px solid #ff0; */
    border-radius: 10px;
    outline: 1.5px solid #8e8e00;
    background-color: #645000 !important;
}

body.cf-theme a.vote-for-comment:hover {
    filter: unset;
}

/* Hacking */

body.cf-theme #facebox>div>div>div>form>table>tbody>tr:nth-child(11)>td>div>div.alert.alert-danger.ttypography {
    border-radius: 10px;
    outline: 1.5px solid #8e8e00;
    background-color: #645000 !important;
}

body.cf-theme .challenge-box>.second-level-menu-list>li>a {
    color: #a1a1aa !important;
}

body.cf-theme .challenge-box>.second-level-menu-list>li.selectedLava>a {
    color: #ECEDEE !important;
}

body.cf-theme .challenge-box>.second-level-menu-list>li>a:hover {
    color: #ECEDEE !important;
}

body.cf-theme .challenge-box>.second-level-menu-list>li.backLava {
    background: #52525b;
    border-radius: 4px;
}

body.cf-theme .challenge-box>.second-level-menu-list>li.backLava>div.leftLava {
    background: transparent;
}

/* 

Company logo 

*/

/* rayan */
body.cf-theme div:has(>img[src="https://assets.codeforces.com/files/rayan-header.svg"]) {
    background-image: url(https://codeforces.com/predownloaded/d8/46/d8465e588c97afd953ac0269d4e39c42e18ce012.png);
    background-size: contain;    
}
body.cf-theme img[src="https://assets.codeforces.com/files/rayan-header.svg"] {
    visibility: hidden;
}

/* deltix */
body.cf-theme a:has(>img[src="https://assets.codeforces.com/images/deltix-hlogo.png"]) {
    background-image: url(https://codeforces.com/predownloaded/09/8d/098dd42c907072be9dc62dc11ad44fe28b02d19f.png);
    background-size: contain;    
    display: flex;;
    filter: none !important;
}
body.cf-theme img[src="https://assets.codeforces.com/images/deltix-hlogo.png"] {
    visibility: hidden;
}

/* hsu */
body.cf-theme a:has(>img[src="//assets.codeforces.com/images/hsu.png"]) {
    background-image: url(https://codeforces.com/predownloaded/e9/fd/e9fd2c18ae3d5c12cbfa93ff24cc7a12ed685a78.png);
    background-size: contain;    
    display: flex;
    filter: none !important;
}
body.cf-theme img[src="//assets.codeforces.com/images/hsu.png"] {
    visibility: hidden;
}


/* 

Notification

*/

body.cf-theme div.jGrowl div.jGrowl-notification,
body.cf-theme div.jGrowl div.jGrowl-closer {
    background-color: #ffe986 !important;
    border: 2px solid #ffd956 !important;
    color: #212121 !important;
}



/* 

Login

*/

body.cf-theme #pageContent > div > div > div.bottom-links {
    border-top: 2px solid #3f3f46;
    background: #18181b;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
}

body.cf-theme #pageContent > div > div > div.caption.titled {
    border-bottom: 2px solid #3f3f46;
}




/* General */

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

body.cf-theme input {
    outline: none;
    height: 20px;
    color: #d9d9d9 !important;
    padding: 2px 4px;
    background: #2a2a2a;
    border-radius: 4px;
    border: 1px solid #515151;
}

body.cf-theme input[type=checkbox] {
    cursor: pointer;
}


body.cf-theme input[type="file"] {
    font-size: 11px;
    font-family: sans-serif;
    cursor: pointer;
    padding: 0 !important;
    height: 24px !important;
}
body.cf-theme input[type="file"]::file-selector-button {
    color: #d9d9d9;
    background: #2a2a2a;
    border-radius: 4px;
    border: 1px solid #515151;
    height: 22px;
    cursor: pointer;
    transition: background 0.3s;
}
body.cf-theme input[type="file"]:hover::file-selector-button {
    background: #383838;
}


body.cf-theme input[type=submit],
body.cf-theme button {
    cursor: pointer;
    border: none;
    outline: none;
    margin: 0;
    border-radius: 4px;
    color: #f0f0f0 !important;
    background: #0254b0;
    height: 23px;
}


body.cf-theme input[name=sourceFile],
body.cf-theme input[name=inputFile],
body.cf-theme input[type="file"] {
    background: unset !important;
    border: none !important;
}

body.cf-theme input[name=inputFile] {
    margin-top: 5px;
    margin-bottom: 5px;
}

body.cf-theme input[type=submit]:hover,
body.cf-theme button:hover {
    background: #0079ff;
}


body.cf-theme .user-4000 {
    color: #fff !important;
}

body.cf-theme .user-legendary::first-letter {
    color: #fff !important;
}

body.cf-theme .user-orange {
    color: #ffb300 !important;
}

body.cf-theme .user-violet {
    color: #c000ff !important;
}

body.cf-theme .user-blue {
    color: #08f !important;
}

body.cf-theme .user-cyan {
    color: #00fff0 !important;
}

body.cf-theme .user-green {
    color: #00ff6e !important;
}

body.cf-theme .user-admin {
    color: #fff900 !important;
}

body.cf-theme .user-black {
    color: #ECEDEE !important;
}`;
    
    const style = document.createElement("style");
    style.textContent = css;
    document.documentElement.appendChild(style);


    


    const applyClass = () => {
        if (document.body) {
            document.body.classList.add("cf-theme");
        } else {
            requestAnimationFrame(applyClass);
        }
    };

    chrome.storage.sync.get("cfThemeEnabled", (data) => {
        if (data.cfThemeEnabled) {
            applyClass();
        }
    });
})();