import { headers } from './data/optionalData.js'
import { defaultValues } from './data/defaultData.js';
import { imagePaths } from './data/optionalData.js';

const totalContainer = document.querySelector('#totalColumn');
const headerContainer = document.querySelector('#listColumn');
let listContainer = document.querySelector('.listContainer');
const btnAddNote = document.querySelector('#addNote');
const totalListContainer = document.querySelector('.totalListContainer').children

let currentListRow = ['', '', '', '', ''];
let firstImgMarginFlag = true;
let statesOfEditButton = [];
let tempElements = [null, null];
let totalParams = [
    [7, 0],
    [0, 0],
    [0, 0]
]
let arrayRowID = [];

/////////////////////////////////////////////////////////////   Print functions

const printListHeader = () => {
    headers.notesHeader.map(el => {
        let out = document.createElement('div');
        out.innerHTML = el;
        headerContainer.appendChild(out)
    })
}

const printDefaultListContainer = () => {
    defaultValues.map((el, index) => {
        let rowOfList = document.createElement('div');
        rowOfList.id = `${index}`;
        rowOfList.className = `${index}`;
        arrayRowID.push(index);

        el.map((el) => {
            let elementOfRow = document.createElement('div');
            elementOfRow.innerHTML = el;
            rowOfList.appendChild(elementOfRow)
        })
        imagePaths.map((el, index) => {
            rowOfList.appendChild(createSettingButton(el, index));
        });

        listContainer.appendChild(rowOfList);
        firstImgMarginFlag = true;
        statesOfEditButton.push(false);
    })
}

const printListContainer = () => {
    let rowOfList = document.createElement('div');
    if (arrayRowID.length === 0)
        arrayRowID.push(0);
    else
        arrayRowID.push(arrayRowID[parseInt(arrayRowID.length) - 1] + 1)
    rowOfList.id = arrayRowID[parseInt(arrayRowID.length) - 1];
    rowOfList.className = arrayRowID[parseInt(arrayRowID.length) - 1];

    currentListRow.map((el) => {
        let elementOfRow = document.createElement('div');
        elementOfRow.innerHTML = el;
        rowOfList.appendChild(elementOfRow)
    })

    imagePaths.map((el, index) => {
        rowOfList.appendChild(createSettingButton(el, index));
    });

    listContainer.appendChild(rowOfList);
    firstImgMarginFlag = true;
    statesOfEditButton.push(false);
}

const printTotalHeader = () => {
    headers.totalHeader.map(el => {
        let out = document.createElement('div');
        out.innerHTML = el;
        totalContainer.appendChild(out)
    })
}

const printTotalList = () => {
    for (let i = 0; i < 3; ++i) {
        totalParams[i].map((el) => {
            let option = document.createElement('div')
            option.className = 'totalTextContainer';
            option.innerHTML = el;
            totalListContainer[i].appendChild(option);
        })
    }
}

/////////////////////////////////////////////////////////////   Date

const getCurrentDate = () => {
    const nowDate = new Date();
    const Monthes = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'];

    return (Monthes[nowDate.getMonth()]) + ', ' + nowDate.getDate() + ', ' + nowDate.getFullYear();
}

const separateDateFromContent = (contentValue) => {
    const regEx = /\d{1,2}[-,\\,|,/]\d{1,2}[-,\\,|,/]\d{4}/;

    if (regEx.test(contentValue)) {
        currentListRow[4] = contentValue.match(regEx)[0];
        currentListRow[3] = contentValue.replace(regEx, '');

    } else {
        currentListRow[3] = contentValue;
        currentListRow[4] = ''; // No date in a content
    }
}

/////////////////////////////////////////////////////////////   Buttons

const createSettingButton = (pathToImage, index) => {

    let settingButton = document.createElement('input');
    settingButton.id = (arrayRowID[arrayRowID.length - 1] * 3 + index);

    if (firstImgMarginFlag) {
        settingButton.style.marginLeft = '3rem'
        firstImgMarginFlag = false
    }
    settingButton.type = 'image'
    settingButton.src = 'images/' + pathToImage;
    settingButton.style.filter = 'invert(1) hue-rotate(198deg) saturate(19%) brightness(50%)'

    clickSettingButton(settingButton);

    return settingButton
}

const createSaveButton = (rowOfElements) => {
    let saveBtn = document.createElement('input')
    saveBtn.type = 'button'
    saveBtn.value = 'Save'
    saveBtn.id = 'btnSave'
    clickBtnSave(saveBtn, rowOfElements);
    return saveBtn;
}

