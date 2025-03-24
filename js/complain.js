const complaints = [
    { id: "1234", date: "2025-03-01", type: "Billing Issue", status: "Pending" },
    { id: "5678", date: "2025-03-05", type: "Technical Issue", status: "Resolved" },
    { id: "9101", date: "2025-03-10", type: "Network Issue", status: "In Progress" },
    { id: "1121", date: "2025-03-15", type: "Customer Service", status: "Closed" }
];

function trackComplaint() {
    let inputId = document.getElementById("complaintId").value.trim().toLowerCase();
    let status = document.getElementById("status").value;
    let resultBox = document.getElementById("resultBox");
    let loadingText = document.getElementById("loadingText");
    
    resultBox.style.display = "none";
    loadingText.style.display = "block";

    setTimeout(() => {
        let filteredComplaints = complaints.filter(complaint => 
            (inputId && complaint.id.toLowerCase() === inputId) || 
            (status && complaint.status === status)
        );

        loadingText.style.display = "none";

        if (filteredComplaints.length > 0) {
            resultBox.innerHTML = filteredComplaints.map(complaint => 
                `<p><strong>ID:</strong> ${complaint.id} | <strong>Date:</strong> ${complaint.date} | 
                <strong>Type:</strong> ${complaint.type} | <strong>Status:</strong> ${complaint.status}</p>`
            ).join('');
            resultBox.style.display = "block";
        } else {
            resultBox.innerHTML = "No complaints found.";
            resultBox.style.display = "block";
        }
    }, 1000);
}

function clearForm() {
    document.getElementById("complaintId").value = "";
    document.getElementById("status").value = "";
    document.getElementById("resultBox").style.display = "none";
}
