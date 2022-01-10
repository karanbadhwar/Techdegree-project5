const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const overlay = document.querySelector('.btn__reset');
const mainDiv = overlay.parentNode;
const ul = document.querySelector('#phrase ul');
const lis = ul.children;
const phrases = ['life is good',
                 'success does not come easy',
                 'live and let live',
                 'either you run the day or the day runs you',
                 'just relax yourself'
];
/***
 * 
 */
function getRandomPhraseAsArray(arr){
    let random = Math.floor(Math.random() * arr.length);
    return arr[random].split('');
}
const phraseArray =  getRandomPhraseAsArray(phrases);

/***
 * 
 */
function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++){
        const li = document.createElement('li');
        li.textContent = arr[i];
         if (arr[i] !== ' '){
            li.className = 'letter';
        } else{
            li.className = 'space';
        }
        ul.appendChild(li);
    }
}
addPhraseToDisplay(phraseArray);


/**
 * 
 */
function checkLetter(buttonClick){
    const li = ul.children;
    let match = null;
    for (let i = 0; i < li.length; i++){
        if (buttonClick.textContent == li[i].textContent){
            li[i].className = 'letter show';
            match = buttonClick.textContent;
        }
    }
    return match;
}

qwerty.addEventListener('click', (e) =>{
    const chosenButton = e.target;
    chosenButton.disabled = true;
    const ol = document.getElementById('scoreboard').children[0];
    const li = document.createElement('li');
    if (chosenButton.tagName === 'BUTTON'){
        chosenButton.className = 'chosen';
        let letterFound = checkLetter(chosenButton);
        checkWin();
        if (!letterFound){
            const heart = document.getElementsByClassName('tries');
            heart[0].remove();
            const img = document.createElement('img');
            img.src = 'images/lostHeart.png';
            li.className = 'tries';
            img.style.width = '30px';
            img.style.height = '35px';
            li.appendChild(img);
            ol.appendChild(li);
            missed ++;
    } 
    }

})

/**
 * 
 */
function checkWin (){
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    const overlayAfter = document.querySelector('.start');
    if (letter.length === show.length){
  
        overlayAfter.children[0].textContent = 'You Won!';
        overlayAfter.children[1].textContent = 'Play Again?';
        overlayAfter.className = 'start win';
        overlayAfter.style.display = 'flex';
        for (let i = 0; i <lis.length; i++){
            lis[i].className = '';
        }
    } else if (missed === 4){
        overlayAfter.className = 'start lose';
        overlayAfter.children[0].textContent = 'You Lost!';
        overlayAfter.children[1].textContent = 'Play Again?';   
        overlayAfter.style.display = 'flex';
        for (let i = 0; i <lis.length; i++){
             lis[i].className = '';
        }
    }
   
}
function clearGame(){
        console.log('Hello');
        const list = ul.children;
        for (let i = 0; i < lis.length; i++){
           ul.removeChild(list[i]);   
        }
        addPhraseToDisplay(getRandomPhraseAsArray(phrases));

        const chosenButton = document.querySelectorAll('.chosen');
      
        for (let i = 0; i < chosenButton.length; i++){
            // console.log(chosenButton[i].textContent);
            chosenButton[i].disabled = false;
            chosenButton[i].className = '';
        }
        // Heart retrieve 
        const li = document.querySelectorAll('.tries');
        for (let i = 0; i < li.length; i++){
            const img = li[i].children[0];
            if (img.src = 'images/lostHeart.png'){
                img.src = 'images/liveHeart.png';
            }
            
            }
        }


overlay.addEventListener('click', (e) => {
    overlay.parentNode.style.display = 'none';
    const playAgain = e.target;
    if (playAgain.textContent === 'Play Again?' ){
       clearGame();
        }
    
});
