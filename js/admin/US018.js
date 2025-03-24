function searchComplaints() {
    let customerId = document.getElementById("customerId").value.trim();
    let complaintId = document.getElementById("complaintId").value.trim();
    let complaintType = document.getElementById("complaintType").value;
    let table = document.getElementById("complaintTable");
    let exportBtn = document.getElementById("exportBtn");
    let rows = document.querySelectorAll("#complaintTable tbody tr");
    let message = document.getElementById("searchMessage");
    let matchFound = false;

    if (!customerId && !complaintId && !complaintType) {
        message.innerText = "Invalid input. Please enter at least one search criteria.";
        table.style.display = "none";
        exportBtn.style.display = "none";
        return;
    }

    message.innerText = "";
    rows.forEach(row => {
        let cid = row.cells[1].innerText.trim();
        let compId = row.cells[0].innerText.trim();
        let type = row.cells[2].innerText.trim();
        row.style.display = "none";

        if ((customerId && customerId === cid) || (complaintId && complaintId === compId) || (complaintType && complaintType === type)) {
            row.style.display = "table-row";
            matchFound = true;
        }
    });

    if (!matchFound) {
        message.innerText = "No matching complaints found.";
        table.style.display = "none";
        exportBtn.style.display = "none";
    } else {
        table.style.display = "table";
        exportBtn.style.display = "block";
    }
}

function showStatusOptions(button, complaintId) {
    let row = button.closest("tr");
    let actionCell = row.cells[6];
    
    let selectElement = document.createElement("select");
    selectElement.innerHTML = `
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
    `;
    
    let updateButton = document.createElement("button");
    updateButton.textContent = "Save";
    updateButton.onclick = function () {
        updateStatus(row, selectElement.value);
    };
    
    actionCell.innerHTML = "";
    actionCell.appendChild(selectElement);
    actionCell.appendChild(updateButton);
}

function updateStatus(row, newStatus) {
    let statusCell = row.cells[4];
    let lastUpdatedCell = row.cells[5];
    let currentDate = new Date().toISOString().split('T')[0];

    statusCell.innerHTML = newStatus;
    lastUpdatedCell.innerHTML = currentDate;
    statusCell.className = newStatus === "Open" ? "status-open" : newStatus === "In Progress" ? "status-in-progress" : "status-resolved";
}

function exportToCSV() {
    let table = document.getElementById("complaintTable");
    let rows = table.querySelectorAll("tbody tr");
    let csvContent = "data:text/csv;charset=utf-8,";
    let headers = ["Complaint ID", "Customer ID", "Complaint Type", "Date Submitted", "Status", "Last Updated"];
    csvContent += headers.join(",") + "\n";

    rows.forEach(row => {
        if (row.style.display !== "none") {
            let cols = row.querySelectorAll("td");
            let rowData = [];
            for (let i = 0; i < cols.length - 1; i++) {
                rowData.push(cols[i].innerText);
            }
            csvContent += rowData.join(",") + "\n";
        }
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "filtered_complaints.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
