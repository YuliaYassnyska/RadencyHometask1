import { headers } from './data/optionalData.js'
import { defaultValues } from './data/defaultData.js';
import { imagePaths } from './data/optionalData.js';

const totalColumn = document.querySelector('#totalColumn');
const listColumn = document.querySelector('#listColumn');
let listContainer = document.querySelector('.listContainer');
const btnAddNote = document.querySelector('#addNote')
let values = ['', '', '', '', ''];

const printTotalHeader = () => {
    headers.totalHeader.map(el => {
        let out = document.createElement('div');
        out.innerHTML = el;
        totalColumn.appendChild(out)
    })
}

const printDefaultListContainer = () => {
    defaultValues.map((el) => {
        let divRows = document.createElement('div');
        el.map((el) => {
            let divColumns = document.createElement('div');
            divColumns.innerHTML = el;
            divRows.appendChild(divColumns)
        })
        imagePaths.map(el => {
            divRows.appendChild(createInputImage(el));
        });
        listContainer.appendChild(divRows);
    })
}

const printNote = () => {
    let divRows = document.createElement('div');
    values.map((el) => {
        let divColumns = document.createElement('div');
        divColumns.innerHTML = el;
        divRows.appendChild(divColumns)
    })

    imagePaths.map(el => {
        divRows.appendChild(createInputImage(el));
    });
    listContainer.appendChild(divRows);
}

const printListHeader = () => {
    headers.notesHeader.map(el => {
        let out = document.createElement('div');
        out.innerHTML = el;
        listColumn.appendChild(out)
    })
}

btnAddNote.onclick = () => {
    let nameValue = document.querySelector('#nameID').value;
    let selectCategoryValue = document.querySelector('#selectCategoryID').value;
    let contentValue = document.querySelector('#contentID').value;

    values[0] = nameValue;
    values[1] = setCreatedDate();
    values[2] = selectCategoryValue;
    separateDateFromContent(contentValue);

    printNote();
}

const setCreatedDate = () => {
    const nowDate = new Date();
    const Monthes = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'];

    return (Monthes[nowDate.getMonth()]) + ', ' + nowDate.getDate() + ', ' + nowDate.getFullYear();
}

const separateDateFromContent = (contentValue) => {
    const valid = /\d{1,2}[-,\\,|,/]\d{1,2}[-,\\,|,/]\d{4}/;

    if (valid.test(contentValue)) {
        values[4] = contentValue.match(valid)[0];
        values[3] = contentValue.replace(valid);

    } else {
        values[3] = contentValue;
        values[4] = ''; // No date in a content
    }
}

const createInputImage = (imageNameWithExtention) => {
    let imgContainer = document.createElement('div')
    imgContainer.id = 'imgContainer'
    let inputImg = document.createElement('input');
    inputImg.type = 'image'
    inputImg.src = 'images/' + imageNameWithExtention;
    inputImg.style.filter = 'invert(1) hue-rotate(198deg) saturate(19%) brightness(50%)'
    imgContainer.appendChild(inputImg)
    return imgContainer
}


printListHeader()
printDefaultListContainer()
printTotalHeader()

