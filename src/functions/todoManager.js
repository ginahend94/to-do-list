import { v4 as uuidv4 } from "uuid";
import save from "./save";
import load from "./load";
import { format } from "path-browserify";
import { getIcon } from "./icon";
import Modal from '../DOM-elements/modal';

const profile = load('profile');

export default (() => {
    const showModal = () => {
        const modalInner = () => {
            const taskDetails = document.createElement('form');
            taskDetails.classList.add('task-details');

            const taskTitle = document.createElement('input');
            taskDetails.append(taskTitle);
            taskTitle.type = 'text';
            taskTitle.name = 'task-title';
            taskTitle.id = 'task-title';
            taskTitle.classList.add('task-title');
            taskTitle.placeholder = 'Enter task here...';
            taskTitle.required = true;

            const dateLabel = document.createElement('label');
            taskDetails.append(dateLabel);
            dateLabel.prepend('Due by');
            const prettyDateContainer = document.createElement('div');
            dateLabel.append(prettyDateContainer);
            prettyDateContainer.classList.add('pretty-date-container');
            const prettyDateLabel = document.createElement('label');
            prettyDateContainer.append(prettyDateLabel)
            prettyDateLabel.setAttribute('for', 'pretty-date');
            const mmSpan = document.createElement('span');
            prettyDateLabel.append(mmSpan);
            mmSpan.textContent = 'mm';
            mmSpan.id = 'mm';
            prettyDateLabel.append(' / ');
            const ddSpan = document.createElement('span');
            prettyDateLabel.append(ddSpan);
            ddSpan.textContent = 'dd';
            ddSpan.id = 'dd';
            prettyDateLabel.append(' / ');
            const yyyySpan = document.createElement('span');
            prettyDateLabel.append(yyyySpan);
            yyyySpan.textContent = 'yyyy';
            yyyySpan.id = 'yyyy';

            const prettyDate = document.createElement('input');
            prettyDateContainer.append(prettyDate);
            prettyDate.type = 'date';
            prettyDate.name = 'pretty-date';
            prettyDate.id = 'pretty-date';

            const clearButton = getIcon('close-circle');
            prettyDateContainer.append(clearButton);
            clearButton.id = 'clr-btn';
            clearButton.style = 'width:15px;height:15px;font-size:15px';

            const taskPriority = document.createElement('div');
            taskDetails.append(taskPriority);
            taskPriority.classList.add('task-priority');
            const legend = document.createElement('legend');
            taskPriority.append(legend);
            legend.textContent = 'Priority';
            const priorityDiv = document.createElement('div');
            taskPriority.append(priorityDiv);
            const prioritySelection = document.createElement('span');
            priorityDiv.append(prioritySelection);
            prioritySelection.id = 'priority-selection';
            prioritySelection.prepend('None');
            prioritySelection.append(getIcon('chevron-down'));

            const taskPriorityList = document.createElement('fieldset');
            priorityDiv.append(taskPriorityList);
            taskPriorityList.name = 'task-priority';
            taskPriorityList.id = 'task-priority';
            taskPriorityList.classList.add('task-priority-list');

            const labelNone = document.createElement('label');
            taskPriorityList.append(labelNone);
            labelNone.classList.add('active');
            const inputNone = document.createElement('input');
            labelNone.append(inputNone);
            inputNone.name = 'priority';
            inputNone.type = 'radio';
            inputNone.value = 'none';
            labelNone.append('None');

            const labelLow = document.createElement('label');
            taskPriorityList.append(labelLow);
            const inputLow = document.createElement('input');
            labelLow.append(inputLow);
            inputLow.name = 'priority';
            inputLow.type = 'radio';
            inputLow.value = 'low';
            labelLow.append('Low');

            const labelMedium = document.createElement('label');
            taskPriorityList.append(labelMedium);
            const inputMedium = document.createElement('input');
            labelMedium.append(inputMedium);
            inputMedium.name = 'priority';
            inputMedium.type = 'radio';
            inputMedium.value = 'medium';
            labelMedium.append('Medium');

            const labelHigh = document.createElement('label');
            taskPriorityList.append(labelHigh);
            const inputHigh = document.createElement('input');
            labelHigh.append(inputHigh);
            inputHigh.name = 'priority';
            inputHigh.type = 'radio';
            inputHigh.value = 'high';
            labelHigh.append('High');

            const addSubtasks = document.createElement('div');
            taskDetails.append(addSubtasks);
            addSubtasks.classList.add('add-subtasks');
            const addSubtasksLabel = document.createElement('label');
            addSubtasks.append(addSubtasksLabel);
            addSubtasksLabel.setAttribute('for', 'add-subtasks');
            const addSubtasksCheckbox = document.createElement('input');
            addSubtasksLabel.append(addSubtasksCheckbox);
            addSubtasksCheckbox.type = 'checkbox';
            addSubtasksCheckbox.name = 'add-subtasks';
            addSubtasksCheckbox.id = 'add-subtasks';
            addSubtasksLabel.append('Add subtasks');

            const subtaskForm = document.createElement('div');
            addSubtasks.append(subtaskForm);
            subtaskForm.classList.add('subtask-form');
            subtaskForm.classList.add('hidden');
            const subtaskDirections = document.createElement('small');
            subtaskForm.append(subtaskDirections);
            subtaskDirections.classList.add('subtask-directions');
            subtaskDirections.textContent = 'Enter your subtasks below. Add a due date separated by a comma, and each subtask on its own line.';
            const subtasks = document.createElement('textarea');
            subtaskForm.append(subtasks);
            subtasks.name = 'subtasks';
            subtasks.id = 'new-subtasks';
            // subtasks.cols = '25';
            // subtasks.rows = '5';
            subtasks.placeholder = 'e.g. Walk dog, 6/12/22';

            addSubtasksCheckbox.addEventListener('change', e => {
                if (!e.target.checked) return subtaskForm.classList.add('hidden');
                return subtaskForm.classList.remove('hidden');
            })


            const notesLabel = document.createElement('label');
            taskDetails.append(notesLabel);
            notesLabel.for = 'notes';
            notesLabel.prepend('Notes:');
            const notes = document.createElement('textarea');
            notesLabel.append(notes);
            notes.name = 'notes';
            notes.id = 'notes';
            notes.placeholder = 'Notes (optional)';

            return taskDetails;
        };
        const modal = Modal.create(
            ['new-task'],
            modalInner(),
            () => confirm({
                taskName: document.getElementById('task-title').value,
                taskDate: document.getElementById('pretty-date').value,
                taskPriority: document.getElementById('task-priority').value,
                subtasks: document.getElementById('new-subtasks').value,
                notes: document.getElementById('notes').value
            }),
            'Save task',
            true,
            true,
            true
        );
        Modal.open(modal);
    }


    const createTask = (list, taskName) => {
        // console.log(`Will create task with id ${list.id}.${uuidv4()}`);
        const newTask = {
            taskName,
            classes: ['dragElement', 'dragContainer'],
            id: `${list.id}.${uuidv4()}`,
            container: list.id,
        };
        list.push(newTask);

        const activeProject = profile.projects[profile.projects.findIndex(list => list.container == project.id)];

        console.log(activeProject);

        activeProject.lists = activeProject.lists.map(oldlist => {
            if (oldlist.id == list.id) return oldlist = list;
            return oldlist
        });
        console.log(profile)
        save('profile', profile);
        return newTask;
    }
    return { showModal }

})()

export const createList = project => {
    const list = {
        id: `${project.id}.${uuidv4()}`,
        tasks: [],
        container: project.id,
    }
    console.log(project);
    project.lists.push(list);
    console.log(project);
    console.log(profile);
    profile.projects = profile.projects.map(oldproject => {
        if (oldproject.id == project.id) return oldproject = project;
        return oldproject
    });
    save('profile', profile);
    console.log(profile);
    return list;
}

