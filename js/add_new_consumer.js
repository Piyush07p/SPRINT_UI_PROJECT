let customers = {
    "123451": { name: "John Doe", consumers: [] },
    "123452": { name: "Jane Smith", consumers: [] },
    "123453": { name: "Sam Doe", consumers: [] },
    "123454": { name: "David J", consumers: [] },
    "123455": { name: "Emily Carter", consumers: [] },
    "123456": { name: "Michael Thompson", consumers: [] },
    "123457": { name: "Oliver Jensen", consumers: [] },
    "123458": { name: "Eri Lindberg", consumers: [] },
};

let currentCustomer = null; 

function searchCustomer() {
    let searchValue = document.getElementById("searchInput").value.trim();
    let searchMessage = document.getElementById("searchMessage");
    let consumerForm = document.getElementById("consumerForm");
    let consumerList = document.getElementById("consumerList");

    if (!searchValue) {
        searchMessage.style.color = "red";
        searchMessage.innerText = "Please enter a Customer ID or Name.";
        return;
    }

    let found = null;
    for (let id in customers) {
        if (id === searchValue || customers[id].name.toLowerCase() === searchValue.toLowerCase()) {
            found = customers[id];
            currentCustomer = id;
            break;
        }
    }

    if (found) {
        searchMessage.style.color = "green";
        searchMessage.innerText = `Customer found: ${found.name}`;
        consumerForm.style.display = "block";
        displayConsumerList();
    } else {
        searchMessage.style.color = "red";
        searchMessage.innerText = "Customer not found. Please add the customer first.";
        consumerForm.style.display = "none";
        consumerList.style.display = "none";
        currentCustomer = null;
    }
}

function addConsumer() {
    if (!currentCustomer) return;

    if (!validateForm()) {
        return; // Stop execution if validation fails
    }

    let consumerNo = document.getElementById("consumerNo").value.trim();
    let consumerAddress = document.getElementById("consumerAddress").value.trim();
    let consumerPhone = document.getElementById("consumerPhone").value.trim();
    let consumerEmail = document.getElementById("consumerEmail").value.trim();
    let customerType = document.getElementById("customerType").value;
    let consumerMessage = document.getElementById("consumerMessage");

    if (!consumerNo || !consumerAddress || !consumerPhone || !consumerEmail || !customerType) {
        consumerMessage.style.color = "red";
        consumerMessage.innerText = "All fields are required.";
        return;
    }

    if (customers[currentCustomer].consumers.includes(consumerNo)) {
        consumerMessage.style.color = "red";
        consumerMessage.innerText = "Consumer No already exists for this customer.";
        return;
    }

    customers[currentCustomer].consumers.push(consumerNo);
    consumerMessage.style.color = "green";
    consumerMessage.innerText = `Consumer No ${consumerNo} added successfully.`;
    displayConsumerList();
}

function displayConsumerList() {
    let consumerList = document.getElementById("consumerList");
    let consumerNumbers = document.getElementById("consumerNumbers");

    consumerNumbers.innerHTML = "";

    let consumers = customers[currentCustomer].consumers;

    // If there are consumers, display them
    if (consumers.length > 0) {
        consumers.forEach(consumer => {
            let li = document.createElement("li");
            li.innerText = consumer;
            consumerNumbers.appendChild(li);
        });

        // **Ensure the list is visible**
        consumerList.style.display = "block";
    } else {
        // Hide if no consumers exist
        consumerList.style.display = "none";
    }
}

document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("open");
});

// Close sidebar when clicking a menu item
document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", function () {
        document.querySelector(".sidebar").classList.remove("open");
    });
});

function validateForm() {
    let isValid = true;
    let consumerNo = document.getElementById("consumerNo").value.trim();
    let address = document.getElementById("consumerAddress").value.trim();
    let phone = document.getElementById("consumerPhone").value.trim();
    let email = document.getElementById("consumerEmail").value.trim();
    let customerType = document.getElementById("customerType").value;

    document.querySelectorAll(".error-message").forEach(el => {
        el.textContent = "";
        el.style.color="red";
    }); // Reset errors

    // Consumer No validation (13 digits, numbers only)
    if (!/^\d{13}$/.test(consumerNo)) {
        document.getElementById("consumerError").textContent = "Consumer No. must be exactly 13 digits.";
        isValid = false;
    }

    // Address validation (must not be empty)
    if (address === "") {
        document.getElementById("addressError").textContent = "Address is required.";
        isValid = false;
    }

    // Phone validation (must be 10 digits, start with 6, 7, 8, or 9)
    if (!/^[6789]\d{9}$/.test(phone)) {
        document.getElementById("phoneError").textContent = "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9.";
        isValid = false;
    }

    // Email validation
    let emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email";
        isValid = false;
    }

    // Customer Type validation
    if (customerType === "") {
        document.getElementById("customerTypeError").textContent = "Please select a Customer Type.";
        isValid = false;
    }

    // If form is valid, show success message
    if (isValid) {
        document.getElementById("successMessage").textContent = "Consumer added successfully!";
        document.getElementById("successMessage").style.display = "block";
        setTimeout(() => { document.getElementById("successMessage").style.display = "none"; }, 3000);
        document.getElementById("addConsumerForm").reset();
    }
}
