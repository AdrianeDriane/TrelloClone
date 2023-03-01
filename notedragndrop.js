function dragndropNoteCard() {
  const noteCardDraggables = document.querySelectorAll(".notecard-draggable");
  const noteCardContainers = document.querySelectorAll(".notecard-container");

  noteCardDraggables.forEach((noteCardDraggable) => {
    noteCardDraggable.addEventListener("dragstart", () => {
      noteCardDraggable.classList.add("notecard-dragging");
    });
    noteCardDraggable.addEventListener("dragend", () => {
      noteCardDraggable.classList.remove("notecard-dragging");
    });
  });

  noteCardContainers.forEach((noteCardContainer) => {
    noteCardContainer.addEventListener("dragover", (event) => {
      event.preventDefault();

      const afterNoteCardElement = getDragAfterNoteCardElement(
        noteCardContainer,
        event.clientY
      );

      const draggable = document.querySelector(".notecard-dragging");

      //if afterNoteCardElement has a value of element then insert draggable before that value of element
      if (afterNoteCardElement) {
        noteCardContainer.insertBefore(draggable, afterNoteCardElement);
      } else {
        noteCardContainer.appendChild(draggable);
      }
    });
  });

  function getDragAfterNoteCardElement(container, yMouse) {
    const draggableElements = [
      ...container.querySelectorAll(
        ".notecard-draggable:not(.notecard-dragging)"
      ),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = yMouse - box.top - box.height / 2;

        if (isValidOffset(offset, closest.offset)) {
          return updateClosestVarToCurrentElement();
        } else {
          return closest;
        }

        function isValidOffset(offset, closestOffset) {
          return offset < 0 && offset > closestOffset;
        }

        function updateClosestVarToCurrentElement() {
          return { offset: offset, element: child };
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
