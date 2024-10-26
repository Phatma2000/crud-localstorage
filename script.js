//? CRUD - Create, Read, Update, Delete

// const userList = ["Emin", "Fatma", "Eylul"];
// localStorage.setItem("name", JSON.stringify(userList));

// const getStorage = JSON.parse(localStorage.getItem("name"));
// console.log(getStorage);

// localStorage.setItem("user", JSON.stringify(userList));

// localStorage.removeItem("user");

// userList.splice(1, 1); // 1ci indexden basla 1 dene sil, 2 yazsaq Eylulde gedecekdi.
// localStorage.setItem("name", JSON.stringify(userList));

// const nameList = document.querySelector("#nameList");

// nameList.innerHTML = getStorage;

let userList = []; // bos arrayim olsun her yerde use.
let getUser; // deyisken create
let nameListDOM = document.querySelector("#nameList");

// localStorage.setItem("userList", JSON.stringify(userList));

function Read() {
  nameListDOM.innerHTML = "";
  getUser = JSON.parse(localStorage.getItem("userList"));
  //   console.log(getUser);
  if (getUser != null) {
    if (getUser.length === 0) {
      nameListDOM.innerHTML = "There are no users";
    } else {
      for (let index = 0; index < getUser.length; index++) {
        nameListDOM.innerHTML += `
        <div class="user-item">
          <p>
            <i class="fas fa-user"></i>
            <span>User:</span>${getUser[index]}
          </p>
           <button class="primary" onclick="Edit(${index})">
            <i class="fas fa-edit"></i>
            Edit
          </button>
          <button class="danger" onclick="Delete(${index})">
            <i class="fas fa-trash"></i>
            Delete
          </button>
        </div>
           `;
      }
    }
  }
}

// function Edit(item) {
//   console.log(item);
// }

function Create() {
  const storage = JSON.parse(localStorage.getItem("userList"));
  let inputText = document.querySelector("#name").value;
  if (inputText == "") {
    alert("Write name");
  } else {
    if (storage === null) {
      userList.push(inputText);
      localStorage.setItem("userList", JSON.stringify(userList));
    } else {
      userList = JSON.parse(localStorage.getItem("userList"));
      userList.push(inputText);
      localStorage.setItem("userList", JSON.stringify(userList));
    }
  }
}

function Delete(item) {
  let deleteItems = JSON.parse(localStorage.getItem("userList"));
  console.log(item);
  deleteItems.splice(item, 1);
  localStorage.setItem("userList", JSON.stringify(deleteItems));
  Read();
}

function Edit(item) {
  let editUsers = JSON.parse(localStorage.getItem("userList"));
  nameListDOM.innerHTML = "";
  for (i = 0; i < editUsers.length; i++) {
    if (i == item) {
      nameListDOM.innerHTML += `
       <div class="user-item">
         <div>
          <p>
            <i class="fas fa-user"></i>
            <span>User:</span> ${getUser[i]}
          </p>
          <input type="text" id="newName" placeholder="${editUsers[i]}"/>
          </div>
          <button class="primary" onclick="Update(${i})">
            <i class="fas fa-edit"></i>
            Update
          </button>
          <button class="warning" onclick="Read()">
            <i class="fas fa-trash"></i>
            Cancel
          </button>
        </div>`;
    } else {
      nameListDOM.innerHTML += `
      <div class="user-item">
        <p>
          <i class="fas fa-user"></i>
          <span>User:</span>${getUser[i]}
        </p>
         <button class="primary" onclick="Edit(${i})">
          <i class="fas fa-edit"></i>
          Edit
        </button>
        <button class="danger" onclick="Delete(${i})">
          <i class="fas fa-trash"></i>
          Delete
        </button>
      </div>
         `;
    }
  }
}

function Update(item) {
  const updateUsers = JSON.parse(localStorage.getItem("userList"));
  updateUsers[item] = document.getElementById("newName").value;
  if (updateUsers[item] == "") {
    alert("Write a new name");
  } else {
    localStorage.setItem("userList", JSON.stringify(updateUsers));
    Read();
  }
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  Create();
  Read();
  document.getElementById("form").reset();
});

document.addEventListener("DOMContentLoaded", () => {
  Read();
});
