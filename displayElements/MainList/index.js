import { defaultValues } from '../../data/defaultData.js';
import { arrayRowID, currentListRow } from '../../notesApp.js';
import { statesOfEditButton } from '../../notesApp.js'
import { createArchiveBtn, createDeleteBtn, createEditBtn } from '../SettingsButtons/index.js'

let firstImgMarginFlag = true;

let listContainer = document.querySelector('.listContainer');

export const printDefaultListContainer = () => {
    let defaultList = defaultValues.map((el, index) => {
        let rowOfList = document.createElement('div');
        rowOfList.id = `${index}`;
        rowOfList.className = `${index}`;
        arrayRowID.push(index);

        el.map((el) => {
            let elementOfRow = document.createElement('div');
            elementOfRow.innerHTML = el;
            elementOfRow.id = index
            rowOfList.appendChild(elementOfRow)
        })


        createEditBtn(index, rowOfList);
        createArchiveBtn(index, rowOfList);
        createDeleteBtn(index, rowOfList);

        listContainer.appendChild(rowOfList);
        firstImgMarginFlag = true;
        statesOfEditButton.push(false);
    })
}

export const printListContainer = () => {
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

    createEditBtn(arrayRowID[parseInt(arrayRowID.length) - 1], rowOfList);
    createArchiveBtn(arrayRowID[parseInt(arrayRowID.length) - 1], rowOfList);
    createDeleteBtn(arrayRowID[parseInt(arrayRowID.length) - 1], rowOfList);

    listContainer.appendChild(rowOfList);
    firstImgMarginFlag = true;
    statesOfEditButton.push(false);
}