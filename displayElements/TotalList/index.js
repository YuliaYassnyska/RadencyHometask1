import { totalParams } from '../../notesApp.js'

export const totalListContainer = document.querySelector('.totalListContainer').children

export const printTotalList = () => {
    for (let i = 0; i < 3; ++i) {
        totalParams[i].map((el) => {
            let option = document.createElement('div')
            option.className = 'totalTextContainer';
            option.innerHTML = el;
            totalListContainer[i].appendChild(option);
        })
    }
}
