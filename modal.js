let modalContainer = document.getElementById("models");

class Modal {

    constructor(content) {
        this.content = content;
    }

    render() {
        let divModal = document.createElement('div');
        divModal.classList.add('modal');
        divModal.classList.add('modal-hide');
        this.divModal = divModal;

        let divModalDialog = document.createElement('div');
        divModalDialog.classList.add('modal-dialog');

        let divModalBtnClose = document.createElement('div');
        divModalBtnClose.classList.add('modal-btn-close');
        divModalBtnClose.innerText = 'x';
        divModalBtnClose.addEventListener('click', (new ModalBtnCloseListener()).action);

        let divModalContent = document.createElement('div');
        divModalContent.classList.add('modal-content');
        divModalContent.innerHTML = this.content;

        divModalDialog.insertAdjacentElement('beforeend', divModalBtnClose);
        divModalDialog.insertAdjacentElement('beforeend', divModalContent);

        divModal.insertAdjacentElement('beforeend', divModalDialog);

        modalContainer.insertAdjacentElement('beforeend', divModal);
    }

    show() {
        this.divModal.classList.remove('modal-hide');
    }

}

class ModalBtnCloseListener {

    action(event) {
        event.target.parentNode.parentNode.classList.toggle('modal-hide');
    }

}