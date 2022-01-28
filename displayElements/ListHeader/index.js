import { headers } from '../../data/optionalData.js'

const headerContainer = document.querySelector('#listColumn');

export const printListHeader = () => {
    headers.notesHeader.map(el => {
        let out = document.createElement('div');
        out.innerHTML = el;
        headerContainer.appendChild(out)
    })
}