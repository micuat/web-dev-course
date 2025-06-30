document.addEventListener('DOMContentLoaded', () => {
    const orderBtn = document.getElementById('orderBtn');
    const orderDialog = document.getElementById('orderDialog');
    const closeDialog = document.getElementById('closeDialog');
    const orderForm = document.getElementById('orderForm');

    orderBtn.addEventListener('click', () => {
        orderDialog.style.display = 'block';
    });

    closeDialog.addEventListener('click', () => {
        orderDialog.style.display = 'none';
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const orderText = document.getElementById('orderText').value;

        // Here you would typically send this data to a server
        // For this example, we'll just log it to the console
        console.log('Order submitted:');
        console.log('Email:', email);
        console.log('Order:', orderText);

        // You can replace this alert with a more user-friendly confirmation message
        alert('Thank you for your order! We will contact you soon.');

        orderDialog.style.display = 'none';
        orderForm.reset();
    });
});