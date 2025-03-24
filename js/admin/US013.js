// Sample consumer data (replace with actual data from backend)
const consumers = [
    { id: 1719234567890, name: "John Doe", section: "Office", type: "Residential" },
    { id: 1719235678901, name: "Jane Smith", section: "Region", type: "Commercial" },
    { id: 1719236789012, name: "ABC Corp", section: "Office", type: "Commercial" },
    { id: 1719237890123, name: "Mike Johnson", section: "Region", type: "Residential" },
    { id: 1719238901234, name: "XYZ Ltd", section: "Office", type: "Commercial" },
    { id: 1719239012345, name: "Sarah Lee", section: "Region", type: "Residential" },
    { id: 1719234567891, name: "John Smith", section: "Office", type: "Residential" },
    { id: 1719235678909, name: "Jane Doe", section: "Region", type: "Commercial" },
    { id: 1719236789017, name: "ABC Ltd", section: "Office", type: "Commercial" },
    { id: 1719237890124, name: "Mike Lee", section: "Region", type: "Residential" },
    { id: 1719238901232, name: "XYZ Corp", section: "Office", type: "Commercial" },
    { id: 1719239012341, name: "Sarah Johnson", section: "Region", type: "Residential" }
];

// Pagination variables
const rowsPerPage = 10;
let currentPage = 1;
let filteredConsumers = [...consumers]; // Global filtered dataset

// Function to display consumers
function displayConsumers(data) {
    const tbody = document.getElementById("consumerTableBody");
    tbody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach(consumer => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${consumer.id}</td>
            <td>${consumer.name}</td>
            <td>${consumer.section}</td>
            <td>${consumer.type}</td>
        `;
        tbody.appendChild(row);
    });

    updatePagination(data.length);
}

// Function to filter consumers
function filterConsumers() {
    const section = document.getElementById("electricalSection").value;
    const type = document.getElementById("customerType").value;

    filteredConsumers = [...consumers]; // Reset to full dataset

    if (section) {
        filteredConsumers = filteredConsumers.filter(consumer => consumer.section === section);
    }
    if (type) {
        filteredConsumers = filteredConsumers.filter(consumer => consumer.type === type);
    }

    currentPage = 1; // Reset to first page
    displayConsumers(filteredConsumers);
}

// Function to update pagination
function updatePagination(totalRows) {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const pageInfo = document.getElementById("pageInfo");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalRows === 0;
}

// Function to change page
function changePage(delta) {
    const totalPages = Math.ceil(filteredConsumers.length / rowsPerPage);
    const newPage = currentPage + delta;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayConsumers(filteredConsumers);
    }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    displayConsumers(filteredConsumers);
});