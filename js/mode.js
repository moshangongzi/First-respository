window.addEventListener('load',function() {
    var simple = this.document.querySelector('.simple');
    var middle = this.document.querySelector('.middle');
    var diffcult = this.document.querySelector('.diffcult');
    var f = 0;
    simple.addEventListener('click',getSimpleFlag) 
    middle.addEventListener('click',getMiddleFlag)
    diffcult.addEventListener('click',getDiffcultFlag)
    // simple.addEventListener('click',function() {
    //     f = 1;
    //     localStorage.setItem('flag', f);
    //     window.location.href = './index.html';
    // }) 
    // middle.addEventListener('click',function() {
    //     f = 2;
    //     localStorage.setItem('flag', f);
    //     window.location.href = "./index.html";
    // })
    // diffcult.addEventListener('click',function() {
    //     f = 3;
    //     localStorage.setItem('flag', f);
    //     window.location.href = "./index.html";
    // })

    function getSimpleFlag() {
        f = 1;
        localStorage.setItem('flag', f);
        window.location.href = './index.html';
    }

    function getMiddleFlag() {
        f = 2;
        localStorage.setItem('flag', f);
        window.location.href = "./index.html";
    }

    function getDiffcultFlag() {
        f = 3;
        localStorage.setItem('flag', f);
        window.location.href = "./index.html";
    }
})