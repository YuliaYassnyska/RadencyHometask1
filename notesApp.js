import { printListHeader } from './displayElements/ListHeader/index.js';
import { printTotalHeader } from './displayElements/TotalHeader/index.js'
import { printDefaultListContainer, printListContainer } from './displayElements/MainList/index.js'
import { printTotalList, totalListContainer } from './displayElements/TotalList/index.js';
import { createEditElements } from './displayElements/EditElements/index.js';
import { createSaveButton } from './displayElements/SettingsButtons/index.js';


const btnAddNote = document.querySelector('#addNote');

export let currentListRow = ['', '', '', '', ''];
export let statesOfEditButton = [];
export let tempElements = [null, null];
export let arrayRowID = [];
export let totalParams = [
    [7, 0],
    [0, 0],
    [0, 0]
]
let options = ['Task', 'Idea', 'Random Thought']
//////////////////////   Date  ///////////////////////////////

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

/////////////////////////////////////////////////////////////

const checkStateEditButton = () => {
    let checker = -1;
    statesOfEditButton.map((el, index) => {
        if (el === true)
            checker = index;
    });
    return checker;
}

////////////////////////////Clicks////////////////////////////////////
btnAddNote.onclick = () => {
    let nameValue = document.querySelector('#nameID').value;
    let selectCategoryValue = document.querySelector('#selectCategoryID').value;
    let contentValue = document.querySelector('#contentID').value;

    currentListRow[0] = nameValue;
    currentListRow[1] = getCurrentDate();
    currentListRow[2] = selectCategoryValue;
    separateDateFromContent(contentValue);

    printListContainer();

    if (currentListRow[2] === options[0]) {
        totalListContainer[0].children[1].innerHTML = ++totalParams[0][0]
    } else if (currentListRow[2] === options[1]) {
        totalListContainer[1].children[1].innerHTML = ++totalParams[1][0]
    } else if (currentListRow[2] === options[2]) {
        totalListContainer[2].children[1].innerHTML = ++totalParams[2][0]
    }
}

export const editElement = (id) => {
    let previousEditRowID = checkStateEditButton();
    if (previousEditRowID !== -1) {
        let previousEditRow = document.getElementsByClassName(`${previousEditRowID}`)[0].children;
        previousEditRow[0].replaceWith(tempElements[0]);
        previousEditRow[3].replaceWith(tempElements[1]);
        document.getElementById('btnSave').remove();
        statesOfEditButton[previousEditRowID] = false;
    }

    let currentRow = document.getElementById(id)
    statesOfEditButton[currentRow.id] = true;
    let arrayOfRows = currentRow.children;
    createEditElements(arrayOfRows);
    currentRow.appendChild(createSaveButton(currentRow));
}

export const clickBtnSave = (btnSave, rowOfElements) => {
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

export const archiveElement = (id) => {
    let currentRow = document.getElementById(id)
    if (currentRow.children[2].innerHTML === options[0]) {
        totalListContainer[0].children[1].innerHTML = --totalParams[0][0]
        totalListContainer[0].children[2].innerHTML = ++totalParams[0][1]
    } else if (currentRow.children[2] === options[1]) {
        totalListContainer[1].children[1].innerHTML = --totalParams[1][0]
        totalListContainer[1].children[1].innerHTML = ++totalParams[1][1]
    } else {
        totalListContainer[2].children[1].innerHTML = --totalParams[2][0]
        totalListContainer[2].children[1].innerHTML = ++totalParams[2][1]
    }
    statesOfEditButton.splice(currentRow.id, 1);
    arrayRowID.splice(arrayRowID.indexOf(parseInt(currentRow.id)), 1);
    currentRow.remove();
    console.log(totalParams)
}

export const deleteElement = (id) => {
    let currentRow = document.getElementById(id)
    statesOfEditButton.splice(currentRow.id, 1);
    arrayRowID.splice(arrayRowID.indexOf(parseInt(currentRow.id)), 1);
    currentRow.remove();
    if (currentRow.children[2].innerHTML === options[0]) {
        totalListContainer[0].children[1].innerHTML = --totalParams[0][0]
    } else if (currentRow.children[2] === options[1]) {
        totalListContainer[1].children[1].innerHTML = --totalParams[1][0]
    } else {
        totalListContainer[2].children[1].innerHTML = --totalParams[2][0]
    }
}

///////////////////////////////////////////////////////////

printListHeader()
printDefaultListContainer()
printTotalHeader()
printTotalList()