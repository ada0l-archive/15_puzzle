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

        let divModaDialog = document.createElement('div');
        divModaDialog.classList.add('modal-dialog');

        let divModalBtnClose = document.createElement('div');
        divModalBtnClose.classList.add('modal-btn-close');
        divModalBtnClose.innerText = 'x';
        divModalBtnClose.addEventListener('click', (new ModalBtnCloseListener(this)).action);

        let divModalContent = document.createElement('div');
        divModalContent.classList.add('modal-content');
        divModalContent.innerHTML = this.content;

        divModaDialog.insertAdjacentElement('beforeEnd', divModalBtnClose);
        divModaDialog.insertAdjacentElement('beforeEnd', divModalContent);

        divModal.insertAdjacentElement('beforeEnd', divModaDialog);

        modalContainer.insertAdjacentElement('beforeEnd', divModal);
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