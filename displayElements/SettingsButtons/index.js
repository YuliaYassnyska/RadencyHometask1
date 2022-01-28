import { archiveElement, editElement, deleteElement, clickBtnSave } from '../../notesApp.js'


export const createSaveButton = (rowOfElements) => {
    let saveBtn = document.createElement('input')
    saveBtn.type = 'button'
    saveBtn.value = 'Save'
    saveBtn.id = 'btnSave'
    clickBtnSave(saveBtn, rowOfElements);
    return saveBtn;
}

export const createEditBtn = (index, rowOfList) => {
    let btnEdit = document.createElement('input')
    btnEdit.src = '../../images/edit.png'
    btnEdit.type = 'image'
    btnEdit.className = 'edit'
    btnEdit.id = "edit_button" + index
    btnEdit.style.filter = 'invert(1) hue-rotate(198deg) saturate(19%) brightness(50%)'

    rowOfList.appendChild(btnEdit);
    btnEdit.addEventListener('click', () => {
        editElement(index)
    })
}


export const createArchiveBtn = (index, rowOfList) => {
    let bntArchive = document.createElement('input')
    bntArchive.src = '../../images/archived.png'
    bntArchive.type = 'image'
    bntArchive.className = 'edit'
    bntArchive.id = "archive_button" + index
    bntArchive.style.filter = 'invert(1) hue-rotate(198deg) saturate(19%) brightness(50%)'

    rowOfList.appendChild(bntArchive)
    bntArchive.addEventListener('click', () => {
        archiveElement(index)
    })
}

export const createDeleteBtn = (index, rowOfList) => {
    let bntDelete = document.createElement('input')
    bntDelete.src = '../../images/delete.png'
    bntDelete.type = 'image'
    bntDelete.className = 'edit'
    bntDelete.id = "archive_button" + index
    bntDelete.style.filter = 'invert(1) hue-rotate(198deg) saturate(19%) brightness(50%)'

    rowOfList.appendChild(bntDelete)
    bntDelete.addEventListener('click', () => {
        deleteElement(index)
    })
}