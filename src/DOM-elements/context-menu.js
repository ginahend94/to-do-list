import { editProject, duplicateProject, archiveProject, deleteProjectWarning } from "../functions/projectManager";
import { getIcon } from "../functions/icon";
import { editNote, deleteNoteWarning, duplicateNote } from '../functions/noteManager';
import { taskDetails, deleteTaskWarning, duplicateTask, deleteListWarning, duplicateList } from "../functions/todoManager";

export default (() => {
    const menuTypes = {
        projectOptions: [
            {
                option: 'Edit project',
                function: editProject,
                icon: 'square-edit-outline',
            },
            {
                option: 'Duplicate project',
                function: duplicateProject,
                icon: 'content-copy',
            },
            {
                option: 'Archive project',
                function: archiveProject,
                icon: 'archive-outline',
            },
            {
                option: 'Delete project',
                function: deleteProjectWarning,
                icon: 'trash-can-outline',
            },
        ],
        noteOptions: [
            {
                option: 'Edit note',
                function: editNote,
                icon: 'square-edit-outline',
            },
            {
                option: 'Duplicate note',
                function: duplicateNote,
                icon: 'content-copy',
            },
            {
                option: 'Delete note',
                function: deleteNoteWarning,
                icon: 'trash-can-outline',
            }
        ],
        taskOptions: [
            {
                option: 'Edit task',
                function: task => taskDetails(task).editTask(task),
                icon: 'square-edit-outline',
            },
            {
                option: 'Duplicate task',
                function: duplicateTask,
                icon: 'content-copy',
            },
            {
                option: 'Delete task',
                function: deleteTaskWarning,
                icon: 'trash-can-outline',
            }
        ],
        listOptions: [
            {
                option: 'Duplicate list',
                function: duplicateList,
                icon: 'content-copy',
            },
            {
                option: 'Delete list',
                function: deleteListWarning,
                icon: 'trash-can-outline',
            }
        ]
    };

    const generateMenu = (menuType, project) => {
        const menuContainer = document.createElement('div');
        menuContainer.classList.add('context-menu-container');
        const menu = document.createElement('ul');
        menuContainer.append(menu);
        menu.classList.add('context-menu');
        menuTypes[menuType].forEach(option => {
            const li = document.createElement('li');
            menu.append(li);
            li.classList.add('context-menu-option');
            li.textContent = option.option;
            li.prepend(getIcon(option.icon, [option.icon]));
            li.addEventListener('click', () => option.function(project));
        });
        menuContainer.addEventListener('click', () => closeMenu(menuContainer));
        return { menu, menuContainer }
    }

    const openMenu = (e, menu) => {
        document.body.append(menu.menuContainer);
        menu.menu.style = `top:${e.clientY}px;left:${e.clientX}px`;
    }

    const closeMenu = (contextMenu) => {
        contextMenu.classList.add('hidden');
        if (document.body.contains(contextMenu)) document.body.removeChild(contextMenu);
    }

    return { generateMenu, openMenu }
})();