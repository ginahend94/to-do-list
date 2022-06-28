import icon from "../functions/icon";
import { getIcon } from "../functions/icon";
import load from "../functions/load";
import ProjectManager from "../functions/projectManager";
import switchActiveProject from "../functions/switchActiveProject";
import contextMenu from "./context-menu";
import { handleTooltip, tooltip } from "./tooltip";
import { resizeSidebar } from "../functions/drag";


export default Profile => {

    const nav = document.createElement('nav');
    nav.classList.add('sidebar');

    const header = document.createElement('header');
    nav.append(header)
    const h1 = document.createElement('h1');
    header.append(h1);
    h1.textContent = `Diddit.`;
    h1.append(getIcon('checkbox-marked-outline'));

    const sidebarLower = document.createElement('div');
    sidebarLower.classList.add('sidebar-lower');
    nav.append(sidebarLower);
    const projectListContainer = document.createElement('div');
    sidebarLower.append(projectListContainer);
    projectListContainer.classList.add('project-list-container');

    const projectList = document.createElement('ul');
    projectListContainer.append(projectList);
    projectList.classList.add('project-list');
    projectList.id = 'project-list';

    Profile.projects.forEach(project => {
        const projectInfo = document.createElement('li');
        projectList.append(projectInfo);
        projectInfo.classList.add('project-info');

        projectInfo.addEventListener('contextmenu', e => {
            e.preventDefault();
            const menu = contextMenu.generateMenu('projectOptions', project);
            contextMenu.openMenu(e, menu);
        });

        projectInfo.addEventListener('mouseenter', e => {
            tooltip.tooltip.textContent = project.name;
        })
        let timeout;
        projectInfo.addEventListener('mousemove', e => {
            if (document.body.contains(tooltip.tooltip)) document.body.removeChild(tooltip.tooltip);
            clearTimeout(timeout);
            timeout = setTimeout(() => handleTooltip(e, true), 500)
        })
        projectInfo.addEventListener('mouseleave', e => {
            if (document.body.contains(tooltip.tooltip)) document.body.removeChild(tooltip.tooltip);
            clearTimeout(timeout);
            handleTooltip(e, false);
        })

        const projectTitle = document.createElement('span');
        projectInfo.append(projectTitle);
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.name;

        if (project.active) {
            projectInfo.classList.add('active');
        } else {
            projectInfo.addEventListener('click', () => switchActiveProject(project.id));
        }

        const projectOptions = getIcon('dots-horizontal', ['project-options'])
        projectInfo.append(projectOptions);
        projectOptions.addEventListener('click', e => {
            e.stopPropagation();
            console.log('hi')
            const menu = contextMenu.generateMenu('projectOptions', project);
            contextMenu.openMenu(e, menu);
        })
    });

    const addNewProject = document.createElement('button');
    projectListContainer.append(addNewProject);
    addNewProject.textContent = 'New Project';
    addNewProject.prepend(getIcon('plus'));
    addNewProject.addEventListener('click', ProjectManager.showModal);

    const settingsMenu = document.createElement('ul');
    sidebarLower.append(settingsMenu);
    settingsMenu.classList.add('settings-menu');
    const account = document.createElement('li');
    settingsMenu.append(account)
    let userIcon;
    let userName;
    if (load('profile')) {
        const Profile = load('profile');
        userIcon = icon(Profile.icon) || getIcon('account');
        userName = Profile.name || 'User';
        account.title = 'Account';
    } else {
        userIcon = getIcon('account');
        userName = 'Account';
    }
    account.append(userIcon);
    account.append(userName);

    const settings = document.createElement('li');
    settingsMenu.append(settings);
    settings.append(getIcon('cog-outline'));
    settings.append('Settings');

    const about = document.createElement('li');
    settingsMenu.append(about);
    about.append(getIcon('information-outline'));
    about.append('About');

    const sideDrag = document.createElement('div');
    sidebarLower.append(sideDrag);
    sideDrag.classList.add('side-drag');

    resizeSidebar(nav);

    return nav;
}