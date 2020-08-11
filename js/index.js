
// Forbid clicking the mouse ---------
document.querySelector('body').addEventListener("mousedown", function (event) {
    event.preventDefault();
});

// Track keystrokes ------------------
document.querySelector('html').addEventListener("keydown", function (event) {
    let screen01 = document.querySelector('.screen-01');
    let screen02 = document.querySelector('.screen-02');
    let screen01BtnAdd = document.querySelector('.screen-01__btn-add');
    let screen02Input = document.querySelector('.screen-02__input');

    downScreen01 = () => {
        console.log('down');
        listAccounts[numberActiveAccounts].classList.toggle('active');
        numberActiveAccounts = numberActiveAccounts + 1;
        listAccounts[numberActiveAccounts].classList.add('active');
    }

    upScreen01 = () => {
        console.log('up');
        listAccounts[numberActiveAccounts].classList.toggle('active');
        numberActiveAccounts = numberActiveAccounts - 1;
        listAccounts[numberActiveAccounts].classList.add('active');
    }

    rightScreen01 = () => {
        console.log('right');
        screen01BtnAdd.focus();
        listAccounts[numberActiveAccounts].classList.toggle('active');
        activeAccounts = false
    }

    leftScreen01 = () => {
        console.log('left');
        dataAccounts.splice(numberActiveAccounts, 1)
        if (numberActiveAccounts == listAccounts.length - 1) {
            numberActiveAccounts = numberActiveAccounts - 1;
            if (listAccounts.length == 1) {
                console.log('last')
                numberActiveAccounts = 0
                activeAccounts == false;
                screen01BtnAdd.focus();
            }
        }
    }

    enterScreen01 = () => {
        console.log('enter');
        screen01.classList.toggle('hidden');
        screen01.classList.toggle('visible');
        screen02.classList.toggle('hidden');
        screen02.classList.toggle('visible');
        screen02Input.focus();
    }

    if (screen01.classList.contains('visible')) {
        if (activeAccounts == true && listAccounts.length > 0) {
            if (event.keyCode == 40 && numberActiveAccounts < listAccounts.length - 1) {
                downScreen01();
            } else if (event.keyCode == 38 && numberActiveAccounts - 1 >= 0) {
                upScreen01();
            } else if (event.keyCode == 39) {
                rightScreen01();
            } else if (event.keyCode == 37) {
                leftScreen01();
                renderAccountsList(dataAccounts);
            }
        } else if (activeAccounts == false || listAccounts.length == 0) {
            if (event.keyCode == 37) {
                screen01BtnAdd.blur();
                activeAccounts = true;
                listAccounts[numberActiveAccounts].classList.toggle('active');
                console.log('left');
            } else if (event.keyCode == 13) {
                enterScreen01()
            }
        }
    } else if (screen02.classList.contains('visible')) {
        if (event.keyCode == 13) {
            activeAccounts = true;
            console.log(dataAccounts);
            
            let newAccount = {
                "title": screen02Input.value,
                "img": "/images/iconfinder_photo_370076.png"
            }
            dataAccounts.unshift(newAccount);
            screen02Input.value = '';
            renderAccountsList(dataAccounts);
            enterScreen01()
        }
    }
});

// Fetch json data ---------------------------------
let dataAccounts
(function fetchDataAccounts() {
    fetch('data.json')
        .then(data => {
            return data.json();
        })
        .then(data => {
            dataAccounts = data.accounts
            renderAccountsList(dataAccounts)
        })
})();

// Render accounts list -------------------------
let ulListAccounts = document.querySelector(".screen-01__ul");
let activeAccounts = true;
let numberActiveAccounts = 0;
let listAccounts
renderAccountsList = (dataAccounts) => {

    ulListAccounts.innerHTML = '';
    dataAccounts.forEach(function (elem, index) {

        let accountInfo = document.createElement('li');
        accountInfo.setAttribute('class', 'screen-01__ul-list list-white');

        let accountImg = document.createElement('img');
        accountImg.setAttribute('src', dataAccounts[index].img);
        accountImg.setAttribute('alt', `photo user ${index}`);

        let accountTitle = document.createElement('p');
        accountTitle.innerText = dataAccounts[index].title;
        accountInfo.appendChild(accountImg);
        accountInfo.appendChild(accountTitle);
        ulListAccounts.appendChild(accountInfo);
    });

    // select active -------------------
    listAccounts = document.querySelectorAll(".screen-01__ul li");
    if (dataAccounts.length > 0) {
        console.log(dataAccounts)
        listAccounts[numberActiveAccounts].classList.add('active');
    }
}
