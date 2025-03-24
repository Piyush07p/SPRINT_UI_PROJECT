// import {totalAmount} from '../js/view_bill_summary'

function confirmPayment() {
    let cardNumber = document.getElementById("card-number").value;
    let expiryDate = document.getElementById("expiry-date").value;
    let cvv = document.getElementById("cvv").value;
    let name = document.getElementById("cardholder-name").value;

    let today = new Date().toISOString().slice(0, 7);
    let isValid = true;

    // Validation
    if (!/^\d{16}$/.test(cardNumber)) {
        document.getElementById("card-error").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("card-error").style.display = "none";
    }

    if (!expiryDate || expiryDate < today) {
        document.getElementById("expiry-error").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("expiry-error").style.display = "none";
    }

    if (!/^\d{3,4}$/.test(cvv)) {
        document.getElementById("cvv-error").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("cvv-error").style.display = "none";
    }

    if (name.trim() === "") {
        document.getElementById("name-error").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("name-error").style.display = "none";
    }

    if (isValid) {
        document.getElementById("confirmation-modal").classList.remove("hidden");
        document.getElementById("confirm-amount").textContent = totalAmount;
        document.getElementById("confirm-card").textContent = cardNumber.slice(-4);
    }
}

function processPayment() {
    // document.getElementById("confirmation-modal").classList.add("hidden");
    // document.getElementById("success-message").classList.remove("hidden");
    // document.getElementById("transaction-date").textContent = new Date().toLocaleDateString();
    // document.getElementById("paid-amount").textContent = totalAmount;
    alert("Payment Successful! Generating Invoice...");
    window.location.href = "/pages/invoice.html?transactionId=123456789";
}

function cancelPayment() {
    document.getElementById("confirmation-modal").classList.add("hidden");
}

function goBack() {
    window.location.href="/pages/view_bill_summary.html";
}