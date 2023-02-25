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
  
    // Create group of HTML represents that represents a card-list
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
    cardList.appendChild(cardFooter);
    list.appendChild(cardList);
    workspace.appendChild(list);

    cardHeaderTitle.focus();

    // Add event listener to the "delete card list" button
    cardMenuIcon.addEventListener("click", function() {
      const confirmed = window.confirm("Do you wish to delete this card?");
      if (confirmed) {
        list.remove(); //Remove entire card list
      } else {
        console.log("Canceled!");
      }
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
        cardList.insertBefore(cardBody, cardFooter);
        noteInput.focus();

        /* Whenever the user inputs text, we first set the height of the textarea to auto to reset its height, and then set it to the scrollHeight of the textarea, which is the height of the content including any overflow. */
        noteInput.addEventListener('input', function(){
            noteInput.style.height = 'auto';
            noteInput.style.height = '${textarea.scrollHeight}px';
        });

        //Toggles the disabled property of the textarea element whenever we click the
        //edit button
        editButton.addEventListener("click", function() {
            console.log("editButton clicked");
            noteInput.disabled = false;
            if (noteInput.disabled == false) {
                noteInput.focus();
                console.log("editButton caused noteInput to be focused");
            }
            console.log("editButton function finished");
        });


        deleteButton.addEventListener("click", function() {
            console.log("deleteButton clicked");
            cardBody.remove();
        });

        //Toggles the disabled property of the textarea element into true
        //whenever the focus is not on the textarea element anymore
        noteInput.addEventListener("blur", function(){
            noteInput.disabled = true;
        });
    }
}