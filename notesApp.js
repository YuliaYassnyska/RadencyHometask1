import { headers } from './data/optionalData.js'
import { defaultValues } from './data/defaultData.js';
import { imagePaths } from './data/optionalData.js';

const totalContainer = document.querySelector('#totalColumn');
const headerContainer = document.querySelector('#listColumn');
let listContainer = document.querySelector('.listContainer');
const btnAddNote = document.querySelector('#addNote');
let counterId = 0;

let currentListRow = ['', '', '', '', ''];
let firstImgMarginFlag = true;
let editFlags = [];
let tempElements = [null, null];

let arrayRowID = [];

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
        arrayRowID.push(index);

        el.map((el) => {
            let elementOfRow = document.createElement('div');
            elementOfRow.innerHTML = el;
            rowOfList.appendChild(elementOfRow)
        })
        imagePaths.map(el => {
            rowOfList.appendChild(createSettingButton(el));
        });

        listContainer.appendChild(rowOfList);
        firstImgMarginFlag = true;
        editFlags.push(false);
    })
}

let newRowID = defaultValues.length;
const printListContainer = () => {
    let rowOfList = document.createElement('div');
    arrayRowID.push(arrayRowID[parseInt(arrayRowID.length) - 1] + 1)
    // console.log(arrayRowID);
    rowOfList.id = arrayRowID[parseInt(arrayRowID.length) - 1];
    currentListRow.map((el) => {
        let elementOfRow = document.createElement('div');
        elementOfRow.innerHTML = el;
        rowOfList.appendChild(elementOfRow)
    })

    imagePaths.map(el => {
        rowOfList.appendChild(createSettingButton(el));
    });

    listContainer.appendChild(rowOfList);
    firstImgMarginFlag = true;
    editFlags.push(false);
}

const printTotalHeader = () => {
    headers.totalHeader.map(el => {
        let out = document.createElement('div');
        out.innerHTML = el;
        totalContainer.appendChild(out)
    })
}

/////////////////////////////////////////////////////////////

const getCurrentDate = () => {
    const nowDate = new Date();
    const Monthes = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'];

    return (Monthes[nowDate.getMonth()]) + ', ' + nowDate.getDate() + ', ' + nowDate.getFullYear();
}

const separateDateFromContent = (contentValue) => {
    const regEx = /\d{1,2}[-,\\,|,/]\d{1,2}[-,\\,|,/]\d{4}/;

    if (regEx.test(contentValue)) {
        currentListRow[4] = contentValue.match(regEx)[0];
        currentListRow[3] = contentValue.replace(regEx);

    } else {
        currentListRow[3] = contentValue;
        currentListRow[4] = ''; // No date in a content
    }
}

const createSettingButton = (pathToImage) => {
    let settingButton = document.createElement('input');
    settingButton.id = `${counterId++} `

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

const checkFlags = () => {
    let checker = false;
    editFlags.map(el => {
        if (el === true)
            checker = true;
    });
    return checker
}
/////////////////////////////////////////////////////////// Clicks
btnAddNote.onclick = () => {
    let nameValue = document.querySelector('#nameID').value;
    let selectCategoryValue = document.querySelector('#selectCategoryID').value;
    let contentValue = document.querySelector('#contentID').value;

    currentListRow[0] = nameValue;
    currentListRow[1] = getCurrentDate();
    currentListRow[2] = selectCategoryValue;
    separateDateFromContent(contentValue);

    printListContainer();
}

const clickSettingButton = (settingButton) => {
    settingButton.addEventListener('click', () => {
        let currentRowID = Math.floor(settingButton.id / 3);
        let currentRow = document.getElementById(`${currentRowID}`);


        switch (settingButton.id % 3) {
            case 0: {       //Edit
                if (checkFlags()) {
                    let previousEditRowID;
                    editFlags.map((el, index) => {
                        if (el === true)
                            previousEditRowID = index;
                    });
                    let previousEditRow = document.getElementById(`${previousEditRowID}`).children;
                    previousEditRow[0].replaceWith(tempElements[0]);
                    previousEditRow[3].replaceWith(tempElements[1]);
                    document.getElementById('btnSave').remove();
                    editFlags[previousEditRowID] = false;
                }
                editFlags[currentRowID] = true;
                let arrayOfRows = currentRow.children;
                createEditElements(arrayOfRows);
                currentRow.appendChild(createSaveButton(currentRow));
                break;
            }
            case 1: {       //Archive
                // console.log(currentRow.id)
                console.log(arrayRowID)
                //console.log(arrayRowID.indexOf(parseInt(currentRow.id)))
                console.log(currentRow)
                console.log(currentRowID)

                counterId -= 3
                editFlags.splice(currentRow.id, 1);
                arrayRowID.splice(arrayRowID.indexOf(parseInt(currentRow.id)), 1);
                currentRow.remove();
                break;
            }
            case 2: {       //Delete
                editFlags.splice(currentRowID, 1);
                currentRow.remove();
                --newRowID;
                console.log(editFlags)
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
        editFlags[rowOfElements.id] = false;
    }
}
///////////////////////////////////////////////////////////

printListHeader()
printDefaultListContainer()
printTotalHeader()

