 document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('runaway-btn');
    const container = document.getElementById('container');
    let clickAttempts = 0;

    // Get the container boundaries
    function getContainerBounds() {
        const containerRect = container.getBoundingClientRect();
        return {
            top: containerRect.top,
            left: containerRect.left,
            right: containerRect.right - button.offsetWidth,
            bottom: containerRect.bottom - button.offsetHeight
        };
    }

    // Get distance between two points
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    // Handle mouse move
    document.addEventListener('mousemove', function(e) {
        const buttonRect = button.getBoundingClientRect();
        const buttonX = buttonRect.left + buttonRect.width / 2;
        const buttonY = buttonRect.top + buttonRect.height / 2;

        // Calculate distance between mouse and button center
        const distance = getDistance(e.clientX, e.clientY, buttonX, buttonY);

        // If mouse is getting close (within 150px), move the button
        if (distance < 150) {
            moveButton();
        }
    });

    // Move the button to a random position within the container
    function moveButton() {
        const bounds = getContainerBounds();
        const newX = Math.random() * (bounds.right - bounds.left) + bounds.left;
        const newY = Math.random() * (bounds.bottom - bounds.top) + bounds.top;

        button.style.left = newX + 'px';
        button.style.top = newY + 'px';
    }

    // Position the button in the right corner initially
    function positionButtonInRightCorner() {
        const bounds = getContainerBounds();
        // Position in top-right corner with some padding
        button.style.left = (bounds.right - 20) + 'px';
        button.style.top = (bounds.top + 50) + 'px';
    }

    // Initialize button position in the right corner
    positionButtonInRightCorner();
});