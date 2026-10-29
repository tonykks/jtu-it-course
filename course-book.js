/* course-book.js — 장면 메모·스크립트(자세히 읽기)의 동작. Tony's Library 견본에서 옮김
   - 메모·스크립트가 있는 쪽만 맨 끝에서 이 파일을 불러온다 (기존 쪽 스크립트는 건드리지 않음)
   - 주소가 #read-장면id 이면 발표 화면(.shell)을 숨기고 <div id="book"> 안의 그 글만 보인다
   - 펼치기 마크 아이콘(#gu)이 쪽에 없으면 여기서 한 번 넣는다 */
(function(){
  if(!document.getElementById('gu')){
    var NS='http://www.w3.org/2000/svg';
    var holder=document.createElementNS(NS,'svg');
    holder.setAttribute('width','0');holder.setAttribute('height','0');
    holder.setAttribute('style','position:absolute');holder.setAttribute('aria-hidden','true');
    holder.innerHTML='<symbol id="gu" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#102a4c"/>'
      +'<g stroke="#8fd3d6" stroke-width="2.4" stroke-linecap="round"><line x1="15" y1="13" x2="32" y2="30"/><line x1="32" y1="9" x2="32" y2="30"/><line x1="49" y1="13" x2="32" y2="30"/></g>'
      +'<g fill="#8fd3d6"><circle cx="15" cy="13" r="3.2"/><circle cx="32" cy="9" r="3.2"/><circle cx="49" cy="13" r="3.2"/></g>'
      +'<path d="M31 36 Q21 31 10 34 V52 Q21 49 31 54 Z" fill="#f0a83c"/><path d="M33 36 Q43 31 54 34 V52 Q43 49 33 54 Z" fill="#f0a83c"/></symbol>';
    document.body.insertBefore(holder,document.body.firstChild);
  }

  var deck=document.querySelector('.shell'), title=document.getElementById('top-title');
  var books=[].slice.call(document.querySelectorAll('#book article'));
  if(!deck||!books.length)return;
  // 머리말 제목은 세 언어 칸으로 되어 있으므로 글자만 바꾸지 않고 통째로 보관했다가 되돌린다
  var base=title?title.innerHTML:'';
  function route(){
    var h=location.hash.slice(1), bk=null;
    books.forEach(function(b){var on=b.id===h;b.hidden=!on;if(on)bk=b;});
    deck.hidden=!!bk; document.body.classList.toggle('book',!!bk);
    if(title){if(bk)title.textContent=bk.getAttribute('data-title');else title.innerHTML=base;}
    if(bk){window.scrollTo(0,0);}
    else if(h){var el=document.getElementById(h);if(el)el.scrollIntoView();}
  }
  window.addEventListener('hashchange',route); route();
})();