const createEditElements = (arrayOfRows) => {
    tempElements[0] = arrayOfRows[0];
    tempElements[1] = arrayOfRows[3];

    let inputName = document.createElement('input')
    inputName.id = 'nameInput';
    let inputContent = document.createElement('input')
    inputContent.id = 'contentInput';
    inputName.style.margin = '0 3.2rem 0 0'
    inputContent.style.margin = '0 3.2rem 0 0'
    arrayOfRows[0].replaceWith(inputName)
    arrayOfRows[3].replaceWith(inputContent)
}

/////////////////////////////////////////////////////////////

const checkStateEditButton = () => {
    let checker = -1;
    statesOfEditButton.map((el, index) => {
        if (el === true)
            checker = index;
    });
    return checker;
}

const changeTotalActive = (category, changeValue) => {
    switch (category) {
        case 'Task':
            totalListContainer[0].children[1].innerHTML = parseInt(totalListContainer[0].children[1].innerHTML) + changeValue;
            break;

        case 'Idea':
            totalListContainer[1].children[1].innerHTML = parseInt(totalListContainer[1].children[1].innerHTML) + changeValue;
            break;

        case 'Random Thought':
            totalListContainer[2].children[1].innerHTML = parseInt(totalListContainer[2].children[1].innerHTML) + changeValue;
            break;
    }
}

const changeTotalArchive = (category, changeValue) => {
    switch (category) {
        case 'Task':
            totalListContainer[0].children[2].innerHTML = parseInt(totalListContainer[0].children[2].innerHTML) + changeValue;
            break;

        case 'Idea':
            totalListContainer[1].children[2].innerHTML = parseInt(totalListContainer[1].children[2].innerHTML) + changeValue;
            break;

        case 'Random Thought':
            totalListContainer[2].children[2].innerHTML = parseInt(totalListContainer[2].children[2].innerHTML) + changeValue;
            break;
    }
}
/////////////////////////////////////////////////////////////   Clicks
btnAddNote.onclick = () => {
    let nameValue = document.querySelector('#nameID').value;
    let selectCategoryValue = document.querySelector('#selectCategoryID').value;
    let contentValue = document.querySelector('#contentID').value;

    currentListRow[0] = nameValue;
    currentListRow[1] = getCurrentDate();
    currentListRow[2] = selectCategoryValue;
    separateDateFromContent(contentValue);

    printListContainer();

    changeTotalActive(selectCategoryValue, 1);
}

const clickSettingButton = (settingButton) => {
    settingButton.addEventListener('click', () => {
        let currentRowID = Math.floor(settingButton.id / 3);
        let currentRow = document.getElementsByClassName(currentRowID)[0];

        switch (settingButton.id % 3) {
            case 0: {       //Edit
                let previousEditRowID = checkStateEditButton();
                if (previousEditRowID !== -1) {
                    let previousEditRow = document.getElementsByClassName(`${previousEditRowID}`)[0].children;
                    previousEditRow[0].replaceWith(tempElements[0]);
                    previousEditRow[3].replaceWith(tempElements[1]);
                    document.getElementById('btnSave').remove();
                    statesOfEditButton[previousEditRowID] = false;
                }
                statesOfEditButton[currentRowID] = true;
                let arrayOfRows = currentRow.children;
                createEditElements(arrayOfRows);
                currentRow.appendChild(createSaveButton(currentRow));
                break;
            }
            case 1: {       //Archive
                statesOfEditButton.splice(currentRow.id, 1);
                arrayRowID.splice(arrayRowID.indexOf(parseInt(currentRow.id)), 1);
                currentRow.remove();
                changeTotalArchive(currentRow.children[2].innerHTML, 1);
                changeTotalActive(currentRow.children[2].innerHTML, -1);
                break;
            }
            case 2: {       //Delete
                statesOfEditButton.splice(currentRow.id, 1);
                arrayRowID.splice(arrayRowID.indexOf(parseInt(currentRow.id)), 1);
                currentRow.remove();
                changeTotalActive(currentRow.children[2].innerHTML, -1);
                break;
            }
        }
    });
}

const clickBtnSave = (btnSave, rowOfElements) => {
    btnSave.onclick = () => {
        let arrayOfElements = rowOfElements.children;
        let currentNameValue = document.querySelector('#nameInput').value;
        let currentContentValue = document.querySelector('#contentInput').value;

        arrayOfElements[0].replaceWith(tempElements[0]);
        arrayOfElements[3].replaceWith(tempElements[1]);
        if (currentNameValue !== '')
            arrayOfElements[0].innerHTML = currentNameValue;
        if (currentContentValue !== '')
            arrayOfElements[3].innerHTML = currentContentValue;
        btnSave.remove();
        statesOfEditButton[rowOfElements.id] = false;
    }
}
///////////////////////////////////////////////////////////

printListHeader()
printDefaultListContainer()
printTotalHeader()
printTotalList()