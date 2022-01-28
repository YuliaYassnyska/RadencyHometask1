import { tempElements } from '../../notesApp.js'

export const createEditElements = (arrayOfRows) => {
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