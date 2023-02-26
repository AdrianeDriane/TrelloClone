function dragndropNoteCard(){

    const noteCardDraggables = document.querySelectorAll(".notecard-draggable");
    const noteCardContainers = document.querySelectorAll(".notecard-container");

    // Event listeners for each noteCardDraggable
    noteCardDraggables.forEach(noteCardDraggable => {
        noteCardDraggable.addEventListener('dragstart', () => {
            noteCardDraggable.classList.add("notecard-dragging");
        });
        noteCardDraggable.addEventListener('dragend', () => {
            noteCardDraggable.classList.remove("notecard-dragging");
        });
        
    });

    // Event listeners for each noteCardContainer
    noteCardContainers.forEach(noteCardContainer => {
        noteCardContainer.addEventListener("dragover", event => {
            event.preventDefault();

            // afterNoteCardElement will have the element that is after the dragged element
            const afterNoteCardElement = getDragAfterNoteCardElement(noteCardContainer, event.clientY);
            const draggable = document.querySelector(".notecard-dragging");

            // if there is no element after the dragged element, then append to end of list
            // else, insert it before the element that is after the dragged element
            if(afterNoteCardElement == null){
                noteCardContainer.appendChild(draggable);
            } else {
                noteCardContainer.insertBefore(draggable, afterNoteCardElement);
            }
        });
    });

    //Helper function to return what element is after the dragged element
    function getDragAfterNoteCardElement(container, y){

        //List of elements that are currently undragged
        const draggableElements = [...container.querySelectorAll(".notecard-draggable:not(.notecard-dragging)")]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();

            /*Calculates the horizontal offset between the top of the element and the current mouse position 
            of the user. If the offset is less than 0 (i.e. the mouse is at before/top of the element) and greater 
            than the offset of the previous closest element, it updates the closest variable to be the current 
            element using return { offset: offset, element: child }. Otherwise, it leaves closest unchanged. 
            Finally, it returns the element with the smallest offset using .element on the closest object.*/
            const offset = y - box.top - box.height / 2;

            if(offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
              } else {
                return closest
              }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}