const draggables = document.querySelectorAll('.drag-element');
const containers = document.querySelectorAll('.drag-container');
const icons = document.querySelectorAll('.drag');

icons.forEach(icon => {
    icon.addEventListener('mousedown', () => {
        icon.parentNode.setAttribute('draggable', true);
    });
    icon.addEventListener('mouseup', () => {
        icon.parentNode.setAttribute('draggable', false);
    });
    icon.addEventListener('dragend', () => {
        icon.parentNode.setAttribute('draggable', false)
    })
})

draggables.forEach(a => {
    a.addEventListener('dragstart', () => {
        a.classList.add('dragging');
        if (a.classList.contains('subtask')) {
            setTimeout(() => {
            a.parentNode.parentNode.classList.remove('dragging');
            }, 1);
        }
    });
    a.addEventListener('dragend', () => {
        a.classList.remove('dragging');
        a.setAttribute('draggable', false);
    })
})

containers.forEach(a => {
    a.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(a, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (draggable.classList.contains('subtask')) {
            let container = document.getElementById(draggable.dataset.container).querySelector('.subtasks');
            if (afterElement == null) {
                container.append(draggable);
            } else {
                container.insertBefore(draggable, afterElement);
            }
            return
        }
        if (afterElement == null) {
            a.append(draggable);
        } else {
            a.insertBefore(draggable, afterElement);
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(`.drag-element:not(.dragging)`)].filter(a => a.dataset.container == document.querySelector('.dragging').dataset.container);
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}