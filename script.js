const newListButton = document.getElementById("add-list-button");
const newListInput = document.getElementById("add-list-input");

newListButton.addEventListener("click", function(){
    addNewCardList(newListInput.value);
});

function addNewCardList(title) {
    
    // Sets input value to "" whenever new card is generated
    const addListInputValue = document.getElementById("add-list-input");
    addListInputValue.value = "";

    const deleteInputButton = document.getElementById("delete-button");
    deleteInputButton.addEventListener("click", function(){
        addListInputValue.value = "";
    });


    // Get access to parent div named workspace
    const workspace = document.getElementById("workspace");

    //Get access to parent div named dragworkspace
    const dragworkspace = document.getElementById("dragworkspace");
    dragworkspace.classList.add("cardlist-container");

    // Create group of HTML represents that represents a card-list
    const list = document.createElement("div");
    list.classList.add("list");
    list.classList.add("cardlist-draggable");
    list.setAttribute("draggable", true);
    
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

    // Add event listener to the "delete card list" button
    cardMenuIcon.addEventListener("click", function() {
      const confirmed = window.confirm("Do you wish to delete this card?");
      if (confirmed) {
        list.remove(); //Remove entire card list
      } else {}
    });

    // Add click event listener to the "Add a card note" button
    cardButton.addEventListener("click", newCardBody);

    //A function that adds a body/note in between the cardHeader and cardFooter
    //Declared this function inside because this will only be used inside this function
    function newCardBody(){
        // Creates a new group of HTML elements that represents the card body/notes
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const noteInput = document.createElement("textarea");
        noteInput.type = "text";
        noteInput.id = "my-note-textfield";
        noteInput.placeholder = "Note";
        noteInput.disabled = false;
        const editButton = document.createElement("button");
        editButton.classList.add("card-button");
        const editButtonIcon = document.createElement("i");
        editButtonIcon.classList.add("fa-regular", "fa-pen-to-square", "hover-icon");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("card-button");
        const deleteButtonIcon = document.createElement("i");
        deleteButtonIcon.classList.add("fa-solid", "fa-x", "hover-icon");

        editButton.appendChild(editButtonIcon);
        deleteButton.appendChild(deleteButtonIcon);
        cardBody.appendChild(noteInput);
        cardBody.appendChild(editButton);
        cardBody.appendChild(deleteButton);
        
        //Inserts the new note/body before the footer.
        cardContainer.appendChild(cardBody);
        noteInput.focus();

        /* Whenever the user inputs text, we first set the height of the textarea to auto to reset its height, and then set it to the scrollHeight of the textarea, which is the height of the content including any overflow. */
        noteInput.addEventListener('input', function(){
            noteInput.style.height = 'auto';
            noteInput.style.height = `${noteInput.scrollHeight}px`;
        });

        //Toggles the disabled property of the textarea element whenever we click the
        //edit button
        editButton.addEventListener("click", function() {
            noteInput.disabled = false;
            if (noteInput.disabled == false) {
                noteInput.focus();
            }
        });


        deleteButton.addEventListener("click", function() {
            cardBody.remove();
        });

        //Toggles the disabled property of the textarea element into true
        //whenever the focus is not on the textarea element anymore
        noteInput.addEventListener("blur", function(){
            noteInput.disabled = true;
        });
    }

    // To make sure that the elements are assigned to their classes before we run the dragndrop file
    dragndropCardList();
    //dragndropNoteCard();
}