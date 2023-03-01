const newListButton = document.getElementById("add-list-button");
const newListInput = document.getElementById("add-list-input");
newListButton.addEventListener("click", function () {
  addNewCardList(newListInput.value);
});

function addNewCardList(title) {
  const addListInputValue = document.getElementById("add-list-input");
  addListInputValue.value = "";

  const deleteInputButton = document.getElementById("delete-button");
  deleteInputButton.addEventListener("click", function () {
    addListInputValue.value = "";
  });

  const dragworkspace = document.getElementById("dragworkspace");

  // CARD-LIST
  const list = document.createElement("div");
  list.classList.add("list");

  const cardList = document.createElement("div");
  cardList.classList.add("card-list");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  const cardHeaderTitle = document.createElement("input");
  cardHeaderTitle.type = "text";
  cardHeaderTitle.id = "my-textfield";
  cardHeaderTitle.placeholder = "Heading";
  cardHeaderTitle.value = title;

  const cardMenuButton = document.createElement("button");
  cardMenuButton.classList.add("card-menu");

  const cardMenuIcon = document.createElement("i");
  cardMenuIcon.classList.add("fas", "fa-trash-alt");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("notecard-container");

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");

  const cardButton = document.createElement("button");
  cardButton.classList.add("card-button");

  const cardButtonIcon = document.createElement("i");
  cardButtonIcon.classList.add("fa-duotone", "fa-plus");

  const cardButtonText = document.createElement("p");
  cardButtonText.textContent = "Add a card";

  cardHeader.appendChild(cardHeaderTitle);
  cardMenuButton.appendChild(cardMenuIcon);
  cardHeader.appendChild(cardMenuButton);

  cardFooter.appendChild(cardButton);
  cardButton.appendChild(cardButtonIcon);
  cardButton.appendChild(cardButtonText);

  cardList.appendChild(cardHeader);
  cardList.appendChild(cardContainer);
  cardList.appendChild(cardFooter);
  list.appendChild(cardList);
  dragworkspace.appendChild(list);

  cardHeaderTitle.focus();

  cardMenuIcon.addEventListener("click", function () {
    const confirmed = window.confirm("Do you wish to delete this card?");
    if (confirmed) {
      list.remove();
    }
  });

  cardButton.addEventListener("click", newCardBody);

  function newCardBody() {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.classList.add("notecard-draggable");
    cardBody.setAttribute("draggable", true);
    const noteInput = document.createElement("textarea");
    noteInput.type = "text";
    noteInput.id = "my-note-textfield";
    noteInput.placeholder = "Note";
    noteInput.disabled = false;
    const editButton = document.createElement("button");
    editButton.classList.add("card-button");
    const editButtonIcon = document.createElement("i");
    editButtonIcon.classList.add(
      "fa-regular",
      "fa-pen-to-square",
      "hover-icon"
    );
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card-button");
    const deleteButtonIcon = document.createElement("i");
    deleteButtonIcon.classList.add("fa-solid", "fa-x", "hover-icon");

    editButton.appendChild(editButtonIcon);
    deleteButton.appendChild(deleteButtonIcon);
    cardBody.appendChild(noteInput);
    cardBody.appendChild(editButton);
    cardBody.appendChild(deleteButton);

    cardContainer.appendChild(cardBody);
    noteInput.focus();

    noteInput.addEventListener("input", hideScrollbar);

    editButton.addEventListener("click", enableNoteInput);

    deleteButton.addEventListener("click", () => {
      cardBody.remove();
    });

    noteInput.addEventListener("blur", disableNoteInput);

    function hideScrollbar() {
      noteInput.style.height = "auto";
      noteInput.style.height = `${noteInput.scrollHeight}px`;
    }

    function enableNoteInput() {
      console.log("enableNoteInput");
      noteInput.disabled = false;
      if (noteInput.disabled == false) {
        noteInput.focus();
      }
    }

    function disableNoteInput() {
      console.log("hideScrollBar");
      noteInput.disabled = true;
    }

    // To make sure that the elements are assigned to their classes before we run the notedragndrop file
    dragndropNoteCard();
  }

  // To make sure that the elements are assigned to their classes before we run the notedragndrop file
  dragndropNoteCard();
}
