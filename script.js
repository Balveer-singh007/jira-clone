let modalHtml = `<div class="modal-container">
<span class="material-icons close">
  close
  </span>
  <form id="create-form">
    <input type="text" name="name" placeholder="Title" required />
    <input type="text" name="assignee" placeholder="Assignee" required />
    <select name="status" required>
      <option value="TODO">To Do</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="DONE">Done</option>
    </select>
    <textarea name="description" id="" cols="30" rows="4"></textarea>
    <button>Create</button>
  </form>
</div>`;

const createElement = document.getElementById("create-button");
let count = 0;

createElement.addEventListener("click", () => {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = modalHtml;
  document.body.appendChild(modal);

  const form = document.getElementById("create-form");
  const formDataListener = (e) => {
    e.preventDefault();
    let elements = e.target.elements;
    console.log(elements);
    let taskObject = {};
    for (let i = 0; i < elements.length; i++) {
      elements[i].name && (taskObject[elements[i].name] = elements[i].value);
    }
    //  console.log(taskObject);
    createTask(taskObject);
    modal.remove();
  };
  form.addEventListener("submit", formDataListener);

  let closeModal = document.getElementsByClassName("close")[0];
  closeModal.addEventListener("click", () => {
    modal.remove();
  });
});

function createTask(taskObject) {
  const taskContainer = document.createElement("div");
  taskContainer.className = "task";
  taskContainer.id = `task-${count}`;
  taskContainer.draggable = "true";
  count++;

  taskContainer.innerHTML = `
          <b>${taskObject.name}</b>
          <strong>${taskObject.assignee}</strong>
          <p>${taskObject.description}</p>
  `;
  taskContainer.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("source", taskContainer.id);
    e.dataTransfer.setData("parent", taskContainer.parentElement.id);
    // console.log(taskContainer.id, taskContainer.parentElement.id);
  });
  const panel = document.getElementById(taskObject.status);
  // console.log(panel);
  panel.appendChild(taskContainer);
}

const panel = document.getElementsByClassName("panel");

for (let i = 0; i < panel.length; i++) {
  panel[i].addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  panel[i].addEventListener("drop", (e) => {
    let taskId = e.dataTransfer.getData("source");
    let parentId = e.dataTransfer.getData("parent");

    if (parentId === panel[i].id) {
      console.log(`cant leave in same block`);
      return;
    }
    let draggableId = document.getElementById(taskId);
    panel[i].appendChild(draggableId);
  });
}
