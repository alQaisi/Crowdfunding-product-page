var progress=document.querySelector(".overflow");
var totalBacked=document.querySelectorAll(".sectionOneChild")[0];
var totalBackers=document.querySelectorAll(".sectionOneChild")[1];
var twoInput=document.querySelector("#two_input");
var threeInput=document.querySelector("#three_input");
//
var card2QuantLarge=document.querySelector('.quant.two.large');
var card2QuantSmall=document.querySelector('.quant.two.small');
var rewardOneQuantLbl=document.querySelector('.first .quant');
var rewardOneQuant=rewardOneQuantLbl.textContent*1;
//
var card3QuantLarge=document.querySelector('.quant.three.large');
var card3QuantSmall=document.querySelector('.quant.three.small');
var rewardTwoQuantLbl=document.querySelector('.second .quant');
var rewardTwoQuant=rewardTwoQuantLbl.textContent*1;
//Bookmark button
var bookmark=document.querySelector('.bookmark');
bookmark.addEventListener('click',()=>{
    if(bookmark.classList.contains('bookmarked')){
        bookmark.classList.remove('bookmarked');
        bookmark.childNodes[3].textContent='Bookmark';
    }else{
        bookmark.classList.add('bookmarked');
        bookmark.childNodes[3].textContent='Bookmarked';
    }
});
//Menu & Menu Icon 
var menu=document.querySelector('.menu');
var menuIcon=document.querySelector("#menuIcon");
var menuOverlay=document.querySelector(".menu-overlay");
menuIcon.addEventListener('click',()=>{
    showOverlay(menuOverlay);
    resetMenu();
});
menuOverlay.addEventListener('click',(evt)=>{
    showOverlay(menuOverlay);
    resetMenu();
})
function resetMenu(){
    if(menuIcon.alt=='openMenu'){
        menuIcon.alt="closeMenu";
        menuIcon.src='./images/icon-close-menu.svg';
        window.addEventListener('resize', resetOverlayElements,false);
    }else{
        menuIcon.alt="openMenu";
        menuIcon.src='./images/icon-hamburger.svg';
    }
}
//Pledge & Thank
var overlay=document.querySelector('.overlay');
var thank=document.querySelector('.thank');
var thankBtn=document.querySelector('#thankBtn');
var pledge=document.querySelector('.pledge');
var closePledge=document.querySelector('#closePledge');
var selectedCard;
var selectedRadio;
closePledge.addEventListener('click',()=>{
    resetPledge();
    showOverlay(overlay,pledge);
});
thankBtn.addEventListener('click',()=>showOverlay(overlay,thank));
function pledgingFunc(evt,sectionNum,idRadio){
    if(overlay.classList.contains('hidden')){
        showOverlay(overlay,pledge);
        selectedRadio!=undefined?selectedRadio.checked=false:null;
    }
    if(idRadio!=undefined){
        selectedRadio=document.querySelector(`#${idRadio}`);
        selectedRadio.checked=true;
        resetPledge();
    }
    selectedCard!=undefined?selectedCard.classList.remove('selectedCard'):null;
    if(sectionNum!=undefined){
        selectedCard=document.querySelector(`.pledge .${sectionNum}`);
        selectedCard.classList.add('selectedCard');
    }
}
function backProject(cardNum){
    var rewardCost=0;
    if(cardNum>1){
        if(cardNum==2){
            rewardCost=twoInput.value;
            rewardOneQuant--;
            rewardOneQuantLbl.textContent=rewardOneQuant;
            card2QuantLarge.textContent=rewardOneQuant;
            card2QuantSmall.textContent=rewardOneQuant;
            if(rewardOneQuant==0){
                var card=document.querySelector('.mini-card.first');
                var pCard=document.querySelector('.mini-card.card2');
                card.classList.add('outOfStock');
                pCard.classList.add('outOfStock');
                var btn=document.querySelector('.mini-card.first button');
                btn.classList.add('outBtn');
                selectedRadio.checked=false;
                selectedRadio.disabled=true;
            }
        }else{
            rewardCost=threeInput.value;
            rewardTwoQuant--;
            rewardTwoQuantLbl.textContent=rewardTwoQuant;
            card3QuantLarge.textContent=rewardTwoQuant;
            card3QuantSmall.textContent=rewardTwoQuant;
            if(rewardTwoQuant==0){
                var card=document.querySelector('.mini-card.second');
                var pCard=document.querySelector('.mini-card.card3');
                card.classList.add('outOfStock');
                pCard.classList.add('outOfStock');
                var btn=document.querySelector('.mini-card.second button');
                btn.classList.add('outBtn');
                selectedRadio.checked=false;
                selectedRadio.disabled=true;
            }
        }
        rewardCost=(cardNum==2?twoInput.value:threeInput.value);
        var totalBackedNum=(totalBacked.textContent.slice(1)*1+Number(rewardCost))
        totalBacked.textContent='$'+totalBackedNum;
        progress.style.width=`${(totalBackedNum/100000)*100}%`;
    }
    totalBackers.textContent=totalBackers.textContent*1+1;
    resetPledge();
    showEffect('hide',pledge);
    setTimeout(() => {
        showEffect('show',thank);
    },350);
}
function resetPledge(){
    twoInput.value=25;
    threeInput.value=75;
}
//Show and hide overlay elements
function showEffect(type,element){
    if(type=='show'){
        element.classList.remove('hidden');
        setTimeout(() => {
            element.style.opacity="1";
        },15);
    }else{
        element.style.opacity="0";
            setTimeout(() => {
                element.classList.add('hidden'); 
            },250);
    }
}
function showOverlay(overlay,element){
    var type='hide';
    overlay.classList.contains('hidden')?type='show':type='hide';
    if(overlay.classList.contains('hidden')){
        type="show";
        document.body.style.overflowY='hidden';
    }else
        document.body.style.overflowY='scroll';
    element!=undefined?showEffect(type,element):null;
    showEffect(type,overlay);
}
function resetOverlayElements(){
    if(window.innerWidth>520){
        if(!menuOverlay.classList.contains('hidden')){
            menuIcon.alt="openMenu";
            menuIcon.src='./images/icon-hamburger.svg';
            showOverlay(menuOverlay);
        }
        window.removeEventListener('resize',resetOverlayElements,false);
    }
}
//
var inputTwo=document.querySelector("#two_input");
var inputThree=document.querySelector("#three_input");
inputTwo.addEventListener('focusout',enforceMinMax);
inputThree.addEventListener('focusout',enforceMinMax);
function enforceMinMax(evt){
    var element=evt.target;
    element.value=Number(element.value);
    if(element.value != ""){
      if(parseInt(element.value) < parseInt(element.min)){
        element.value = element.min;
      }
      if(parseInt(element.value) > parseInt(element.max)){
        element.value = element.max;
      }
    }
}