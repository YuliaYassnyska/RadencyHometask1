import { headers } from '../../data/optionalData.js'

const totalContainer = document.querySelector('#totalColumn');

export const printTotalHeader = () => {
    headers.totalHeader.map(el => {
        let out = document.createElement('div');
        out.innerHTML = el;
        totalContainer.appendChild(out)
    })
}