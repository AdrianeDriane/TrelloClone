function dragndropCardList(){
    /*<--------------------.js CODE FOR THE CARDLIST DRAG AND DROP IMPLEMENTATION BELOW--------------------> */
    const cardListDraggables = document.querySelectorAll(".cardlist-draggable");
    const cardListContainers = document.querySelectorAll(".cardlist-container");

    // Event listeners for each cardListDraggable
    cardListDraggables.forEach(cardListDraggable => {
        cardListDraggable.addEventListener("dragstart", dragStart);
        cardListDraggable.addEventListener("dragend", dragEnd);
    });


    // Event listeners for each cardListContainer
    cardListContainers.forEach(cardListContainer => {
        cardListContainer.addEventListener("dragover", e => {dragOver(e, cardListContainer)});
    });


    //Handler functions for each cardListDraggable event
    function dragStart(event) {
        event.target.classList.add("dragging");
    }

    function dragEnd(event) {
        event.target.classList.remove("dragging");
    }


    //Handler functions for each cardListContainer event
    function dragOver(event, container){
        
        event.preventDefault();
        // afterCardListElement will have the element that is after the dragged element
        const afterCardListElement = getDragAfterCardListElement(container, event.clientX);
        const draggable = document.querySelector(".dragging");
        
        // if there is no element after the dragged element, then append to end of list
        // else, insert it before the element that is after the dragged element
        if(afterCardListElement == null){
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterCardListElement);
        }
    }


    //Helper function to return what element is after the dragged element
    function getDragAfterCardListElement(container, x){

        //List of elements that are currently undragged
        const draggableElements = [...container.querySelectorAll(".cardlist-draggable:not(.dragging)")]


        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()

            /*Calculates the horizontal offset between the left of the element and the current mouse position 
            of the user. If the offset is less than 0 (i.e. the mouse is at before the element) and greater 
            than the offset of the previous closest element, it updates the closest variable to be the current 
            element using return { offset: offset, element: child }. Otherwise, it leaves closest unchanged. 
            Finally, it returns the element with the smallest offset using .element on the closest object.*/
            const offset = x - box.left - box.width / 4;
            if (offset < 0 && offset > closest.offset){
                return {offset: offset, element: child};
            } else {
                return closest;
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element;
    }

    /*<--------------------.js CODE FOR THE CARDLIST DRAG AND DROP IMPLEMENTATION END--------------------> */

}


