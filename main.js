//select element function
const selectelement = function(element){
    return document.querySelector(element);
};

let menutoggler = selectelement('.menutoggle');
let body = selectelement('body');

menutoggler.addEventListener('click',function(){
    body.classList.toggle('open');
});
// scrall reveal
window.sr = ScrollReveal();


sr.reveal('.animate-left',{
    origin:'left',
    duration:1000,
    distance:'25rem',
    delay:600
});

sr.reveal('.animate-right',{
    origin:'right',
    duration:1000,
    distance:'25rem',
    delay:600
});

sr.reveal('.animate-top',{
    origin:'top',
    duration:1000,
    distance:'25rem',
    delay:600
});

sr.reveal('.animate-bottom',{
    origin:'bottom',
    duration:1000,
    distance:'25rem',
    delay:600
});