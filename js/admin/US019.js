const complaints = [
    { id: "101", customerId: "5001", type: "Billing Issue", dateSubmitted: "2025-03-01", status: "Open", lastUpdated: "2025-03-10" },
    { id: "102", customerId: "5002", type: "Service Interruption", dateSubmitted: "2025-03-02", status: "In Progress", lastUpdated: "2025-03-12" },
    { id: "103", customerId: "5003", type: "Billing Issue", dateSubmitted: "2025-03-05", status: "Resolved", lastUpdated: "2025-03-14" },
    { id: "104", customerId: "5004", type: "Service Interruption", dateSubmitted: "2025-03-06", status: "Open", lastUpdated: "2025-03-16" },
    { id: "105", customerId: "5005", type: "Billing Issue", dateSubmitted: "2025-03-07", status: "In Progress", lastUpdated: "2025-03-17" }
];

function searchComplaints() {
    let customerId = document.getElementById("customerId").value.trim();
    let complaintId = document.getElementById("complaintId").value.trim();
    let complaintType = document.getElementById("complaintType").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    let foundComplaint = complaints.find(complaint => {
        return (!customerId || complaint.customerId === customerId) &&
               (!complaintId || complaint.id === complaintId) &&
               (!complaintType || complaint.type === complaintType) &&
               (!startDate || complaint.dateSubmitted >= startDate) &&
               (!endDate || complaint.dateSubmitted <= endDate);
    });

    if (foundComplaint) {
        document.getElementById("summaryComplaintId").textContent = foundComplaint.id;
        document.getElementById("summaryCustomerId").textContent = foundComplaint.customerId;
        document.getElementById("summaryComplaintType").textContent = foundComplaint.type;
        document.getElementById("summaryDateSubmitted").textContent = foundComplaint.dateSubmitted;
        document.getElementById("summaryStatus").textContent = foundComplaint.status;
        document.getElementById("summaryLastUpdated").textContent = foundComplaint.lastUpdated;

        let statusElement = document.getElementById("summaryStatus");
        statusElement.className = "";
        if (foundComplaint.status === "Open") statusElement.classList.add("status-open");
        if (foundComplaint.status === "In Progress") statusElement.classList.add("status-in-progress");
        if (foundComplaint.status === "Resolved") statusElement.classList.add("status-resolved");

        document.getElementById("complaintSummary").style.display = "block";
    } else {
        alert("No matching complaints found.");
        document.getElementById("complaintSummary").style.display = "none";
    }
}

function updateStatus() {
    let newStatus = document.getElementById("statusUpdate").value;
    let notes = document.getElementById("statusNotes").value.trim();
    let currentDate = new Date().toISOString().split('T')[0];

    if (!notes) {
        alert("Please enter notes before updating the status.");
        return;
    }

    document.getElementById("summaryStatus").textContent = newStatus;
    document.getElementById("summaryLastUpdated").textContent = currentDate;
    alert("Complaint status updated successfully.");
}
