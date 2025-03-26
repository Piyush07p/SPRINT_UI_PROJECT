// Mock data for search (in a real app, this would come from a backend)
const consumers = [
    { 
        customerId: "CUST123", 
        consumerNumber: "1234567890123", 
        fullName: "John Doe", 
        address: "123 Main St, City", 
        contactInfo: "john.doe@example.com", 
        customerType: "Individual" 
    },
    { 
        customerId: "CUST124", 
        consumerNumber: "8765432109876", 
        fullName: "Jane Smith", 
        address: "456 Oak Ave, Town", 
        contactInfo: "jane.smith@example.com", 
        customerType: "Business" 
    }
];

// Search Consumer Function
function searchConsumer(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
    console.log("Search function triggered"); // Debug log

    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    console.log("Search term:", searchInput); // Debug log

    const resultsBody = document.getElementById("resultsBody");
    const statusMessage = document.getElementById("statusMessage");
    resultsBody.innerHTML = ""; // Clear previous results
    statusMessage.innerHTML = ""; // Clear previous status message

    const filteredConsumers = consumers.filter(consumer =>
        consumer.customerId.toLowerCase().includes(searchInput) ||
        consumer.consumerNumber.toLowerCase().includes(searchInput) ||
        consumer.fullName.toLowerCase().includes(searchInput)
    );

    console.log("Filtered consumers:", filteredConsumers); // Debug log

    if (filteredConsumers.length === 0) {
        resultsBody.innerHTML = "<tr><td colspan='4'>No results found.</td></tr>";
        return;
    }

    filteredConsumers.forEach(consumer => {
        const row = document.createElement("tr");
        // Truncate consumerNumber for display (first 10 digits + "...")
        const displayConsumerNumber = consumer.consumerNumber.length > 10 
            ? consumer.consumerNumber.substring(0, 10) + "..." 
            : consumer.consumerNumber;
        row.innerHTML = `
            <td>${consumer.customerId}</td>
            <td>${displayConsumerNumber}</td>
            <td>${consumer.fullName}</td>
            <td>
                <div class="action-container">
                    <button onclick="toggleDropdown('${consumer.customerId}')">Action</button>
                    <div id="dropdown-${consumer.customerId}" class="dropdown-content">
                        <a href="#" onclick="goToUpdate('${consumer.customerId}'); return false;">Edit</a>
                        <a href="#" onclick="updateStatus('${consumer.customerId}', 'Disconnected'); return false;">Disconnect</a>
                        <a href="#" onclick="updateStatus('${consumer.customerId}', 'Reconnected'); return false;">Reconnect</a>
                    </div>
                </div>
            </td>
        `;
        resultsBody.appendChild(row);
    });

    console.log("Results rendered in table"); // Debug log
}

// Toggle Dropdown Visibility
function toggleDropdown(customerId) {
    const dropdown = document.getElementById(`dropdown-${customerId}`);
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Navigate to Update Page with Consumer ID
function goToUpdate(customerId) {
    window.location.href = `US014_2.html?customerId=${customerId}`;
}

// Update Consumer Status (Disconnect/Reconnect)
function updateStatus(customerId, status) {
    const messageDiv = document.getElementById("statusMessage");
    messageDiv.className = "message success";
    messageDiv.textContent = `Consumer status is updated to ${status}.`;
    // Hide all dropdowns after selection
    document.querySelectorAll(".dropdown-content").forEach(dropdown => {
        dropdown.style.display = "none";
    });
}

// Populate Update Form with Consumer Data
function populateUpdateForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get("customerId");

    if (customerId) {
        const consumer = consumers.find(c => c.customerId === customerId);
        if (consumer) {
            document.getElementById("customerId").value = consumer.customerId;
            document.getElementById("consumerNumber").value = consumer.consumerNumber;
            document.getElementById("fullName").value = consumer.fullName;
            document.getElementById("address").value = consumer.address;
            document.getElementById("contactInfo").value = consumer.contactInfo;
            document.getElementById("customerType").value = consumer.customerType;
        }
    }
}

// Update Consumer Function with Validation
function updateConsumer(event) {
    event.preventDefault();
    const messageDiv = document.getElementById("message");

    // Get form values
    const fullName = document.getElementById("fullName").value.trim();
    const address = document.getElementById("address").value.trim();
    const contactInfo = document.getElementById("contactInfo").value.trim();
    const customerType = document.getElementById("customerType").value;

    // Validate Full Name
    // 1. Length: Min 3, Max 50
    if (fullName.length < 3 || fullName.length > 50) {
        messageDiv.className = "message error";
        messageDiv.textContent = "Full Name must be between 3 and 50 characters.";
        return;
    }

    // 2. Only characters and spaces (no numbers or special characters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName)) {
        messageDiv.className = "message error";
        messageDiv.textContent = "Full Name must contain only letters and spaces.";
        return;
    }

    // 3. At least two words (first and last name)
    if (fullName.split(" ").filter(word => word.length > 0).length < 2) {
        messageDiv.className = "message error";
        messageDiv.textContent = "Full Name must include at least a first and last name.";
        return;
    }

    // Validate Address
    // 1. Not empty
    if (!address) {
        messageDiv.className = "message error";
        messageDiv.textContent = "Address cannot be empty.";
        return;
    }

    // 2. Length: Min 5, Max 255
    if (address.length < 5 || address.length > 255) {
        messageDiv.className = "message error";
        messageDiv.textContent = "Address must be between 5 and 255 characters.";
        return;
    }

    // Validate Contact Info (email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo)) {
        messageDiv.className = "message error";
        messageDiv.textContent = "Please enter a valid email address.";
        return;
    }

    // Simulate successful update (in a real app, this would be an API call)
    setTimeout(() => {
        messageDiv.className = "message success";
        messageDiv.textContent = "Consumer details updated successfully!";
    }, 500);
}

// Back Button Function
function goBack() {
    window.location.href = "US014_1.html";
}

// Run populateUpdateForm when US014_2.html loads
if (window.location.pathname.includes("US014_2.html")) {
    window.onload = populateUpdateForm;
}

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    const buttons = document.querySelectorAll(".action-container button");

    dropdowns.forEach((dropdown, index) => {
        if (!buttons[index].contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });
});