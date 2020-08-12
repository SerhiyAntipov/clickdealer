window.onload = function () {

    // Global variables-------------------
    let dataAccounts;
    let activeAccounts = true;
    let numberActiveAccount = 0;
    let listAccounts = document.querySelectorAll(".screen-01__ul li");

    // Disable all click events on page ---------
    document.querySelector('body').addEventListener("mousedown", function (event) {
        event.preventDefault();
    });

    // Fetch json data --------------------
    (function fetchDataAccounts() {
        fetch('data.json')
            .then(data => {
                return data.json();
            })
            .then(data => {
                dataAccounts = data.accounts;
                renderAccountsList(dataAccounts);
            })
    })();

    // Render a list of accounts  ---------------
    renderAccountsList = (dataAccounts) => {
        let wrapperListAccounts = document.querySelector(".screen-01__ul");
        wrapperListAccounts.innerHTML = '';

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
            wrapperListAccounts.appendChild(accountInfo);
        });

        // Select active accounts ----------
        listAccounts = document.querySelectorAll(".screen-01__ul li");
        if (dataAccounts.length > 0) {
            listAccounts[numberActiveAccount].classList.add('active');
        }
    }

    // Track keystrokes ------------------
    let screen02LastActivity = 'add';
    let inputActive = true;

    document.querySelector('html').addEventListener("keydown", function (event) {
        let screen01 = document.querySelector('.screen-01');
        let screen01BtnAdd = document.querySelector('.screen-01__btn-add');
        let screen02 = document.querySelector('.screen-02');
        let screen02Input = document.querySelector('.screen-02__input');
        let screen02BtnAdd = document.querySelector('.screen-02__btn-add');
        let screen02BtnCancel = document.querySelector('.screen-02__btn-cancel');

        // Btn function ------------------
        downScreen01 = () => {
            listAccounts[numberActiveAccount].classList.toggle('active');
            numberActiveAccount = numberActiveAccount + 1;
            listAccounts[numberActiveAccount].classList.add('active');
        }

        upScreen01 = () => {
            listAccounts[numberActiveAccount].classList.toggle('active');
            numberActiveAccount = numberActiveAccount - 1;
            listAccounts[numberActiveAccount].classList.add('active');
        }

        rightScreen01 = () => {
            screen01BtnAdd.focus();
            listAccounts[numberActiveAccount].classList.toggle('active');
            activeAccounts = false;
        }

        leftScreen01 = () => {
            dataAccounts.splice(numberActiveAccount, 1);
            if (numberActiveAccount == listAccounts.length - 1) {
                numberActiveAccount = numberActiveAccount - 1;
                if (listAccounts.length == 1) {
                    numberActiveAccount = 0;
                    activeAccounts == false;
                    screen01BtnAdd.focus();
                }
            }
        }

        leftOfAddBtnScreen01 = () => {
            screen01BtnAdd.blur();
            activeAccounts = true;
            listAccounts[numberActiveAccount].classList.toggle('active');
        }

        enterScreen01 = () => {
            screen01.classList.toggle('hidden');
            screen01.classList.toggle('visible');
            screen02.classList.toggle('hidden');
            screen02.classList.toggle('visible');
            screen02Input.focus();
        }

        addScreen02 = () => {
            activeAccounts = true;
            let newAccount = {
                "title": screen02Input.value,
                "img": "images/iconfinder_photo_370076.png"
            }
            dataAccounts.push(newAccount);
            screen02Input.value = '';
            inputActive = true;
        }

        cancelScreen02 = () => {
            screen02Input.value = '';
            if (dataAccounts.length == 0) {
                activeAccounts = false;
                screen01BtnAdd.focus();
            } else {
                activeAccounts = true;
            }
            inputActive = true;
        }

        downScreen02 = () => {
            if (screen02LastActivity == 'add') {
                screen02BtnAdd.focus();
                inputActive = false;
            } else if (screen02LastActivity == 'cancel') {
                screen02BtnCancel.focus();
                inputActive = false;
            }
        }

        upScreen02 = () => {
            screen02Input.focus();
            inputActive = true;
        }

        rightScreen02 = () => {
            screen02BtnCancel.focus();
            screen02LastActivity = 'cancel';
        }

        leftScreen02 = () => {
            screen02BtnAdd.focus();
            screen02LastActivity = 'add';
        }

        //Condition on button click--------
        // Screen 01 
        if (screen01.classList.contains('visible')) {
            if (activeAccounts == true && listAccounts.length > 0) {
                if (event.keyCode == 40 && numberActiveAccount < listAccounts.length - 1) {
                    downScreen01();
                } else if (event.keyCode == 38 && numberActiveAccount - 1 >= 0) {
                    upScreen01();
                } else if (event.keyCode == 39) {
                    rightScreen01();
                } else if (event.keyCode == 37) {
                    leftScreen01();
                    renderAccountsList(dataAccounts);
                }
            } else if (activeAccounts == false) {
                if (event.keyCode == 37) {
                    leftOfAddBtnScreen01();
                } else if (event.keyCode == 13) {
                    enterScreen01();
                }
            } else if (listAccounts.length == 0 && event.keyCode == 13) {
                enterScreen01();
            }
        // Screen 02
        } else if (screen02.classList.contains('visible')) {
            if (event.keyCode == 40 && inputActive == true) {
                downScreen02();
            } else if (event.keyCode == 38 && inputActive == false) {
                upScreen02();
            } else if (event.keyCode == 39 && inputActive == false) {
                rightScreen02()
            } else if (event.keyCode == 37 && inputActive == false) {
                leftScreen02()
            } else if (event.keyCode == 13 && screen02LastActivity == 'add' && inputActive == false) {
                addScreen02();
                renderAccountsList(dataAccounts);
                enterScreen01();
            } else if (event.keyCode == 13 && screen02LastActivity == 'cancel') {
                cancelScreen02();
                renderAccountsList(dataAccounts);
                enterScreen01();
            }
        }
    });
};
