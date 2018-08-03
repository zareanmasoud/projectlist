import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const projects = [
  {
    id: "approo",
    title: "Approo",
    watchHref: "http://www.github.com/zareanmasoud/sdp-frontend",
    authorId: "masoud-zarean",
    created_at: "oct 2016",
    category: "Admin Panel"
  },
  {
    id: "tamashakade",
    title: "Tamashakade",
    watchHref: "http://www.tamashakadehapp.com",
    authorId: "masoud-zarean",
    created_at: "sep 2017",
    category: "Product Landing-page"
  },
  {
    id: "farmoon",
    title: "Farmoon",
    watchHref: "https://t.me/farmoon_bot",
    authorId: "masoud-zarean",
    created_at: "mar 2018",
    category: "Telegram Bot"
  },
  {
    id: "asay",
    title: "Asay",
    watchHref: "https://play.google.com/store/apps/details?id=ir.vada.asay",
    authorId: "masoud-zarean",
    created_at: "feb 2018",
    category: "Native Mobile App"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (project) => {
  return replaceAll(project.title, ' ', '-');
};

class ProjectApi {
  static getAllProjects() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], projects));
      }, delay);
    });
  }

  static saveProject(project) {
    project = Object.assign({}, project); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minProjectTitleLength = 1;
        if (project.title.length < minProjectTitleLength) {
          reject(`Title must be at least ${minProjectTitleLength} characters.`);
        }

        if (project.id) {
          const existingProjectIndex = projects.findIndex(a => a.id == project.id);
          projects.splice(existingProjectIndex, 1, project);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new projects in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          project.id = generateId(project);
          project.watchHref = `http://www.github.com/zareanmasoud/${project.id}`;
          projects.push(project);
        }
        resolve(project);
      }, delay);
    });
  }

  static deleteProject(project) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfProjectToDelete = projects.findIndex(a => a.id == project.id);
        if (indexOfProjectToDelete < 0 || indexOfProjectToDelete > projects.length) {
          reject("Deletion index out of range.");
        }
        projects.splice(indexOfProjectToDelete, 1);
        resolve(project);
      }, delay);
    });
  }
}

export default ProjectApi;
